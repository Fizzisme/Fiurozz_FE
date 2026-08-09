// Shared HTTP client core for talking to backend services.
//
// This module is transport-agnostic about WHERE it points: the actual
// base URL is injected via createApiClient(baseUrl). Two instances are
// expected to exist in this codebase:
//   - a browser-facing client pointed at '/api/proxy' (see client.ts)
//   - a server-only client pointed at the Gateway's absolute URL
//     (see gateway-client.ts)
// Keeping the logic here and the base URL there avoids duplicating
// body-normalization / error-handling code between the two.

export type NextFetchOptions = {
    revalidate?: number | false;
    tags?: string[];
};

export type ServiceRequestOptions = Omit<RequestInit, 'body'> & {
    // Accept structured bodies (object/array) in addition to raw
    // BodyInit, so callers can pass a plain object and not worry
    // about JSON.stringify-ing it themselves.
    body?: BodyInit | Record<string, unknown> | object | unknown[] | null;
    query?: Record<string, string | number | boolean | null | undefined>;
    next?: NextFetchOptions;
};

// Envelope shape returned by every BE endpoint. Kept generic over T
// (the payload type) so each call site gets full type-safety on
// response.data without re-declaring success/message/timestamp.
export interface ApiEnvelope<T> {
    success: boolean;
    message?: string;
    timestamp: string;
    data: T;
}

// Thrown whenever the HTTP layer reports a non-2xx status. Carries
// the parsed BE payload (if any) so callers can still read
// `error.payload.message` for user-facing error text instead of a
// generic "Request failed" string.
export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly payload?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Used by the *WithResponse variants when the caller needs access to
// the raw Response object (e.g. to read Set-Cookie headers), not just
// the parsed body.
export interface ApiResponse<T> {
    response: Response;
    data: T;
}

// Type guard distinguishing "plain JSON-serializable object" from the
// built-in body types (FormData, Blob, etc.) that must be passed to
// fetch() untouched. Without this, a FormData body would get
// JSON.stringify-ed into "[object FormData]" and silently break file
// uploads.
const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof FormData) &&
    !(value instanceof URLSearchParams) &&
    !(value instanceof Blob) &&
    !(value instanceof ArrayBuffer);

// Normalizes whatever the caller passed as `body` into something
// fetch() accepts, and figures out the Content-Type that should go
// with it. Binary/multipart bodies are passed through untouched so
// the browser/fetch sets the correct multipart boundary itself --
// we must NOT set Content-Type manually for FormData.
const normalizeBody = (body: ServiceRequestOptions['body']) => {
    if (body == null) {
        return { body: undefined, contentType: undefined as string | undefined };
    }
    if (typeof body === 'string' || body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob) {
        return { body, contentType: undefined as string | undefined };
    }
    if (body instanceof ArrayBuffer) {
        return { body, contentType: undefined as string | undefined };
    }
    if (Array.isArray(body) || isPlainObject(body)) {
        return { body: JSON.stringify(body), contentType: 'application/json' };
    }
    return { body: body as BodyInit, contentType: undefined as string | undefined };
};

// Parses the response body according to its declared Content-Type.
// 204 No Content is special-cased because calling response.json() on
// an empty body throws a SyntaxError.
const parseResponsePayload = async (response: Response) => {
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
};

// Best-effort extraction of a human-readable error message from
// whatever the BE returned. Falls back to a generic message when the
// payload isn't the expected shape (e.g. BE is down and an infra
// proxy returned an HTML error page instead of JSON).
const getErrorMessage = (payload: unknown, status: number) =>
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    typeof (payload as { message?: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : `Request failed with status ${status}`;

/**
 * Creates an API client bound to a fixed base URL.
 *
 * Two call sites, two different base URLs:
 *   - Browser client: baseUrl = '/api/proxy' (relative). The browser
 *     resolves this against the current page's origin, so it always
 *     hits our own Next.js server -- never the Gateway directly.
 *   - Server client: baseUrl = an ABSOLUTE Gateway URL. fetch() running
 *     on the server has no "current page" to resolve a relative URL
 *     against, so a relative baseUrl here would throw
 *     "Failed to parse URL from ...".
 */
export function createApiClient(baseUrl: string) {
    const buildUrl = (path: string, query?: ServiceRequestOptions['query']) => {
        const urlString = path.startsWith('http') ? path : `${baseUrl}${path}`;

        if (!query || Object.keys(query).length === 0) {
            return urlString;
        }

        const searchParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            // Skip empty/nullish values rather than sending
            // "?page=&sort=" which most BE query parsers treat
            // differently from "param not present at all".
            if (value !== undefined && value !== null && value !== '') {
                searchParams.set(key, String(value));
            }
        });

        const queryString = searchParams.toString();
        return queryString ? `${urlString}${urlString.includes('?') ? '&' : '?'}${queryString}` : urlString;
    };

    const executeRequest = async (path: string, options: ServiceRequestOptions = {}) => {
        const { query, body: rawBody, headers, ...fetchOptions } = options;
        const { body, contentType } = normalizeBody(rawBody);

        const mergedHeaders = new Headers(headers);
        if (contentType && !mergedHeaders.has('Content-Type')) {
            mergedHeaders.set('Content-Type', contentType);
        }

        const response = await fetch(buildUrl(path, query), {
            ...fetchOptions,
            headers: mergedHeaders,
            body,
            // Required so the browser attaches our httpOnly cookies
            // (accessToken/refreshToken) on same-origin requests to
            // '/api/proxy/...'. Without this, cookies are NOT sent by
            // default even for same-origin fetch() calls.
            credentials: 'include',
        });
        const payload = await parseResponsePayload(response);

        return { response, payload };
    };

    // Standard call: throws ApiError on non-2xx, otherwise returns the
    // envelope directly. This is what ~90% of call sites should use.
    async function apiRequest<T>(path: string, options: ServiceRequestOptions = {}): Promise<ApiEnvelope<T>> {
        const { response, payload } = await executeRequest(path, options);
        if (!response.ok) {
            throw new ApiError(getErrorMessage(payload, response.status), response.status, payload);
        }
        return payload as ApiEnvelope<T>;
    }

    // Same as apiRequest, but also exposes the raw Response. Needed
    // when the caller must inspect response headers -- e.g. reading
    // Set-Cookie during token refresh, where the rotated refreshToken
    // is NOT present in the JSON body.
    async function apiRequestWithResponse<T>(
        path: string,
        options: ServiceRequestOptions = {},
    ): Promise<ApiResponse<ApiEnvelope<T>>> {
        const { response, payload } = await executeRequest(path, options);
        if (!response.ok) {
            throw new ApiError(getErrorMessage(payload, response.status), response.status, payload);
        }
        return { response, data: payload as ApiEnvelope<T> };
    }

    // Returns the raw, un-parsed Response for streaming use cases
    // (SSE, file downloads, chunked responses) where buffering the
    // whole body via parseResponsePayload would defeat the purpose.
    async function apiStream(path: string, options: ServiceRequestOptions = {}): Promise<Response> {
        const { query, body: rawBody, headers, ...fetchOptions } = options;
        const { body, contentType } = normalizeBody(rawBody);

        const mergedHeaders = new Headers(headers);
        if (contentType && !mergedHeaders.has('Content-Type')) {
            mergedHeaders.set('Content-Type', contentType);
        }

        const response = await fetch(buildUrl(path, query), {
            ...fetchOptions,
            headers: mergedHeaders,
            body,
        });

        if (!response.ok) {
            // Error responses are assumed to be small JSON/text, so
            // it's safe to buffer them here even though the happy
            // path is left as a stream for the caller.
            const payload = await parseResponsePayload(response);
            throw new ApiError(getErrorMessage(payload, response.status), response.status, payload);
        }

        return response;
    }

    return {
        get<T>(path: string, options?: ServiceRequestOptions) {
            return apiRequest<T>(path, { ...options, method: 'GET' });
        },
        getWithResponse<T>(path: string, options?: ServiceRequestOptions) {
            return apiRequestWithResponse<T>(path, { ...options, method: 'GET' });
        },
        post<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
            return apiRequest<T>(path, { ...options, method: 'POST', body });
        },
        postWithResponse<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
            return apiRequestWithResponse<T>(path, { ...options, method: 'POST', body });
        },
        put<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
            return apiRequest<T>(path, { ...options, method: 'PUT', body });
        },
        patch<T>(path: string, body?: ServiceRequestOptions['body'], options?: ServiceRequestOptions) {
            return apiRequest<T>(path, { ...options, method: 'PATCH', body });
        },
        delete<T>(path: string, options?: ServiceRequestOptions) {
            return apiRequest<T>(path, { ...options, method: 'DELETE' });
        },
        stream(path: string, options?: ServiceRequestOptions) {
            return apiStream(path, options);
        },
    };
}