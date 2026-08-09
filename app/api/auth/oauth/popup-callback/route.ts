// This is a Route Handler, NOT a page -- Route Handlers are one of
// the contexts Next.js allows cookie mutation in. Doing the exchange
// + cookies().set() here (instead of inside a Server Component's
// render, like the old page.tsx did) avoids the
// "Cookies can only be modified in a Server Action or Route Handler" error.

import { NextRequest, NextResponse } from 'next/server';
import { exchangeOAuthCodeAction } from '@/actions/authAction';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    const error = req.nextUrl.searchParams.get('error');
    const result = !error && code ? await exchangeOAuthCodeAction(code) : { success: false };

    const html = `
        <!DOCTYPE html>
        <html>
        <body>
        <script>
            window.opener.postMessage('${result.success ? 'oauth-success' : 'oauth-failed'}', window.location.origin);
            window.close();
        </script>
        </body>
        </html>
    `;

    return new NextResponse(html, {
        headers: { 'content-type': 'text/html' },
    });
}