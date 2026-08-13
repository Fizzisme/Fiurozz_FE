'use server'

import { gatewayClient } from '@/services/gateway-client';
import type { CurrentUser } from '@/lib/store/user-store';
import { cookies } from 'next/headers';

// Reads the caller's identity via the httpOnly accessToken cookie and
// asks the Gateway for the full profile. The Gateway re-verifies the
// token and attaches X-User-Id when forwarding to User Service --
// this function never decodes/trusts the token itself, it just carries
// it along as a normal Authorization header.
export async function getCurrentUserAction(): Promise<CurrentUser | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) return null;

    try {
        const envelope = await gatewayClient.get<CurrentUser>('/api/users/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return envelope.success ? envelope.data : null;
    } catch {
        return null;
    }
}