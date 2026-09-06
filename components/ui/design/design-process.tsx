'use client';

import { motion, type Variants } from 'motion/react';
import { Reveal } from './design-reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.32, 0.72, 0, 1] as const;

/** The ring's tick marks — plotted the same way v1/main.js plotted them. */
const TICKS = (() => {
    const cx = 660;
    const cy = 560;
    const rr = 200;
    const out: string[] = [];
    for (let a = 0; a < 360; a += 9) {
        const rad = (a * Math.PI) / 180;
        const r1 = rr + 10;
        const r2 = rr + (a % 45 === 0 ? 24 : 15);
        out.push(
            'M' +
                (cx + r1 * Math.cos(rad)).toFixed(1) +
                ' ' +
                (cy + r1 * Math.sin(rad)).toFixed(1) +
                'L' +
                (cx + r2 * Math.cos(rad)).toFixed(1) +
                ' ' +
                (cy + r2 * Math.sin(rad)).toFixed(1),
        );
    }
    return out;
})();

/** The ink strokes draw themselves on — `pathLength` does what a hand-rolled
 *  `getTotalLength()` + `stroke-dasharray` dance used to. */
const drawLine: Variants = {
    hidden: { pathLength: 0 },
    shown: (i: number) => ({
        pathLength: 1,
        transition: { duration: 1.5, delay: i * 0.13, ease: EASE_SOFT },
    }),
};

/** Everything else just fades in, some of it staggered, one group (the
 *  tick ring) settling at less than full opacity. */
const fadeIn: Variants = {
    hidden: { opacity: 0 },
    shown: ({ delay = 0, opacity = 1 }: { delay?: number; opacity?: number } = {}) => ({
        opacity,
        transition: { duration: 0.9, delay, ease: EASE },
    }),
};

/** Scene 04 — how Catronaut thinks. The design loop, drawn onto the sheet. */
export function DesignProcess() {
    return (
        <section
            id="process"
            aria-labelledby="process-title"
            data-scene="04"
            className="relative min-h-[max(130svh,900px)] bg-ctr-paper bg-center px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(6rem,11vh,10rem)] pb-[clamp(5rem,9vh,8rem)] text-ctr-ink [background-image:linear-gradient(var(--color-ctr-ink-hair)_1px,transparent_1px),linear-gradient(90deg,var(--color-ctr-ink-hair)_1px,transparent_1px)] [background-size:100%_96px,96px_100%]"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-[clamp(1.5rem,5vw,6rem)] top-0 h-px bg-ctr-ink-hair"
            />
            <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-[clamp(3rem,6vw,6rem)] min-[1000px]:grid-cols-[minmax(190px,0.34fr)_minmax(0,1.66fr)] min-[1000px]:items-start">
                <header className="relative min-[1000px]:sticky min-[1000px]:top-[26vh]">
                    <Reveal
                        as="h2"
                        id="process-title"
                        className="font-ctr-serif text-ctr-h2 leading-[1.02] font-normal tracking-[-0.02em]"
                    >
                        How Catronaut thinks
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={1}
                        className="mt-[1.3rem] max-w-[34ch] font-ctr-serif text-ctr-lede text-ctr-ink-soft"
                    >
                        It does not generate a page. It runs a loop, and that loop returns to the
                        art direction, not to a blank sheet.
                    </Reveal>
                    <p
                        aria-hidden="true"
                        className="mt-[2.2rem] border-t border-ctr-ink-faint pt-[0.9rem] font-ctr-mono text-ctr-micro tracking-[0.16em] text-ctr-ink-soft uppercase"
                    >
                        fig. 1 · the design loop · drawn to scale
                    </p>
                </header>

                <Reveal as="figure" delay={2} className="w-full min-w-0 justify-self-stretch">
                    <div>
                        <motion.svg
                            className="mx-auto h-auto w-full max-w-[954px]"
                            viewBox="0 0 1280 1040"
                            role="img"
                            aria-labelledby="loop-title loop-desc"
                            initial="hidden"
                            whileInView="shown"
                            viewport={{ once: true, amount: 0.08 }}
                        >
                            <title id="loop-title">The Catronaut design loop</title>
                            <desc id="loop-desc">
                                Plotted on a coordinate frame. A prompt enters and context is read;
                                then five stages turn on a ring — art direction, layout with type
                                and image, render, visual review, iteration — and iteration returns
                                to art direction rather than starting over.
                            </desc>

                            <motion.g variants={fadeIn} stroke="#2B3A4A" fill="none" opacity=".45">
                                <path d="M70 90 V960 H1230" strokeWidth="1" />
                                <g strokeWidth=".9">
                                    <path d="M62 150 H70" />
                                    <path d="M62 360 H70" />
                                    <path d="M62 498 H70" />
                                    <path d="M62 560 H70" />
                                    <path d="M62 722 H70" />
                                    <path d="M150 960 V968" />
                                    <path d="M360 960 V968" />
                                    <path d="M470 960 V968" />
                                    <path d="M660 960 V968" />
                                    <path d="M778 960 V968" />
                                    <path d="M850 960 V968" />
                                </g>
                            </motion.g>
                            {[
                                ['56', '156', 'y·0150'],
                                ['56', '366', 'y·0360'],
                                ['56', '504', 'y·0498'],
                                ['56', '566', 'y·0560'],
                                ['56', '728', 'y·0722'],
                            ].map(([x, y, t]) => (
                                <motion.text
                                    key={t}
                                    variants={fadeIn}
                                    className="fill-ctr-ink-soft font-ctr-mono text-[16px] tracking-[0.1em]"
                                    x={x}
                                    y={y}
                                >
                                    {t}
                                </motion.text>
                            ))}
                            {[
                                ['150', 'x·0150'],
                                ['360', 'x·0360'],
                                ['470', 'x·0470'],
                                ['660', 'x·0660'],
                                ['850', 'x·0850'],
                            ].map(([x, t]) => (
                                <motion.text
                                    key={t}
                                    variants={fadeIn}
                                    className="fill-ctr-ink-soft font-ctr-mono text-[16px] tracking-[0.1em]"
                                    style={{ textAnchor: 'middle' }}
                                    x={x}
                                    y="990"
                                >
                                    {t}
                                </motion.text>
                            ))}
                            <motion.text
                                variants={fadeIn}
                                className="fill-ctr-ink-soft font-ctr-mono text-[17px] tracking-[0.08em]"
                                style={{ textAnchor: 'end' }}
                                x="56"
                                y="990"
                            >
                                0,0
                            </motion.text>

                            <g fill="none" stroke="#2B3A4A" strokeLinecap="round">
                                <motion.path
                                    custom={0}
                                    variants={drawLine}
                                    strokeWidth="1.35"
                                    d="M186 150 H312"
                                />
                                <motion.path
                                    custom={1}
                                    variants={drawLine}
                                    strokeWidth="1.35"
                                    d="M396 150 H470 V360 H610"
                                />
                            </g>
                            <g fill="#2B3A4A">
                                <motion.path
                                    custom={{ delay: 0.5 * 0.13 }}
                                    variants={fadeIn}
                                    d="M318 150 L304 144 L304 156 Z"
                                />
                                <motion.path
                                    custom={{ delay: 1.5 * 0.13 }}
                                    variants={fadeIn}
                                    d="M616 360 L602 354 L602 366 Z"
                                />
                            </g>

                            <g fill="none" strokeLinecap="round">
                                <motion.path
                                    custom={2}
                                    variants={drawLine}
                                    stroke="#2B3A4A"
                                    strokeWidth="1.54"
                                    d="M707.2 363.7 A 200 200 0 0 1 829.5 458.1"
                                />
                                <motion.path
                                    custom={3}
                                    variants={drawLine}
                                    stroke="#2B3A4A"
                                    strokeWidth="1.18"
                                    d="M857.9 544.6 A 200 200 0 0 1 812.7 689.3"
                                />
                                <motion.path
                                    custom={4}
                                    variants={drawLine}
                                    stroke="#2B3A4A"
                                    strokeWidth="1.49"
                                    d="M738.8 743.1 A 200 200 0 0 1 581.2 745.5"
                                />
                                <motion.path
                                    custom={5}
                                    variants={drawLine}
                                    stroke="#2B3A4A"
                                    strokeWidth="1.15"
                                    d="M507.0 692.4 A 200 200 0 0 1 462.4 541.5"
                                />
                                <motion.path
                                    custom={6}
                                    variants={drawLine}
                                    stroke="#BE6247"
                                    strokeWidth="1.60"
                                    d="M490.2 455.2 A 200 200 0 0 1 613.1 366.6"
                                />
                            </g>
                            <g>
                                <motion.path
                                    custom={{ delay: 2.5 * 0.13 }}
                                    variants={fadeIn}
                                    fill="#2B3A4A"
                                    d="M0 -6 L12 0 L0 6 Z"
                                    transform="translate(777.6 398.2) rotate(36.0)"
                                />
                                <motion.path
                                    custom={{ delay: 3.5 * 0.13 }}
                                    variants={fadeIn}
                                    fill="#2B3A4A"
                                    d="M0 -6 L12 0 L0 6 Z"
                                    transform="translate(850.2 621.8) rotate(108.0)"
                                />
                                <motion.path
                                    custom={{ delay: 4.5 * 0.13 }}
                                    variants={fadeIn}
                                    fill="#2B3A4A"
                                    d="M0 -6 L12 0 L0 6 Z"
                                    transform="translate(660.0 760.0) rotate(180.0)"
                                />
                                <motion.path
                                    custom={{ delay: 5.5 * 0.13 }}
                                    variants={fadeIn}
                                    fill="#2B3A4A"
                                    d="M0 -6 L12 0 L0 6 Z"
                                    transform="translate(469.8 621.8) rotate(252.0)"
                                />
                                <motion.path
                                    custom={{ delay: 6.5 * 0.13 }}
                                    variants={fadeIn}
                                    fill="#BE6247"
                                    d="M0 -6 L12 0 L0 6 Z"
                                    transform="translate(542.4 398.2) rotate(324.0)"
                                />
                            </g>

                            <motion.g
                                custom={{ opacity: 0.26 }}
                                variants={fadeIn}
                                stroke="#2B3A4A"
                                strokeWidth="1"
                            >
                                {TICKS.map((d) => (
                                    <path key={d} d={d} />
                                ))}
                            </motion.g>

                            <motion.g variants={fadeIn} stroke="#BE6247" fill="none" strokeWidth="1">
                                <path d="M660 560 L850.2 498.2" />
                                <path d="M654 554 L666 566 M654 566 L666 554" />
                                <path d="M846 484 L854 512" />
                            </motion.g>
                            <motion.text
                                variants={fadeIn}
                                className="fill-ctr-terracotta-ink font-ctr-mono text-[17px] tracking-[0.08em]"
                                x="742"
                                y="512"
                            >
                                r·200
                            </motion.text>

                            <motion.g custom={{ delay: 0 * 0.13 }} variants={fadeIn}>
                                <circle cx="150" cy="150" r="30" fill="#F2ECDF" stroke="#2B3A4A" strokeWidth="1.5" />
                                <circle cx="150" cy="150" r="7.5" fill="#2B3A4A" />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" x="192" y="130">
                                    01
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" style={{ textAnchor: 'middle' }} x="150" y="224">
                                    User prompt
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" style={{ textAnchor: 'middle' }} x="150" y="252">
                                    one sentence
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 1 * 0.13 }} variants={fadeIn}>
                                <circle cx="360" cy="150" r="30" fill="#F2ECDF" stroke="#2B3A4A" strokeWidth="1.5" />
                                <path d="M347 150 H373 M360 137 V163" stroke="#2B3A4A" strokeWidth="1.3" strokeLinecap="round" />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" x="402" y="130">
                                    02
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" style={{ textAnchor: 'middle' }} x="360" y="224">
                                    Context
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" style={{ textAnchor: 'middle' }} x="360" y="252">
                                    audience · purpose
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 2 * 0.13 }} variants={fadeIn}>
                                <circle cx="660.0" cy="360.0" r="38" fill="#F2ECDF" stroke="#BE6247" strokeWidth="1.8" />
                                <circle cx="660.0" cy="360.0" r="29" fill="none" stroke="#2B3A4A" strokeWidth="1.2" />
                                <path d="M647.0 373.0 L673.0 347.0" stroke="#2B3A4A" strokeWidth="1.2" strokeLinecap="round" />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" style={{ textAnchor: 'middle' }} x="660.0" y="252">
                                    03
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" style={{ textAnchor: 'middle' }} x="660.0" y="288">
                                    Art direction
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" style={{ textAnchor: 'middle' }} x="660.0" y="316">
                                    palette · material · voice
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 3 * 0.13 }} variants={fadeIn}>
                                <rect x="821.2" y="469.2" width="58" height="58" fill="#F2ECDF" stroke="#2B3A4A" strokeWidth="1.5" />
                                <path d="M821.2 487.2 H879.2 M841.2 487.2 V527.2" stroke="#2B3A4A" strokeWidth="1.15" />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" x="900" y="472">
                                    04
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" x="900" y="508">
                                    Layout + type + image
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" x="900" y="536">
                                    grid · measure · hierarchy
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 4 * 0.13 }} variants={fadeIn}>
                                <circle cx="777.6" cy="721.8" r="30" fill="#2B3A4A" stroke="#2B3A4A" strokeWidth="1.5" />
                                <path
                                    d="M764.6 721.8 H790.6 M783.6 714.8 L790.6 721.8 L783.6 728.8"
                                    stroke="#F2ECDF"
                                    strokeWidth="1.4"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" x="828" y="742">
                                    05
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" x="828" y="778">
                                    Render
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" x="828" y="806">
                                    real markup, a real page
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 5 * 0.13 }} variants={fadeIn}>
                                <circle cx="542.4" cy="721.8" r="38" fill="#F2ECDF" stroke="#BE6247" strokeWidth="1.8" />
                                <circle cx="542.4" cy="721.8" r="29" fill="none" stroke="#2B3A4A" strokeWidth="1.2" />
                                <path
                                    d="M523.4 721.8 q19 -16 38 0 q-19 16 -38 0Z"
                                    fill="none"
                                    stroke="#2B3A4A"
                                    strokeWidth="1.2"
                                />
                                <circle cx="542.4" cy="721.8" r="5" fill="#2B3A4A" />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" style={{ textAnchor: 'end' }} x="492" y="742">
                                    06
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" style={{ textAnchor: 'end' }} x="492" y="778">
                                    Visual review
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" style={{ textAnchor: 'end' }} x="492" y="806">
                                    it looks at what it made
                                </text>
                            </motion.g>

                            <motion.g custom={{ delay: 6 * 0.13 }} variants={fadeIn}>
                                <circle cx="469.8" cy="498.2" r="30" fill="#F2ECDF" stroke="#2B3A4A" strokeWidth="1.5" />
                                <circle
                                    cx="469.8"
                                    cy="498.2"
                                    r="11"
                                    fill="none"
                                    stroke="#2B3A4A"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    pathLength={100}
                                    strokeDasharray="78 22"
                                />
                                <path
                                    d="M0 -6 L12 0 L0 6 Z"
                                    fill="#2B3A4A"
                                    transform="translate(471.9 487.4) rotate(11)"
                                />
                                <text className="fill-ctr-terracotta-ink font-ctr-mono text-[23px] tracking-[0.08em]" style={{ textAnchor: 'end' }} x="420" y="472">
                                    07
                                </text>
                                <text className="fill-ctr-ink font-ctr-serif text-[32px]" style={{ textAnchor: 'end' }} x="420" y="508">
                                    Iteration
                                </text>
                                <text className="fill-ctr-ink-soft font-ctr-mono text-[18px] tracking-[0.06em]" style={{ textAnchor: 'end' }} x="420" y="536">
                                    better, not merely different
                                </text>
                            </motion.g>
                        </motion.svg>
                        <figcaption className="mx-auto mt-[1.6rem] max-w-[62ch] text-center font-ctr-mono text-ctr-micro leading-[1.9] tracking-[0.04em] text-ctr-ink-soft">
                            Fig. 1 — the loop, plotted on the studio’s own coordinate frame. Two
                            stages read the problem; five turn on the ring until the page is right.
                            Stages 03 and 06 carry the turn.
                        </figcaption>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default DesignProcess;
