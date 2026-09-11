'use client';

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
    type CSSProperties,
    type FormEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ChevronDown, Paperclip, Plus, X } from 'lucide-react';
import { Plate, PlateNib } from './design-icons';
import { Reveal } from './design-reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.32, 0.72, 0, 1] as const;

/** Stand-in for the project a real generate would create; the studio itself
 *  reads its project from this route param (`app/design/[projectId]`). */
const MOCK_PROJECT_ID = 'mock-id';

const WASHES = [
    { value: 'ivory & ink', label: 'Ivory & ink', a: '#F2ECDF', b: '#2B3A4A' },
    { value: 'sage field', label: 'Sage field', a: '#B9C4A4', b: '#4E5F49' },
    { value: 'dusk terracotta', label: 'Dusk terracotta', a: '#E3B79E', b: '#A6503A' },
    { value: 'polder blue', label: 'Polder blue', a: '#B7C7D2', b: '#3F566A' },
];

/** The technical stack the draft would ship on — Wash sets the mood, the
 *  design system sets the materials, per Tenet 02 and Tenet 04 on the "why"
 *  scene. */
const SYSTEMS = [
    { value: 'shadcn', label: 'Shadcn/ui', note: 'radix primitives · tailwind' },
    { value: 'radix-tailwind', label: 'Radix + Tailwind', note: 'unstyled primitives · utility css' },
    { value: 'chakra', label: 'Chakra UI', note: 'themeable component kit' },
    { value: 'plain', label: 'Plain HTML/CSS', note: 'no framework, hand-rolled' },
];

const EXAMPLES = [
    {
        prompt: 'A landing page for a small-batch coffee roaster in Utrecht. Warm, printed, almost no photography: the packaging is the whole story.',
        label: 'A landing page for a small-batch coffee roaster in Utrecht…',
    },
    {
        prompt: 'A reading app for old letters and diaries. Archive feeling, generous margins, one column, footnotes that live in the gutter.',
        label: 'A reading app for old letters and diaries…',
    },
    {
        prompt: 'A studio portfolio where the work is enormous and the interface almost disappears. Four projects, one contact line, nothing else.',
        label: 'A studio portfolio where the work is enormous…',
    },
];

/** The generation pass, staged. `null` tail means "say the wash instead". */
const STAGES: [string, string | null][] = [
    ['reading context', 'audience · purpose · tone · constraint'],
    ['choosing art direction', null],
    ['setting the measure', 'grid · scale · hierarchy'],
    ['drawing the page', 'layout, type and plate'],
    ['reviewing what it made', 'looking, then adjusting'],
];

/** The generated draft's ink strokes — path data lifted straight from v1. */
const DRAFT_INK_PATHS = [
    { w: '1.7', d: 'M21 19 C 160 22, 340 16, 499 20' },
    { w: '1.4', d: 'M20 21 C 23 100, 17 200, 21 279' },
    { w: '1.4', d: 'M500 19 C 497 100, 503 200, 499 280' },
    { w: '1.7', d: 'M21 280 C 160 283, 340 277, 500 281' },
    { w: '1.1', d: 'M22 56 C 150 59, 330 53, 498 57' },
    { w: '2.4', d: 'M44 95 C 110 98, 190 92, 251 96' },
    { w: '1.3', d: 'M44 122 C 100 125, 160 119, 206 123' },
    { w: '1.1', d: 'M44 148 C 110 151, 180 145, 236 149' },
    {
        w: '1.6',
        d: 'M303 95 C 360 92, 430 97, 474 93 C 477 130, 472 174, 475 206 C 418 209, 348 204, 302 207 C 305 169, 300 131, 303 95 Z',
    },
    { w: '1.1', d: 'M44 196 C 90 199, 120 193, 151 197' },
    { w: '1.1', d: 'M44 222 C 100 225, 160 219, 197 223' },
    { w: '1.3', d: 'M21 250 C 160 253, 340 247, 500 251' },
    { w: '.95', d: 'M44 266 C 70 269, 100 263, 121 267' },
    { w: '.95', d: 'M400 266 C 430 269, 455 263, 477 267' },
];

/** v1's `:nth-child` stagger buckets, translated to a 0-based index. */
function inkDelay(index: number) {
    const n = index + 1;
    if (n >= 12) return 0.8;
    if (n >= 8) return 0.55;
    if (n >= 5) return 0.3;
    if (n >= 2) return 0.12;
    return 0;
}

/** The draft's ink strokes drawing themselves on — `pathLength` replaces a
 *  hand-rolled `getTotalLength()` + `stroke-dasharray` dance. */
const inkDraw: Variants = {
    hidden: { pathLength: 0 },
    shown: (i: number) => ({
        pathLength: 1,
        transition: { duration: 1.5, delay: inkDelay(i), ease: EASE_SOFT },
    }),
};
const washFade: Variants = {
    hidden: { opacity: 0 },
    shown: { opacity: 0.34, transition: { duration: 1.1, delay: 0.9, ease: EASE } },
};
/** The one accent stroke draws last, regardless of its position in the group. */
const inkDrawAccent: Variants = {
    hidden: { pathLength: 0 },
    shown: { pathLength: 1, transition: { duration: 1.5, delay: 1.1, ease: EASE_SOFT } },
};

/** The registration marks drawn at each corner of the sheet. */
function SheetMark({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
    const pos = {
        tl: 'left-[10px] top-[10px]',
        tr: 'right-[10px] top-[10px]',
        bl: 'left-[10px] bottom-[10px]',
        br: 'right-[10px] bottom-[10px]',
    }[position];
    return (
        <span className={`pointer-events-none absolute h-[18px] w-[18px] ${pos}`} aria-hidden="true">
            <span className="absolute top-[8px] left-0 h-px w-[18px] bg-ctr-ink-faint" />
            <span className="absolute top-0 left-[8px] h-[18px] w-px bg-ctr-ink-faint" />
        </span>
    );
}

type Log = { head: string; tail: string };

/** Scene 02 — the canvas. The sheet you write on, and the margin of the desk. */
export function DesignCanvas() {
    const router = useRouter();
    const quiet = useReducedMotion();
    const fieldRef = useRef<HTMLTextAreaElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const systemPickerRef = useRef<HTMLDivElement>(null);

    const [prompt, setPrompt] = useState('');
    const [wash, setWash] = useState(WASHES[0].value);
    const [system, setSystem] = useState(SYSTEMS[0].value);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [systemPickerOpen, setSystemPickerOpen] = useState(false);
    const [working, setWorking] = useState(false);
    const [drawn, setDrawn] = useState(false);
    const [log, setLog] = useState<Log | null>(null);
    /* bumping this remounts the draft svg so its ink redraws on a second run */
    const [run, setRun] = useState(0);

    const currentSystem = SYSTEMS.find((option) => option.value === system) ?? SYSTEMS[0];

    /* Closes the design-system card the way the reference does: a click
       anywhere outside the trigger + panel dismisses it. */
    useEffect(() => {
        if (!systemPickerOpen) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!systemPickerRef.current?.contains(event.target as Node)) {
                setSystemPickerOpen(false);
            }
        };
        window.addEventListener('pointerdown', onPointerDown);
        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [systemPickerOpen]);

    const onAttachClick = () => fileInputRef.current?.click();
    const onAttachChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttachment(event.target.files?.[0] ?? null);
    };
    const clearAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const grow = useCallback(() => {
        const field = fieldRef.current;
        if (!field) return;
        field.style.height = 'auto';
        field.style.height = Math.max(field.scrollHeight, 0) + 'px';
    }, []);

    useLayoutEffect(grow, [prompt, grow]);

    useEffect(() => {
        window.addEventListener('resize', grow);
        return () => window.removeEventListener('resize', grow);
    }, [grow]);

    useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

    const takeExample = (text: string) => {
        const field = fieldRef.current;
        setPrompt(text);
        setWorking(false);
        setDrawn(false);
        setLog(null);
        if (timer.current) clearTimeout(timer.current);
        if (field) {
            field.focus();
            requestAnimationFrame(() => field.setSelectionRange(text.length, text.length));
        }
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (working) return;

        const text = prompt.trim();
        if (!text) {
            setLog({ head: 'write a line first', tail: 'or take one from the margin' });
            fieldRef.current?.focus();
            return;
        }

        const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pace = quiet ? 260 : 620;

        setWorking(true);
        setDrawn(false);
        setRun((n) => n + 1);

        const systemLabel = SYSTEMS.find((option) => option.value === system)?.label ?? system;

        let step = 0;
        const next = () => {
            if (step >= STAGES.length) {
                /* `working` stays true on purpose: the plate is spoken for
                   from the first click until the studio route replaces this
                   page, so a slow route load can't take a second generate. */
                setDrawn(true);
                setLog({
                    head: 'draft 01',
                    tail: `${wash} · ${systemLabel} · opening the studio…`,
                });
                /* This page's generate is a preview of the real one: the
                   staged log above is illustrative, then it hands off to
                   the actual studio route. */
                timer.current = setTimeout(() => {
                    router.push(`/design/${MOCK_PROJECT_ID}`);
                }, pace);
                return;
            }
            const [head, tail] = STAGES[step];
            setLog({ head, tail: tail ?? wash });
            step++;
            timer.current = setTimeout(next, pace);
        };
        next();
    };

    const draftOpen = working || drawn;

    return (
        <section
            id="canvas"
            aria-labelledby="canvas-title"
            data-scene="02"
            data-ctr-tone="dark"
            className="relative bg-ctr-desk px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(6rem,11vh,10rem)] pb-[clamp(5rem,9vh,8rem)] text-ctr-on-dark [--ctr-ink-hair:rgba(237,229,211,0.18)]"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-[clamp(1.5rem,5vw,6rem)] top-0 h-px bg-[rgba(237,229,211,0.22)]"
            />
            <div className="mx-auto grid max-w-[1500px] gap-[clamp(3rem,7vh,6rem)]">
                <header className="grid grid-cols-1 gap-x-[clamp(2rem,5vw,5rem)] gap-y-[1.2rem] min-[900px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[900px]:items-start">
                    <div className="flex justify-center min-[900px]:justify-start">
                        <Reveal
                            as="h2"
                            id="canvas-title"
                            className="font-ctr-serif text-ctr-h2 leading-[1.04] font-normal tracking-[-0.018em] text-ctr-on-dark"
                        >
                            Describe what you want.
                            <br />
                            <em className="font-normal italic text-[#EFC0A0]">Catronaut draws it.</em>
                        </Reveal>
                    </div>
                    <div className="flex justify-center min-[900px]:justify-start">
                        <Reveal
                            as="p"
                            delay={1}
                            className="max-w-[44ch] font-ctr-serif text-ctr-lede text-ctr-on-dark-soft"
                        >
                            There is no brief document and no component picker. A sheet, a line of
                            your own language, and a wash to work in. This is what it is like to
                            draw with words.
                        </Reveal>
                    </div>
                </header>

                <div className="grid grid-cols-1 items-start gap-[clamp(2rem,4vw,3.5rem)] min-[1000px]:grid-cols-[minmax(0,1.62fr)_minmax(0,0.85fr)] min-[1000px]:gap-[clamp(3rem,5vw,5rem)]">
                    <Reveal
                        as="form"
                        delay={2}
                        id="sheet"
                        data-ctr-tone="light"
                        data-ctr-head
                        noValidate
                        onSubmit={onSubmit}
                        className="relative bg-ctr-paper-lift p-[clamp(2rem,4vw,3.6rem)] text-ctr-ink shadow-[0_2px_1px_rgba(0,0,0,0.14),0_40px_70px_-40px_rgba(0,0,0,0.6)]"
                    >
                        <SheetMark position="tl" />
                        <SheetMark position="tr" />
                        <SheetMark position="bl" />
                        <SheetMark position="br" />

                        <p
                            aria-hidden="true"
                            className="flex gap-[1.6em] border-b border-ctr-ink-hair pb-[0.9em] font-ctr-mono text-ctr-micro tracking-[0.16em] text-ctr-ink-soft uppercase"
                        >
                            <span>sheet 01</span>
                            <span>prompt</span>
                            <span className="ml-auto">ivory 180gsm</span>
                        </p>

                        <div
                            className="group/field relative mt-[clamp(1.6rem,3vw,2.4rem)]"
                            style={{ '--ctr-lh': 'clamp(2rem,3.4vw,2.75rem)' } as CSSProperties}
                        >
                            <label
                                htmlFor="prompt"
                                className="mb-[0.9em] block font-ctr-mono text-ctr-micro tracking-[0.16em] text-ctr-terracotta-ink uppercase"
                            >
                                Write the thing you want to exist
                            </label>
                            <textarea
                                id="prompt"
                                name="prompt"
                                rows={3}
                                spellCheck={false}
                                ref={fieldRef}
                                value={prompt}
                                onChange={(event) => setPrompt(event.target.value)}
                                placeholder="A quiet portfolio for a landscape photographer. Long horizontal images, almost no interface, one essay."
                                className="block min-h-[calc(var(--ctr-lh)*3)] w-full resize-none overflow-hidden border-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_calc(var(--ctr-lh)_-_1px),var(--color-ctr-ink-hair)_calc(var(--ctr-lh)_-_1px)_var(--ctr-lh))] p-0 font-ctr-serif text-[clamp(1.22rem,1.85vw,1.62rem)] leading-[var(--ctr-lh)] tracking-[-0.004em] text-ctr-ink caret-ctr-terracotta placeholder:text-[rgba(43,58,74,0.75)] focus:outline-none"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-0 -bottom-[1.6em] flex items-center gap-[0.6em] font-ctr-mono text-ctr-micro tracking-[0.18em] text-ctr-terracotta-ink uppercase opacity-0 transition-opacity duration-[400ms] [transition-timing-function:var(--ease-ctr)] group-focus-within/field:opacity-100"
                            >
                                <span>drawing</span>
                                <span className="h-[1.05em] w-[8px] animate-ctr-blink bg-ctr-terracotta-ink" />
                            </span>
                        </div>

                        {/* Sheet toolbar — attach a reference, pick the design
                            system the draft ships on. Neither does anything
                            beyond the sheet itself: no upload, no persistence. */}
                        <div className="mt-[clamp(1.3rem,2.2vw,1.7rem)] flex flex-wrap items-center gap-[0.6em]">
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={onAttachChange}
                                className="hidden"
                                tabIndex={-1}
                                aria-hidden="true"
                            />
                            <button
                                type="button"
                                onClick={onAttachClick}
                                aria-label="Attach a reference file"
                                className="flex size-[2.2em] items-center justify-center rounded-[1px] border border-ctr-ink-faint text-ctr-ink-soft transition-[transform,border-color,color] duration-[400ms] [transition-timing-function:var(--ease-ctr)] hover:-translate-y-[1px] hover:border-ctr-ink hover:text-ctr-ink"
                            >
                                <Plus className="size-4" aria-hidden="true" />
                            </button>

                            {attachment && (
                                <span className="inline-flex items-center gap-[0.5em] border border-ctr-ink-faint bg-ctr-paper px-[0.8em] py-[0.4em] font-ctr-mono text-ctr-micro text-ctr-ink-soft">
                                    <Paperclip className="size-3" aria-hidden="true" />
                                    <span className="max-w-[16ch] truncate">{attachment.name}</span>
                                    <button
                                        type="button"
                                        onClick={clearAttachment}
                                        aria-label="Remove attachment"
                                        className="text-ctr-ink-faint transition-colors hover:text-ctr-terracotta-ink"
                                    >
                                        <X className="size-3" aria-hidden="true" />
                                    </button>
                                </span>
                            )}

                            <div className="relative" ref={systemPickerRef}>
                                <button
                                    type="button"
                                    onClick={() => setSystemPickerOpen((open) => !open)}
                                    aria-expanded={systemPickerOpen}
                                    className="flex items-center gap-[0.65em] border border-ctr-ink-faint px-[0.9em] py-[0.42em] transition-[transform,border-color] duration-[400ms] [transition-timing-function:var(--ease-ctr)] hover:-translate-y-[1px] hover:border-ctr-ink"
                                >
                                    <span className="font-ctr-mono text-ctr-micro tracking-[0.1em] text-ctr-ink-faint uppercase">
                                        System
                                    </span>
                                    <span className="font-ctr-serif text-[0.88rem] text-ctr-ink italic">
                                        {currentSystem.label}
                                    </span>
                                    <ChevronDown
                                        aria-hidden="true"
                                        className={[
                                            'size-3.5 text-ctr-ink-soft transition-transform duration-300',
                                            systemPickerOpen ? 'rotate-180' : '',
                                        ].join(' ')}
                                    />
                                </button>

                                {systemPickerOpen && (
                                    <div
                                        role="listbox"
                                        aria-label="Design system"
                                        className="absolute top-[calc(100%+0.6em)] left-0 z-20 grid w-[min(88vw,360px)] grid-cols-2 gap-[0.5em] border border-ctr-ink-faint bg-ctr-paper-lift p-[0.7em] shadow-[0_28px_54px_-30px_rgba(43,58,74,0.55)]"
                                    >
                                        {SYSTEMS.map((option) => (
                                            <button
                                                type="button"
                                                key={option.value}
                                                role="option"
                                                aria-selected={option.value === system}
                                                onClick={() => {
                                                    setSystem(option.value);
                                                    setSystemPickerOpen(false);
                                                }}
                                                className={[
                                                    'flex flex-col gap-[0.35em] border px-[0.75em] py-[0.65em] text-left transition-colors duration-[300ms]',
                                                    option.value === system
                                                        ? 'border-ctr-terracotta bg-[rgba(190,98,71,0.08)]'
                                                        : 'border-ctr-ink-hair hover:border-ctr-ink-faint',
                                                ].join(' ')}
                                            >
                                                <span className="font-ctr-serif text-[0.92rem] text-ctr-ink italic">
                                                    {option.label}
                                                </span>
                                                <span className="font-ctr-mono text-[0.62rem] tracking-[0.06em] text-ctr-ink-soft uppercase">
                                                    {option.note}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-[clamp(2.4rem,4vw,3.2rem)] flex flex-wrap items-end gap-x-[2.4rem] gap-y-[1.6rem] border-t border-ctr-ink-hair pt-[clamp(1.4rem,2.4vw,2rem)]">
                            <fieldset className="block min-[720px]:flex min-[720px]:items-baseline min-[720px]:gap-[1.1rem]">
                                <legend className="mb-[0.85em] font-ctr-mono text-ctr-micro tracking-[0.16em] text-ctr-ink-soft uppercase min-[720px]:mb-0">
                                    Wash
                                </legend>
                                <div className="flex flex-wrap items-center gap-x-[1.1rem] gap-y-[0.55rem]">
                                    {WASHES.map((option) => (
                                        <label
                                            className="group inline-flex cursor-pointer items-center gap-[0.5em]"
                                            key={option.value}
                                        >
                                            <input
                                                type="radio"
                                                name="wash"
                                                value={option.value}
                                                checked={wash === option.value}
                                                onChange={() => setWash(option.value)}
                                                className="absolute h-px w-px opacity-0"
                                            />
                                            <span
                                                className="h-[20px] w-[30px] border border-ctr-ink-faint transition-transform duration-[400ms] [transition-timing-function:var(--ease-ctr)] group-hover:-translate-y-[2px] has-checked:shadow-[0_0_0_1px_#F8F3E8,0_0_0_2px_#BE6247] has-focus-visible:outline has-focus-visible:outline-2 has-focus-visible:outline-offset-[3px] has-focus-visible:outline-ctr-terracotta"
                                                style={{
                                                    background: `linear-gradient(105deg, ${option.a} 0 52%, ${option.b} 52% 100%)`,
                                                }}
                                            />
                                            <span className="font-ctr-sans text-[0.76rem] tracking-[0.04em] text-ctr-ink-soft transition-colors duration-[400ms] [transition-timing-function:var(--ease-ctr)] group-has-checked:text-ctr-ink">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <Plate
                                as="button"
                                type="submit"
                                variant="ink"
                                disabled={working}
                                aria-busy={working}
                                className="ml-auto"
                            >
                                {drawn ? 'Opening…' : working ? 'Drawing…' : 'Generate'}
                                <PlateNib />
                            </Plate>
                        </div>

                        <output
                            htmlFor="prompt"
                            aria-live="polite"
                            className="mt-[1.4rem] block min-h-[1.4em] font-ctr-mono text-ctr-micro tracking-[0.12em] text-ctr-ink-soft uppercase"
                        >
                            {log && (
                                <>
                                    <b className="font-normal text-ctr-terracotta-ink">{log.head}</b> — {log.tail}
                                </>
                            )}
                        </output>
                    </Reveal>

                    <Reveal as="aside" delay={3} className="grid pt-[0.5rem] min-[1000px]:pt-[2.6rem]">
                        {/* The margin holds the sample lines until a generate
                            starts; then the draft is laid over them, beside the
                            sheet where the eye already is. Both share one grid
                            cell so the column never jumps. */}
                        <div
                            inert={draftOpen}
                            className={[
                                '[grid-area:1/1] transition-[opacity,filter] duration-700 [transition-timing-function:var(--ease-ctr)]',
                                draftOpen ? 'opacity-0 blur-[3px]' : 'opacity-100 blur-0',
                            ].join(' ')}
                        >
                            <p className="mb-[1.2em] font-ctr-mono text-ctr-micro tracking-[0.2em] text-ctr-on-dark-soft uppercase">
                                Try a line —
                            </p>
                            <ul className="grid gap-[0.1rem]">
                                {EXAMPLES.map((example, i) => (
                                    <li key={example.label}>
                                        <button
                                            type="button"
                                            onClick={() => takeExample(example.prompt)}
                                            className={[
                                                'block w-full border-t border-[rgba(237,229,211,0.2)] py-[0.95em] pb-[1em] text-left font-ctr-serif text-[1.02rem] leading-[1.4] text-ctr-on-dark-soft italic transition-[color,transform] duration-[450ms] [transition-timing-function:var(--ease-ctr)] hover:translate-x-[0.7em] hover:text-[#EFC0A0]',
                                                i === EXAMPLES.length - 1 ? 'border-b' : '',
                                            ].join(' ')}
                                        >
                                            {example.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-[2.2rem] grid max-w-[34ch] gap-[0.9rem] font-ctr-serif text-[1rem] leading-[1.5] text-ctr-on-dark-soft italic">
                                <svg
                                    className="h-[46px] w-[60px] opacity-60"
                                    viewBox="0 0 60 46"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path
                                        d="M2 40 C 14 14, 34 4, 57 8"
                                        fill="none"
                                        stroke="#C8CDBA"
                                        strokeWidth="1.4"
                                    />
                                    <path
                                        d="M57 8 L45 4 M57 8 L50 18"
                                        fill="none"
                                        stroke="#C8CDBA"
                                        strokeWidth="1.4"
                                    />
                                </svg>
                                <span>
                                    The wash sets the art direction. Change it and the same sentence
                                    comes back a different painting.
                                </span>
                            </p>
                        </div>

                        {/* The draft: a second, smaller sheet dropped onto the
                            desk at a slight angle. Decorative — the log under
                            the plate is what screen readers hear. */}
                        <motion.div
                            aria-hidden="true"
                            initial={false}
                            animate={
                                draftOpen
                                    ? { opacity: 1, y: 0, rotate: quiet ? 0 : -1.2, filter: 'blur(0px)' }
                                    : {
                                          opacity: 0,
                                          y: quiet ? 0 : 28,
                                          rotate: quiet ? 0 : -3.5,
                                          filter: quiet ? 'blur(0px)' : 'blur(6px)',
                                      }
                            }
                            transition={{ duration: quiet ? 0.3 : 0.9, ease: EASE }}
                            className="pointer-events-none relative self-start bg-ctr-paper-lift p-[clamp(2rem,2.6vw,2.4rem)] text-ctr-ink shadow-[0_2px_1px_rgba(0,0,0,0.14),0_40px_70px_-40px_rgba(0,0,0,0.6)] [grid-area:1/1]"
                        >
                            <SheetMark position="tl" />
                            <SheetMark position="tr" />
                            <SheetMark position="bl" />
                            <SheetMark position="br" />

                            <p className="flex gap-[1.6em] border-b border-ctr-ink-hair pb-[0.9em] font-ctr-mono text-ctr-micro tracking-[0.16em] text-ctr-ink-soft uppercase">
                                <span>draft 01</span>
                                <span className="ml-auto">{wash}</span>
                            </p>

                            <motion.svg
                                key={run}
                                className="mt-[clamp(1rem,1.8vw,1.4rem)] block h-auto w-full"
                                viewBox="0 0 520 300"
                                preserveAspectRatio="xMidYMid meet"
                                initial="hidden"
                                animate={draftOpen ? 'shown' : 'hidden'}
                            >
                                <defs>
                                    <filter id="draftwash" x="-12%" y="-12%" width="124%" height="124%">
                                        <feTurbulence
                                            type="fractalNoise"
                                            baseFrequency="0.02"
                                            numOctaves="3"
                                            seed="4"
                                            result="t"
                                        />
                                        <feDisplacementMap
                                            in="SourceGraphic"
                                            in2="t"
                                            scale="11"
                                            xChannelSelector="R"
                                            yChannelSelector="G"
                                        />
                                        <feGaussianBlur stdDeviation="1.6" />
                                    </filter>
                                </defs>
                                <motion.path
                                    variants={washFade}
                                    filter="url(#draftwash)"
                                    fill="#8B9C86"
                                    d="M303 95 C 360 92, 430 97, 474 93 C 477 130, 472 174, 475 206 C 418 209, 348 204, 302 207 C 305 169, 300 131, 303 95 Z"
                                />
                                <g fill="none" stroke="#2B3A4A" strokeLinecap="round">
                                    {DRAFT_INK_PATHS.map((p, i) => (
                                        <motion.path key={i} custom={i} variants={inkDraw} strokeWidth={p.w} d={p.d} />
                                    ))}
                                </g>
                                <g fill="none" stroke="#BE6247" strokeWidth="2.2" strokeLinecap="round">
                                    <motion.path
                                        variants={inkDrawAccent}
                                        d="M44 176 C 78 179, 108 173, 133 177"
                                    />
                                </g>
                            </motion.svg>
                        </motion.div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default DesignCanvas;
