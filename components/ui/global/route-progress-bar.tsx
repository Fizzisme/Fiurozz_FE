'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Progress } from '@/components/animate-ui/components/radix/progress';

/** Progress jumps to this value immediately on click, so the user gets instant feedback instead of starting from 0. */
const INITIAL_PROGRESS = 15;

/** Progress asymptotically approaches this value while the real navigation is still in flight (see `start`). It never reaches 100 on its own. */
const MAX_AUTO_PROGRESS = 90;

/** Interval (ms) between each auto-increment tick while navigating. */
const TICK_INTERVAL_MS = 150;

/** Delay (ms) to let the bar visually reach 100% before it's unmounted. */
const HIDE_DELAY_MS = 300;

function ProgressBarInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Whether the bar should currently be mounted/visible.
    const [isNavigating, setIsNavigating] = useState(false);
    // Current progress value (0-100) fed into <Progress />.
    const [progress, setProgress] = useState(0);

    // Handle for the auto-increment interval, so it can be cleared on finish/restart.
    // Stored in a ref (not state) because it's an internal bookkeeping value that
    // shouldn't trigger re-renders on its own.
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Snapshot of the current route (pathname + query string), used to detect
    // when navigation has actually completed (see the pathname effect below).
    const currentKeyRef = useRef(`${pathname}?${searchParams?.toString()}`);

    /**
     * Called the moment the user clicks an internal link.
     * Shows the bar and starts an eased auto-increment that stalls at
     * MAX_AUTO_PROGRESS, since we don't know the real load duration yet.
     */
    const start = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        setIsNavigating(true);
        setProgress(INITIAL_PROGRESS);

        timerRef.current = setInterval(() => {
            // Ease-out toward MAX_AUTO_PROGRESS: increments shrink as `p`
            // approaches the ceiling, so the bar visually "waits" for the
            // real completion signal instead of finishing prematurely.
            setProgress((p) => (p < MAX_AUTO_PROGRESS ? p + (MAX_AUTO_PROGRESS - p) * 0.1 : p));
        }, TICK_INTERVAL_MS);
    }, []);

    /**
     * Called once the target route has actually finished rendering
     * (detected via the pathname/searchParams effect below).
     * Completes the bar to 100% and hides it shortly after.
     */
    const finish = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        setProgress(100);

        // Keep the bar mounted briefly so the 100% state is visible
        // before resetting for the next navigation.
        setTimeout(() => {
            setIsNavigating(false);
            setProgress(0);
        }, HIDE_DELAY_MS);
    }, []);

    // Detect route completion: Next.js updates `pathname`/`searchParams`
    // only after the new route has rendered, so a change here is our
    // reliable "navigation finished" signal (independent of click events).
    useEffect(() => {
        const key = `${pathname}?${searchParams?.toString()}`;

        if (key !== currentKeyRef.current) {
            currentKeyRef.current = key;
            finish();
        }
    }, [pathname, searchParams, finish]);

    // Detect navigation intent: listen for clicks on any internal <a> tag
    // (rendered by next/link) at the document level, rather than wiring
    // a handler to every individual Link instance.
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement)?.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');

            // Skip anchors with no href, or in-page hash links (no route change).
            if (!href || href.startsWith('#')) return;

            // Skip links that open in a new tab.
            if (anchor.target === '_blank') return;

            // Skip modified clicks (new tab / download), let the browser handle them natively.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            try {
                const url = new URL(href, window.location.href);

                // Skip external links — not a client-side Next.js navigation.
                if (url.origin !== window.location.origin) return;

                const nextKey = `${url.pathname}?${url.searchParams.toString()}`;

                // Skip clicks that target the current route (no-op navigation).
                if (nextKey === currentKeyRef.current) return;

                start();
            } catch {
                // Malformed or non-navigable href (e.g. "mailto:", "tel:") — ignore.
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [start]);

    return (
        <AnimatePresence>
            {isNavigating && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    // Fixed to the very top of the viewport, above the header (z-10),
                    // and non-interactive so it never blocks clicks on content below it.
                    className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
                >
                    <Progress value={progress} className="w-full" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Top-of-page loading indicator that animates while navigating between
 * routes via next/link, similar to NProgress/YouTube-style progress bars.
 *
 * Wrapped in Suspense because `useSearchParams()` requires a Suspense
 * boundary in the Next.js App Router.
 */
export default function RouteProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarInner />
        </Suspense>
    );
}
