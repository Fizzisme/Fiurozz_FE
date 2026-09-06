'use client';

import { useEffect, useRef } from 'react';
import { Archivo, Courier_Prime, EB_Garamond } from 'next/font/google';
import { ReactLenis, type LenisRef } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DesignRail } from '@/components/ui/design/design-rail';
import { DesignHero } from '@/components/ui/design/design-hero';
import { DesignCanvas } from '@/components/ui/design/design-canvas';
import { DesignWhy } from '@/components/ui/design/design-why';
import { DesignProcess } from '@/components/ui/design/design-process';
import { DesignWork } from '@/components/ui/design/design-work';
import { DesignColophon } from '@/components/ui/design/design-colophon';
import { Scene } from '@/components/ui/design/design-scene';

/* The atelier sets in EB Garamond, Archivo and Courier Prime — self-hosted,
   exposed as CSS variables the ctr-serif / ctr-sans / ctr-mono Tailwind
   tokens (app/globals.css) point at. */
const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-eb-garamond',
});

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-archivo',
});

const courierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-courier-prime',
});

/**
 * The furthest the page is allowed to fall behind the wheel, in pixels.
 *
 * Lenis closes about a tenth of that gap each frame, so this is really a speed
 * limit of roughly a tenth of it per frame. Below the limit nothing is touched
 * — a slow read, or stopping to look again, behaves exactly as it always did.
 * Above it the surplus is *held, not discarded*: it is released over the frames
 * that follow, so a hard flick turns into a long even glide through the scenes
 * rather than a jump past them, and the page still travels the full distance
 * the wheel asked for.
 */
const MAX_LEAD = 700;

/* The laid-paper fibre texture sits behind everything, held still while the
   page scrolls under it. It's one small inline data URI, so it stays with
   the one component that uses it rather than living in a shared stylesheet. */
const GRAIN_URL =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='170'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='170' height='170' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/**
 * Catronaut — V1 · Dutch Artist Atelier.
 *
 * A direct port of `v1/index.html`, styled entirely with Tailwind utilities
 * (plus the `ctr-*` design tokens in app/globals.css) — no page-specific
 * stylesheet, so nothing here can leak into any other route.
 *
 * Scenes, top to bottom:
 *  01 DesignHero     — the studio: title, lede, and the reserved hero plate
 *  02 DesignCanvas   — the sheet you write on, and the margin of the desk
 *  03 DesignWhy      — four things we hold to
 *  04 DesignProcess  — how Catronaut thinks: the design loop, drawn to scale
 *  05 DesignWork     — the archive, then the invitation back to the sheet
 */
export function Design() {
    const lenisRef = useRef<LenisRef>(null);

    /* the ivory ground needs to reach the overscroll gutters too, and only
       for as long as this page is mounted */
    useEffect(() => {
        const previous = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#F2ECDF';
        return () => {
            document.body.style.backgroundColor = previous;
        };
    }, []);

    /* One clock for both: Lenis stops driving its own rAF (`autoRaf: false`)
       and is stepped by the GSAP ticker instead, so eased scroll and every
       ScrollTrigger on the page read the same frame. Lag smoothing is off
       for the same reason — a smoothed catch-up would desync the scrub. */
    useEffect(() => {
        /* Where the reader has actually asked to be, which is not the same as
           where Lenis is allowed to head next once the cap below bites. */
        let intent = 0;
        /* The last target we handed Lenis, so anything else that shows up on
           `targetScroll` can only have come from the reader's own input. */
        let handed = 0;
        /* Only the reader's scrolling is capped. A programmatic scroll — the
           "Start designing" plate handing a hash to Lenis — drives
           `targetScroll` itself and would otherwise read as input. */
        let byHand = false;
        const noteInput = () => {
            byHand = true;
        };
        window.addEventListener('wheel', noteInput, { passive: true });
        window.addEventListener('touchmove', noteInput, { passive: true });

        /* The instance is read inside the tick, never captured here: on the
           first pass the ref is still empty, and a tick that bailed early
           would leave Lenis swallowing wheel events it never acts on. */
        const update = (time: number) => {
            const active = lenisRef.current?.lenis;

            if (active) {
                if (byHand) {
                    /* Whatever moved the target since the last frame is new
                       intent — one wheel notch, or twenty. */
                    intent += active.targetScroll - handed;

                    const lead = intent - active.animatedScroll;
                    if (Math.abs(lead) < 1) {
                        byHand = false;
                    } else {
                        const capped =
                            active.animatedScroll + Math.max(-MAX_LEAD, Math.min(MAX_LEAD, lead));
                        if (Math.abs(capped - active.targetScroll) > 0.5) {
                            active.scrollTo(capped, { programmatic: false, lerp: active.options.lerp });
                        }
                    }
                    handed = active.targetScroll;
                } else {
                    intent = handed = active.targetScroll;
                }
            }

            active?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const lenis = lenisRef.current?.lenis;
        lenis?.on('scroll', ScrollTrigger.update);

        return () => {
            window.removeEventListener('wheel', noteInput);
            window.removeEventListener('touchmove', noteInput);
            lenis?.off('scroll', ScrollTrigger.update);
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500, 33);
        };
    }, []);

    return (
        <div
            className={`${ebGaramond.variable} ${archivo.variable} ${courierPrime.variable} relative overflow-x-clip bg-ctr-paper font-ctr-serif text-[clamp(1rem,1.05vw,1.1rem)] leading-[1.62] text-ctr-ink [font-variant-numeric:oldstyle-nums] selection:bg-ctr-ochre selection:text-ctr-ink`}
        >
            {/* `anchors` hands same-page hash clicks (the "Start designing"
                plates) to Lenis's own scrollTo instead of the browser's
                instant native jump — without it the native jump and Lenis's
                still-running lerp fight over the scroll position and the
                page settles somewhere past the target. */}
            <ReactLenis root options={{ autoRaf: false, anchors: true }} ref={lenisRef} />

            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[90] opacity-[0.22] mix-blend-multiply"
                style={{ backgroundImage: GRAIN_URL }}
            />

            <DesignRail />

            {/* Exactly one transition, and only the first: the studio fades out
                completely, the screen is bare paper for a beat, and the canvas
                comes up in its place. Everything from the canvas down scrolls
                the way it always did.

                It takes two halves to do that. The hero owns the leaving half
                itself — it pins for its opening plate, and GSAP writes a
                transform onto anything it pins, so a Scene wrapper around it
                would become a containing block and take that pin away. The
                canvas owns the arriving half, and needs it: without one it is
                fully opaque and would climb over the lower half of the screen
                while the studio was still fading. It never leaves, so nothing
                below it is touched. */}
            <main id="top">
                <DesignHero />
                <Scene exit={false}>
                    <DesignCanvas />
                </Scene>
                <DesignWhy />
                <DesignProcess />
                <DesignWork />
            </main>

            <DesignColophon />
        </div>
    );
}

export default Design;
