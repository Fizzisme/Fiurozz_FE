// lib/with-token-refresh.ts
import { cookies } from 'next/headers';
import { ApiError } from '@/services/gateway-client';
import { refreshAccessTokenAction } from '@/actions/auth-action';

// Wraps any Gateway call that requires an accessToken: runs it once,
// and if it fails with 401, refreshes the token and retries exactly
// once more. Centralizes the retry logic so individual Server Actions
// don't each need to reimplement it.
export async function withTokenRefresh<T>(makeRequest: (accessToken: string) => Promise<T>): Promise<T | null> {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('accessToken')?.value;

    // accessToken cookie is missing entirely -- this could mean the
    // user never logged in, OR their access token already expired and
    // the browser dropped the cookie once its maxAge elapsed (the
    // normal, expected lifecycle of a short-lived token). The only way
    // to tell these apart is to check for a refreshToken and attempt
    // one refresh before concluding "not logged in".
    if (!accessToken) {
        const refreshToken = cookieStore.get('refreshToken')?.value;
        if (!refreshToken) return null; // genuinely never logged in

        const refreshResult = await refreshAccessTokenAction();
        if (!refreshResult.success) return null;

        accessToken = (await cookies()).get('accessToken')?.value;
        if (!accessToken) return null;
    }

    try {
        return await makeRequest(accessToken);
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            const refreshResult = await refreshAccessTokenAction();
            if (refreshResult.success) {
                const newToken = (await cookies()).get('accessToken')?.value;
                if (newToken) {
                    try {
                        return await makeRequest(newToken);
                    } catch {
                        return null;
                    }
                }
            }
        }
        return null;
    }
}
