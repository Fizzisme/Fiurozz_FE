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
        /* The instance is read inside the tick, never captured here: on the
           first pass the ref is still empty, and a tick that bailed early
           would leave Lenis swallowing wheel events it never acts on. */
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const lenis = lenisRef.current?.lenis;
        lenis?.on('scroll', ScrollTrigger.update);

        return () => {
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

            <main id="top">
                <DesignHero />
                <DesignCanvas />
                <DesignWhy />
                <DesignProcess />
                <DesignWork />
            </main>

            <DesignColophon />
        </div>
    );
}

export default Design;
