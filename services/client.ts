// API client for code running in the BROWSER (components, authService,
// etc). Do NOT use this in a Route Handler or Server Action -- those
// run on the server and must use gateway-client.ts instead (which
// hits the Gateway directly via an absolute URL).

import { createApiClient } from './api-core';

// Re-export shared types/classes (ApiEnvelope, ApiError, ApiResponse,
// ServiceRequestOptions, etc.) so callers can import everything from
// '@/services/client' without also importing from 'api-core' directly.
// Keeps existing imports working after the core logic was split out.
export * from './api-core';

// baseUrl = '/api/proxy' (a RELATIVE path, not a full URL).
//
// Since this runs in the browser, every request through apiClient
// resolves against the current page's own origin. E.g. if the user
// has https://myapp.com open, a call becomes:
// https://myapp.com/api/proxy/auth/login
//
// This request NEVER reaches the Go Gateway directly. It always hits
// our own Route Handler at app/api/proxy/[...path]/route.ts first --
// that's the only place that reads the httpOnly cookies, attaches the
// Authorization header, and forwards the request to the Gateway.
// This is the core of the BFF architecture: the browser never knows
// the Gateway's real URL and never holds the access token itself.
export const apiClient = createApiClient('/api/proxy');