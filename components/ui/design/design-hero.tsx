'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plate, PlateNib } from './design-icons';
import { Reveal, RevealLines, RevealGate } from './design-reveal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Scroll distance the opening plate takes to settle, as a share of viewport height. */
const INTRO_TRAVEL = '+=100%';

/** Point in the shrink at which the copy is allowed to come in behind it. */
const COPY_CUE = 0.7;

/** Scene 01 — the studio. Title, lede, the call, and the reserved hero plate. */
export function DesignHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    /* The copy sits at its reveal `initial` until the plate has nearly landed.
       Guarded by a ref so the scrub doesn't call setState every frame. */
    const [copyIn, setCopyIn] = useState(false);
    const copyInRef = useRef(false);
    const showCopy = useCallback(() => {
        if (copyInRef.current) return;
        copyInRef.current = true;
        setCopyIn(true);
    }, []);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const frame = frameRef.current;
            if (!section || !frame) return;

            const mm = gsap.matchMedia();

            /* Below the two-column breakpoint the section is only `min-h-svh`,
               so it can outgrow the viewport and there is no stable frame to
               fly the plate back into. Same for a reduced-motion request. */
            mm.add('(max-width: 999px), (prefers-reduced-motion: reduce)', () => {
                showCopy();
            });

            mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
                /* Measured against the section rather than the viewport: while
                   pinned the two are the same box, so this holds at any scroll
                   position and survives a refresh mid-scrub. */
                let opening = { x: 0, y: 0, scale: 1 };

                const measure = () => {
                    gsap.set(frame, { clearProps: 'transform' });

                    const bounds = section.getBoundingClientRect();
                    const plate = frame.getBoundingClientRect();
                    const vw = window.innerWidth;
                    const vh = window.innerHeight;

                    opening = {
                        x: vw / 2 - (plate.left - bounds.left + plate.width / 2),
                        y: vh / 2 - (plate.top - bounds.top + plate.height / 2),
                        scale: Math.max(vw / plate.width, vh / plate.height),
                    };
                };

                measure();
                gsap.set(frame, { zIndex: 40 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: INTRO_TRAVEL,
                        pin: true,
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        onRefreshInit: measure,
                        onUpdate: (self) => {
                            if (self.progress >= COPY_CUE) showCopy();
                        },
                    },
                });

                /* The hairline would read as a 2px frame at full bleed, so it
                   draws itself back on as the plate returns to size. */
                tl.fromTo(
                    frame,
                    { x: () => opening.x, y: () => opening.y, scale: () => opening.scale, borderWidth: 0 },
                    { x: 0, y: 0, scale: 1, borderWidth: 1, ease: 'none' },
                );
            });

            return () => mm.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            id="hero"
            aria-labelledby="hero-title"
            data-scene="01"
            className="relative flex min-h-svh flex-col bg-ctr-paper px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(4.5rem,8vh,6.5rem)] pb-[clamp(3.5rem,6vh,5rem)] text-ctr-ink min-[1000px]:h-svh min-[1000px]:overflow-hidden"
        >
            <RevealGate.Provider value={copyIn}>
                <div className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 content-start gap-[clamp(2.5rem,5vh,4.5rem)] min-[1000px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.38fr)] min-[1000px]:items-center min-[1000px]:gap-[clamp(2rem,4vw,4.5rem)]">
                    <div className="flex justify-center">
                        <div className="max-w-full">
                            <h1
                                id="hero-title"
                                className="max-w-[15ch] font-ctr-serif text-ctr-display leading-[0.99] tracking-[-0.022em] font-normal"
                            >
                                <RevealLines
                                    lines={[
                                        'Your ideas deserve',
                                        'a place to',
                                        <em className="font-normal italic text-ctr-terracotta" key="l3">
                                            become real.
                                        </em>,
                                    ]}
                                />
                            </h1>

                            <Reveal
                                as="p"
                                delay={1}
                                className="mt-[clamp(1.4rem,2.4vw,2.1rem)] max-w-[44ch] font-ctr-serif text-ctr-lede leading-[1.66] text-ctr-ink-soft"
                            >
                                Catronaut is a design studio you talk to. Bring the site, the product interface, the
                                half-formed idea. It finds the art direction, composes the page, and builds something you
                                can actually ship.
                            </Reveal>

                            <Reveal
                                as="p"
                                delay={2}
                                className="mt-[clamp(1.7rem,2.8vw,2.5rem)] flex  max-[1000px]:justify-center"
                            >
                                <Plate href="#canvas">
                                    Start designing
                                    <PlateNib />
                                </Plate>
                            </Reveal>
                        </div>
                    </div>

                    {/*
                          ── HERO SLOT ───────────────────────────────────────────────
                          The artwork lives in a fixed 16:9 frame, so swapping the still
                          for motion later changes nothing else on the page.

                          On desktop the frame opens at full bleed and is scrubbed back
                          into this slot by the scroll — see the timeline above.
                        */}
                    <figure className="relative mt-[clamp(0.5rem,2vh,2rem)] min-[1000px]:mt-0">
                        <div
                            ref={frameRef}
                            className="relative aspect-[16/9] overflow-hidden border border-ctr-ink-faint bg-ctr-paper-lift shadow-[0_1px_0_rgba(43,58,74,0.22),0_22px_40px_-28px_rgba(43,58,74,0.75)]"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src="/design/hero.png"
                                    width={1672}
                                    height={941}
                                    sizes="100vw"
                                    priority
                                    alt="An illustrated Dutch polder in muted watercolour: canvases on wooden easels standing among tulip fields beside a canal, each labelled with a part of a website — half-formed idea, page structure, product interfaces, visual direction, content strategy — with a small astronaut cat holding a painter’s palette, a windmill on the left and a village on the right."
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>

                        <Reveal
                            as="figcaption"
                            delay={3}
                            className="mt-[0.9rem] flex flex-wrap items-baseline gap-x-[1.4em] gap-y-[0.4em] border-t border-ctr-ink-hair pt-[0.8rem] font-ctr-mono text-ctr-micro uppercase tracking-[0.1em] text-ctr-ink-soft"
                        >
                            <span className="text-ctr-ink">Plate&nbsp;I</span>
                            <span className="font-ctr-serif text-[0.9rem] normal-case tracking-[0.02em]">
                                <i>Fields under construction</i>
                            </span>
                            <span className="ml-auto">16:9 · centred · ivory ground</span>
                        </Reveal>
                    </figure>

                    <Reveal
                        as="aside"
                        delay={3}
                        aria-hidden="true"
                        className="absolute top-[42%] hidden gap-[1.6em] font-ctr-mono text-ctr-micro uppercase tracking-[0.24em] text-ctr-ink-soft [writing-mode:vertical-rl] min-[1000px]:flex"
                        style={{ left: 'calc(clamp(1.5rem,5vw,6rem) * 0.32)' }}
                    >
                        <span>52°22′N</span>
                        <span>4°54′E</span>
                        <span>—</span>
                        <span>the studio</span>
                    </Reveal>
                </div>
            </RevealGate.Provider>
        </section>
    );
}

export default DesignHero;
