// Shared refresh mutex, used by BOTH middleware.ts and auth-action.ts.
// Only works correctly because middleware is explicitly pinned to the
// Node.js runtime (see middleware.ts's `export const runtime =
// 'nodejs'`) -- Edge Runtime doesn't guarantee this module-level state
// persists across invocations. This also only dedupes within a single
// Node process; a multi-instance/horizontally-scaled deployment would
// need a distributed lock (e.g. Redis) instead.
let isRefreshing = false;
let subscribers: ((success: boolean) => void)[] = [];

export function isRefreshInFlight() {
    return isRefreshing;
}

export function beginRefresh() {
    isRefreshing = true;
}

export function endRefresh(success: boolean) {
    subscribers.forEach((cb) => cb(success));
    subscribers = [];
    isRefreshing = false;
}

export function waitForRefresh(): Promise<boolean> {
    return new Promise((resolve) => {
        subscribers.push(resolve);
    });
}
