'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** How long a scene takes to go, as a share of viewport height. */
const LEAVE = '+=50%';

/** How long an arriving scene is held at the top of the screen while it comes up. */
const ARRIVE = '+=70%';

type SceneProps = {
    /** The opening scene is already on screen; nothing needs to arrive. */
    entry?: boolean;
    /** The closing scene keeps its ground under the colophon, so it never leaves. */
    exit?: boolean;
    children: ReactNode;
};

/**
 * One beat of the page, and it is a cut, not a cross-fade: the scene above goes
 * out completely — ground and all — the screen is bare paper for a moment, and
 * only then does this one come up in its place. The two are never both legible.
 *
 * **Both holds are real pins, and that is the whole point of this rewrite.**
 * Holding a scene still by animating a transform against the scroll is exact on
 * paper and wrong in practice: the position has to be recomputed from the
 * scroll on every single frame, so the error is proportional to scroll speed
 * and the scene visibly shakes under a fast flick. A pin sets `position:
 * fixed`, which does not depend on the scroll at all, so there is nothing left
 * to fall out of step. It is what GSAP itself uses, for exactly this reason.
 *
 * How the two halves meet, for a scene A above a scene B:
 *
 *   A's bottom reaches the bottom of the screen ─┐
 *     A is pinned and fades out over LEAVE       │  A is held, then gone
 *   A unpins and snaps up, still invisible      ─┤
 *     bare paper; B climbs the rest of the way   │  nothing is legible
 *   B's top reaches the top of the screen       ─┤
 *     B is pinned and fades up over ARRIVE       │  B is held, then read
 *
 * `pinSpacing: false` on the leaving half is what lets B climb during it —
 * with spacing on, the pin would add a viewport of scroll with nothing in it.
 * The arriving half keeps its spacing, so B resumes exactly where it was held
 * and none of its content is skipped.
 *
 * The hero is not wrapped in this at all. It pins itself for its opening plate,
 * and GSAP writes a transform onto anything it pins — which would make this
 * component's wrapper a containing block and silently take away the `position:
 * fixed` that the hero's own pin runs on. It carries its own exit instead.
 */
export function Scene({ entry = true, exit = true, children }: SceneProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const veilRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            const veil = veilRef.current;
            if (!root || !veil) return;

            const mm = gsap.matchMedia();

            /* Reduced motion opts out entirely: the page stays a plain document,
               every scene at rest, fully opaque and in flow. */
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                if (entry) {
                    gsap.fromTo(
                        veil,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: root,
                                start: 'top top',
                                end: ARRIVE,
                                pin: true,
                                scrub: true,
                                invalidateOnRefresh: true,
                            },
                        },
                    );
                }

                if (exit) {
                    gsap.to(veil, {
                        opacity: 0,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: root,
                            start: 'bottom bottom',
                            end: LEAVE,
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    });
                }
            });

            return () => mm.revert();
        },
        { scope: rootRef, dependencies: [entry, exit] },
    );

    return (
        <div ref={rootRef} className="relative">
            <div ref={veilRef}>{children}</div>
        </div>
    );
}

export default Scene;
