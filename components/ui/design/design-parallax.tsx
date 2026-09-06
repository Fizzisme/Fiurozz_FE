'use client';

import { cloneElement, useState, type ReactElement, type Ref } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ParallaxProps = {
    /** Half the total travel, in px. Positive drifts up the page, negative down. */
    distance?: number;
    children: ReactElement<{ ref?: Ref<HTMLElement> }>;
};

/**
 * Scrubbed drift for a single element as it crosses the viewport.
 *
 * It renders no wrapper — the ref is cloned onto the child — so it can be
 * dropped around a grid item without disturbing the placement classes that
 * item carries. The scroll range is measured on the parent, since a trigger
 * that is also the thing being moved shifts its own start and end.
 */
export function Parallax({ distance = 14, children }: ParallaxProps) {
    /* State, not a ref: the element has to be a dependency so the tween is
       built on the commit that attaches it. */
    const [el, setEl] = useState<HTMLElement | null>(null);

    useGSAP(() => {
        if (!el) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 720px) and (prefers-reduced-motion: no-preference)', () => {
            gsap.fromTo(
                el,
                { y: distance },
                {
                    y: -distance,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el.parentElement ?? el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                },
            );
        });

        return () => mm.revert();
    }, { dependencies: [el, distance], revertOnUpdate: true });

    return cloneElement(children, { ref: setEl as Ref<HTMLElement> });
}

export default Parallax;
