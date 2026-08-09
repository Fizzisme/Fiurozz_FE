// API client for code running on the SERVER ONLY (Route Handlers,
// Server Actions). This hits the Go Gateway directly via an absolute
// URL. Do NOT import this file into any client component -- doing so
// would leak the Gateway's real internal URL into the browser bundle
// and defeat the whole point of the BFF proxy.

import { createApiClient } from './api-core';

export * from './api-core';

// BE_URL is intentionally read WITHOUT the NEXT_PUBLIC_ prefix, so
// Next.js never inlines it into client-side JS bundles -- it only
// exists in the Node process running on the server.
const BE_URL = process.env.BE_URL;

if (!BE_URL) {
    throw new Error('BE_URL is not defined. Set it in your environment variables (server-only, no NEXT_PUBLIC_ prefix).');
}

// baseUrl = an ABSOLUTE URL (e.g. http://gateway:8080), unlike
// client.ts's relative '/api/proxy'. fetch() running on the server
// has no "current page" to resolve a relative URL against, so a
// relative baseUrl here would throw "Failed to parse URL from ...".
export const gatewayClient = createApiClient(BE_URL);