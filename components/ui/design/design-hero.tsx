'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plate, PlateNib } from './design-icons';
import { Reveal, RevealLines, RevealGate } from './design-reveal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* The whole pinned opening, in timeline units mapped onto the scroll range
   below: the plate settles, the scene is held at rest long enough to be read,
   then it goes. The hero carries its own exit rather than being wrapped in a
   `Scene` like every other scene — GSAP writes a transform onto anything it
   pins, and a Scene wrapper pinned around this one would become a containing
   block and quietly take away the `position: fixed` this pin runs on. */
const INTRO_UNITS = 1;
const HOLD_UNITS = 0.15;
const LEAVE_UNITS = 0.5;
const TOTAL_UNITS = INTRO_UNITS + HOLD_UNITS + LEAVE_UNITS;

/** Scroll distance the pinned opening takes, as a share of viewport height. */
const INTRO_TRAVEL = `+=${TOTAL_UNITS * 100}%`;

/**
 * Scroll the page reserves under the hero, as a share of viewport height, and
 * the reason the pin below runs with `pinSpacing: false`.
 *
 * GSAP's own spacing would add the *whole* pin to the page, which would leave
 * the canvas a full viewport below the fold at the moment the hero finishes
 * going — a screen of nothing to scroll through before anything arrives.
 * Reserving only the part before the exit lets the canvas climb into place
 * while the hero is still fading, so the gap between them is the same short
 * beat of bare paper that separates every other pair of scenes.
 */
const RESERVE_UNITS = INTRO_UNITS + HOLD_UNITS;

/** Point in the shrink at which the copy is allowed to come in behind it —
 *  a share of the plate's own beat, restated against the full timeline. */
const COPY_CUE = (0.7 * INTRO_UNITS) / TOTAL_UNITS;

/** Scene 01 — the studio. Title, lede, the call, and the reserved hero plate. */
export function DesignHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    /* Holds the reserved scroll as padding, and carries the fade on the way out
       — fading the wrapper rather than the section keeps the pinned element
       itself untouched, and opacity reaches the pinned child all the same. */
    const shellRef = useRef<HTMLDivElement>(null);

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
            const content = contentRef.current;
            const shell = shellRef.current;
            if (!section || !frame || !content || !shell) return;

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
                    gsap.set([frame, content], { clearProps: 'transform' });

                    /* Re-stated on every refresh, since it is a share of a
                       viewport height that can change under us. */
                    shell.style.paddingBottom = `${RESERVE_UNITS * window.innerHeight}px`;

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
                        /* The shell above reserves the scroll instead — see
                           RESERVE_UNITS for why GSAP's own spacing is wrong here. */
                        pinSpacing: false,
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        /* No refreshPriority: ScrollTrigger sorts refreshes by the
                           trigger's document position, so this one — topmost on
                           the page — already remeasures first, and every pin below
                           it is then priced off where this one releases. Setting a
                           priority by hand inverts that order (the sort weights it
                           by -1e6, so a *higher* number goes first) and the scenes
                           below end up measured as if this pin had no spacer. */
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
                    { x: 0, y: 0, scale: 1, borderWidth: 1, ease: 'none', duration: INTRO_UNITS },
                );

                /* Then the beat of rest, which is just the timeline running out
                   of tweens — HOLD_UNITS of scroll with the studio at a stand. */
                tl.to({}, { duration: HOLD_UNITS });

                /* And then it goes, ground and all, while still pinned: nothing
                   moves, the light just drops. By the end the screen is the
                   page's bare paper and the canvas is climbing up behind it. */
                tl.to(shell, { opacity: 0, ease: 'none', duration: LEAVE_UNITS });

                return () => {
                    shell.style.paddingBottom = '';
                };
            });

            return () => mm.revert();
        },
        { scope: sectionRef },
    );

    return (
        /* The shell holds the scroll the pinned opening needs (see
           RESERVE_UNITS) and carries the fade on the way out. It must never
           take a transform of its own: that would make it a containing block
           and the section's pin would stop being fixed to the viewport. */
        <div ref={shellRef}>
            <section
                ref={sectionRef}
                id="hero"
                aria-labelledby="hero-title"
                data-scene="01"
                className="relative flex min-h-svh flex-col bg-ctr-paper px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(4.5rem,8vh,6.5rem)] pb-[clamp(3.5rem,6vh,5rem)] text-ctr-ink min-[1000px]:h-svh min-[1000px]:overflow-hidden"
            >
                <RevealGate.Provider value={copyIn}>
                    <div
                        ref={contentRef}
                        className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 content-start gap-[clamp(2.5rem,5vh,4.5rem)] min-[1000px]:grid-cols-[minmax(0,0.82fr)_minmax(0,1.38fr)] min-[1000px]:items-center min-[1000px]:gap-[clamp(2rem,4vw,4.5rem)]"
                    >
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
                                    half-formed idea. It finds the art direction, composes the page, and builds
                                    something you can actually ship.
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
                    </div>

                    {/* Outside the grid on purpose. The coordinates hang in the
                        section's left margin, which only works while the section is
                        what they are positioned against — and the grid becomes that
                        the moment the surrounding Scene transforms it on the way out
                        (a transform makes an element a containing block for absolute
                        children). Nested in the grid, they used to jump a full
                        gutter inwards mid-dissolve and land on top of the lede. */}
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
                </RevealGate.Provider>
            </section>
        </div>
    );
}

export default DesignHero;
