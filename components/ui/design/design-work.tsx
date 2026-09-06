import { Plate, PlateNib } from './design-icons';
import { Reveal, RevealLines } from './design-reveal';
import { Parallax } from './design-parallax';

const PIECES = [
    {
        no: '01',
        name: 'Editorial portfolio',
        body: 'One long column, images that break the measure, and a running footnote rail. Built for a writer who wanted the page to feel printed.',
        spec: 'sample output · ivory & ink · 1 template, 4 states',
        plate: (
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="300" fill="#EDE5D5" />
                <g fill="none" stroke="#2B3A4A" strokeWidth="1.2">
                    <path d="M32 40 H368" />
                    <path d="M32 268 H368" />
                </g>
                <text
                    className="font-ctr-serif text-[62px] tracking-[-0.02em] italic"
                    fill="#2B3A4A"
                    x="32"
                    y="112"
                >
                    Werk
                </text>
                <rect x="32" y="140" width="196" height="106" fill="#8B9C86" opacity=".55" />
                <g fill="none" stroke="#2B3A4A" strokeWidth="1" opacity=".7">
                    <path d="M248 148 H368 M248 166 H340 M248 184 H368 M248 202 H312" />
                    <path d="M248 230 H288" />
                </g>
                <rect x="248" y="126" width="34" height="6" fill="#BE6247" />
            </svg>
        ),
    },
    {
        no: '02',
        name: 'AI research studio',
        body: 'Dense two-column reading with figures that hold their own column. Papers, plots and people, without a single dashboard tile.',
        spec: 'sample output · polder blue · 6 pages, 2 breakpoints',
        plate: (
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="300" fill="#E7E9E4" />
                <g fill="none" stroke="#2B3A4A" strokeWidth="1" opacity=".8">
                    <path d="M28 36 H188 M28 54 H160 M28 72 H188 M28 90 H140 M28 108 H188 M28 126 H172" />
                    <path d="M28 158 H188 M28 176 H150 M28 194 H188" />
                    <path d="M212 36 H372 V178 H212 Z" />
                    <path d="M212 96 H372" />
                    <path d="M242 96 C 260 44, 300 148, 342 62" stroke="#BE6247" strokeWidth="1.6" />
                    <circle cx="242" cy="96" r="2.6" fill="#BE6247" stroke="none" />
                    <circle cx="342" cy="62" r="2.6" fill="#BE6247" stroke="none" />
                    <path d="M212 208 H372 M212 226 H320 M212 244 H372" />
                    <path d="M28 226 H188 M28 244 H132" />
                </g>
                <path d="M28 270 H372" stroke="#2B3A4A" strokeWidth="1.4" />
            </svg>
        ),
    },
    {
        no: '03',
        name: 'Creative agency',
        body: 'A wordmark the size of the window, one full-bleed plate, and the rest of the site hiding politely underneath it.',
        spec: 'sample output · dusk terracotta · dark ground variant',
        plate: (
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="300" fill="#2B3A4A" />
                <rect x="0" y="176" width="400" height="124" fill="#BE6247" opacity=".85" />
                <text
                    className="font-ctr-serif text-[62px] tracking-[-0.02em] italic"
                    fill="#F2ECDF"
                    x="28"
                    y="132"
                >
                    Atelier
                </text>
                <g fill="none" stroke="#F2ECDF" strokeWidth="1" opacity=".8">
                    <path d="M28 208 H150 M28 226 H120" />
                    <path d="M256 208 H372 M256 226 H340 M256 244 H372" />
                    <path d="M28 260 H372" />
                </g>
                <circle cx="330" cy="86" r="42" fill="none" stroke="#F2ECDF" strokeWidth="1.2" />
                <circle cx="330" cy="86" r="22" fill="#F2ECDF" opacity=".18" />
            </svg>
        ),
    },
    {
        no: '04',
        name: 'Product landing page',
        body: 'The ordinary shape, done properly: a claim you can read from across the room, three honest measures, and one place to press.',
        spec: 'sample output · sage field · responsive, 3 states',
        plate: (
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="400" height="300" fill="#F0E8D8" />
                <rect x="0" y="0" width="400" height="126" fill="#C6CEB4" opacity=".7" />
                <g fill="none" stroke="#2B3A4A" strokeWidth="1.1">
                    <path d="M28 42 H210 M28 62 H172" />
                    <rect x="28" y="84" width="86" height="22" fill="#2B3A4A" />
                    <path d="M0 126 H400" />
                    <path d="M28 158 H130 V244 H28 Z" />
                    <path d="M150 158 H252 V244 H150 Z" />
                    <path d="M272 158 H374 V244 H272 Z" />
                    <path d="M28 176 H130 M150 176 H252 M272 176 H374" />
                    <path d="M28 272 H374" />
                </g>
                <rect x="292" y="192" width="42" height="6" fill="#BE6247" />
            </svg>
        ),
    },
];

/** Scene 05 — the archive, then the invitation back to the sheet. */
export function DesignWork() {
    return (
        <section
            id="work"
            aria-labelledby="work-title"
            data-scene="05"
            className="relative bg-ctr-paper-3 px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(6rem,11vh,10rem)] text-ctr-ink [--ctr-ink-soft:#45535F]"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-[clamp(1.5rem,5vw,6rem)] top-0 h-px bg-ctr-ink-hair"
            />
            <div className="mx-auto max-w-[1500px] pb-[clamp(5rem,10vh,9rem)]">
                <header className="mb-[clamp(3rem,6vw,5rem)] max-w-[40ch] min-[1000px]:ml-auto min-[1000px]:text-right">
                    <Reveal
                        as="h2"
                        id="work-title"
                        className="font-ctr-serif text-ctr-h2 leading-[1.02] font-normal tracking-[-0.02em]"
                    >
                        The archive
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={1}
                        className="mt-[1.2rem] max-w-[40ch] font-ctr-serif text-ctr-lede text-ctr-ink-soft min-[1000px]:ml-auto"
                    >
                        Four things Catronaut has been asked for. Illustrative pieces made for this
                        page, not client work.
                    </Reveal>
                </header>

                <ol className="grid gap-[clamp(3.5rem,7vw,6.5rem)]">
                    {PIECES.map((piece, i) => (
                        <Reveal
                            as="li"
                            key={piece.no}
                            className="grid grid-cols-1 items-center gap-[clamp(1.5rem,3vw,3rem)] border-t border-ctr-ink-faint pt-[clamp(2rem,4vw,3rem)] min-[720px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[720px]:gap-[clamp(2rem,4vw,4rem)] min-[1400px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
                        >
                            <figure
                                className={[
                                    'group aspect-[4/3] overflow-hidden border border-ctr-ink-faint shadow-[0_26px_54px_-40px_rgba(43,58,74,0.95)] transition-[transform,box-shadow] duration-[900ms] [transition-timing-function:var(--ease-ctr)] hover:-translate-y-[6px] hover:scale-[1.006] hover:shadow-[0_40px_70px_-46px_rgba(43,58,74,1)]',
                                    i % 2 === 1 ? 'min-[720px]:order-2' : '',
                                ].join(' ')}
                            >
                                {piece.plate}
                            </figure>
                            {/* The caption drifts and the plate holds still, so
                                the pair opens slightly as the spread goes by.
                                The plate keeps its own hover transform. */}
                            <Parallax distance={10}>
                                <div className="max-w-[46ch]">
                                    <span className="mb-[0.9em] block font-ctr-mono text-[0.86rem] tracking-[0.14em] text-ctr-terracotta-ink">
                                        {piece.no}
                                    </span>
                                    <h3 className="mb-[0.65em] font-ctr-serif text-ctr-h3 leading-[1.12] font-normal tracking-[-0.014em]">
                                        {piece.name}
                                    </h3>
                                    <p className="text-ctr-ink-soft">{piece.body}</p>
                                    <p className="mt-[1.3em] border-t border-ctr-ink-hair pt-[0.9em] font-ctr-mono text-ctr-micro tracking-[0.12em] text-ctr-ink-soft uppercase">
                                        {piece.spec}
                                    </p>
                                </div>
                            </Parallax>
                        </Reveal>
                    ))}
                </ol>
            </div>

            <div
                data-ctr-tone="dark"
                className="mx-[calc(clamp(1.5rem,5vw,6rem)*-1)] grid min-h-[max(96svh,640px)] place-items-center bg-ctr-ink px-[clamp(1.5rem,5vw,6rem)] py-[clamp(7rem,16vh,13rem)] text-center text-ctr-on-dark"
            >
                <div className="max-w-[min(94vw,920px)]">
                    <p
                        data-ctr-head
                        className="font-ctr-serif text-[clamp(2.05rem,6.2vw,5.4rem)] leading-[1.02] tracking-[-0.024em]"
                    >
                        <RevealLines
                            lines={[
                                'Bring an idea.',
                                <em className="font-normal text-[#E5A583] italic" key="l2">
                                    Leave with a world.
                                </em>,
                            ]}
                        />
                    </p>
                    <Reveal as="p" delay={1} className="mt-[clamp(2.6rem,5vw,4rem)]">
                        <Plate as="a" href="#canvas" variant="large">
                            Start designing
                            <PlateNib />
                        </Plate>
                    </Reveal>
                    <Reveal
                        as="p"
                        delay={2}
                        className="mt-[1.8rem] text-[1.08rem] text-[rgba(237,229,211,0.78)] italic"
                    >
                        No brief required. A sentence is enough to begin.
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default DesignWork;
