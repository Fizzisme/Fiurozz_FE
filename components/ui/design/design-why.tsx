import { Reveal } from './design-reveal';
import { Parallax } from './design-parallax';

const TENETS = [
    {
        no: '01',
        head: 'Ideas become interfaces',
        body: 'A sentence is already a structure: it has a subject, a hierarchy, a thing it cares about most. Catronaut reads that structure and gives it screens, regions, states and type, instead of asking you to describe a rectangle.',
        figure: (
            <g fill="none" stroke="#2B3A4A" strokeWidth="1.2">
                <path d="M4 16 H40 M4 28 H32 M4 40 H44 M4 52 H26" />
                <path d="M54 34 H74 M68 28 L74 34 L68 40" />
                <path d="M86 10 H116 V70 H86 Z" />
                <path d="M86 24 H116" />
                <path d="M93 36 H109 M93 46 H113 M93 56 H101" />
            </g>
        ),
    },
    {
        no: '02',
        head: 'Design with intention',
        body: 'Every page it makes has an argument about scale, rhythm and restraint. It sets a measure before it sets a paragraph, chooses a voice before it chooses a font, and can tell you which decision each part of the page is carrying.',
        figure: (
            <g fill="none" stroke="#2B3A4A" strokeWidth="1.2">
                <path d="M10 70 V10" />
                <path d="M10 10 H86" strokeWidth="3" />
                <path d="M10 28 H62" strokeWidth="2" />
                <path d="M10 42 H44" strokeWidth="1.4" />
                <path d="M10 54 H34" />
                <path d="M10 64 H26" />
                <path d="M100 10 V70 M96 10 H104 M96 70 H104" />
            </g>
        ),
    },
    {
        no: '03',
        head: 'Explore before committing',
        body: 'The first good answer is rarely the only one. Catronaut works up several art directions from the same brief (different palettes, different type, genuinely different pages) and lets you live with them before anything is decided.',
        figure: (
            <>
                <g fill="none" stroke="#2B3A4A" strokeWidth="1.2">
                    <path d="M6 14 H44 V62 H6 Z" />
                    <path d="M6 26 H44" />
                    <path d="M52 14 H90 V62 H52 Z" />
                    <path d="M52 26 H90" />
                    <path d="M98 14 H118 V62 H98 Z" opacity=".45" />
                </g>
                <rect x="53" y="27" width="36" height="34" fill="#BE6247" opacity=".38" />
                <rect x="7" y="27" width="36" height="34" fill="#8B9C86" opacity=".38" />
            </>
        ),
    },
    {
        no: '04',
        head: 'From concept to real web',
        body: 'What you leave with is not a picture of a website. It is markup, styles and behaviour: a page that loads, responds, and can be handed to a developer or grown further inside Catronaut tomorrow.',
        figure: (
            <g fill="none" stroke="#2B3A4A" strokeWidth="1.2">
                <path d="M6 12 H52 V68 H6 Z" />
                <path d="M6 24 H52" />
                <path d="M13 34 H45 M13 44 H38 M13 54 H45" />
                <path d="M62 40 H82 M76 34 L82 40 L76 46" />
                <path d="M92 20 L86 40 L92 60 M112 20 L118 40 L112 60" />
                <path d="M98 52 L108 28" />
            </g>
        ),
    },
];

/** Scene 03 — why Catronaut. Four notes pinned above the drawing table. */
export function DesignWhy() {
    return (
        <section
            id="why"
            aria-labelledby="why-title"
            data-scene="03"
            className="relative min-h-[max(130svh,900px)] bg-ctr-paper-2 px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(6rem,11vh,10rem)] pb-[clamp(5rem,9vh,8rem)] text-ctr-ink"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-[clamp(1.5rem,5vw,6rem)] top-0 h-px bg-ctr-ink-hair"
            />
            <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-[clamp(3rem,6vw,7rem)] min-[1000px]:grid-cols-[minmax(260px,0.62fr)_minmax(0,1.38fr)]">
                <div className="relative min-[1000px]:sticky min-[1000px]:top-[24vh] min-[1000px]:self-start">
                    <Reveal
                        as="h2"
                        id="why-title"
                        className="font-ctr-serif text-ctr-h2 leading-[1.02] font-normal tracking-[-0.02em]"
                    >
                        Four things
                        <br />
                        we hold to.
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={1}
                        className="mt-[1.2rem] max-w-[32ch] text-[1.05rem] leading-[1.6] text-ctr-ink-soft italic"
                    >
                        Notes pinned above the drawing table, in the order they matter.
                    </Reveal>
                    <span className="mt-[2rem] block h-px w-[64px] bg-ctr-terracotta" aria-hidden="true" />
                </div>

                <ol className="grid">
                    {TENETS.map((tenet, i) => (
                        <Reveal
                            as="li"
                            key={tenet.no}
                            className={[
                                'grid grid-cols-[3.4rem_minmax(0,1fr)] gap-x-[1.6rem] border-t border-ctr-ink-hair py-[clamp(2rem,3.6vw,3.2rem)] min-[720px]:grid-cols-[4.5rem_minmax(0,1fr)_140px]',
                                i === TENETS.length - 1 ? 'border-b' : '',
                            ].join(' ')}
                        >
                            <span className="pt-[0.45em] font-ctr-mono text-[0.86rem] tracking-[0.06em] text-ctr-terracotta-ink">
                                {tenet.no}
                            </span>
                            <div>
                                <h3 className="mb-[0.7em] font-ctr-serif text-ctr-h3 leading-[1.15] font-normal tracking-[-0.012em]">
                                    {tenet.head}
                                </h3>
                                <p className="max-w-[58ch] text-ctr-ink-soft">{tenet.body}</p>
                            </div>
                            <Parallax distance={10}>
                                <svg
                                    className="col-start-2 mt-[1.6rem] h-[80px] w-[120px] opacity-85 min-[720px]:col-start-3 min-[720px]:row-start-1 min-[720px]:mt-[0.4rem] min-[720px]:justify-self-end"
                                    viewBox="0 0 120 80"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    {tenet.figure}
                                </svg>
                            </Parallax>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default DesignWhy;
