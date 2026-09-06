'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The standing rail — wordmark, edition, scene number. Always visible.
 *
 * It also owns the scroll frame from v1/main.js: which scene we are in, and
 * whether the rail is printing over a dark ground.
 */
export function DesignRail() {
    const railRef = useRef<HTMLElement>(null);
    const [sceneIndex, setSceneIndex] = useState('01');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const rail = railRef.current;

        const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
        /* dark grounds: the canvas scene, the invite block, the colophon */
        const darks = Array.from(document.querySelectorAll<HTMLElement>('[data-ctr-tone="dark"]'));
        /* the sheet is a pale island inside a dark scene; the rail must read it */
        const lights = Array.from(document.querySelectorAll<HTMLElement>('[data-ctr-tone="light"]'));

        let ticking = false;

        const frame = () => {
            ticking = false;
            const vh = window.innerHeight;
            const mark = vh * 0.34;

            /* scene number */
            for (let i = scenes.length - 1; i >= 0; i--) {
                const r = scenes[i].getBoundingClientRect();
                if (r.top <= mark) {
                    const n = scenes[i].getAttribute('data-scene');
                    if (n) setSceneIndex((current) => (current === n ? current : n));
                    break;
                }
            }

            /* the rail reads its own ground */
            if (rail) {
                const railY = rail.offsetHeight * 0.55;
                let onDark = darks.some((el) => {
                    const b = el.getBoundingClientRect();
                    return b.top <= railY && b.bottom >= railY;
                });
                if (onDark && rail.firstElementChild) {
                    const markX = rail.firstElementChild.getBoundingClientRect().right;
                    onDark = !lights.some((el) => {
                        const b = el.getBoundingClientRect();
                        return b.top <= railY && b.bottom >= railY && b.left <= markX;
                    });
                }
                setIsDark(onDark);
            }
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(frame);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        frame();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <header
            ref={railRef}
            className={[
                'pointer-events-none fixed inset-x-0 top-0 z-[80] flex items-baseline gap-[1.4em] justify-between',
                'px-[clamp(1.5rem,5vw,6rem)] py-[clamp(1rem,2vw,1.7rem)]',
                isDark ? '[mix-blend-mode:normal]' : '[mix-blend-mode:multiply]',
            ].join(' ')}
        >
            <a
                href="#top"
                className={[
                    'pointer-events-auto font-ctr-serif text-[clamp(0.95rem,1.15vw,1.16rem)] font-medium uppercase tracking-[0.24em] no-underline',
                    isDark ? 'text-ctr-on-dark' : 'text-ctr-ink',
                ].join(' ')}
            >
                Catronaut
            </a>
            <p
                className={[
                    'pointer-events-auto min-w-[4.4em] text-right font-ctr-mono text-ctr-micro uppercase tracking-[0.1em]',
                    isDark ? 'text-ctr-on-dark-soft' : 'text-ctr-ink-soft',
                ].join(' ')}
                aria-hidden="true"
            >
                <span data-scene-index>{sceneIndex}</span>
                <span
                    className={['mx-[0.35em]', isDark ? 'text-[rgba(237,229,211,0.45)]' : 'text-ctr-ink-faint'].join(
                        ' ',
                    )}
                >
                    /
                </span>
                <span>05</span>
            </p>
        </header>
    );
}

export default DesignRail;
