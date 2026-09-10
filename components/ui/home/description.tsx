'use client';

import { motion, useReducedMotion, type Transition, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/animate-ui/components/buttons/button';
import HeroHeading from '@/components/ui/home/hero-heading';
import CatronautCoding from '@/components/ui/catronaut/coding';

type DescriptionProps = {
    isLeaving?: boolean;
};

/**
 * The sample project page is Fiurozz itself.
 *
 * Everything here is true and already public — the tagline and summary are the
 * site's own metadata, the stack is this repository's, and the handle is the
 * repository owner's. Nothing is invented, so the hero can show a real project
 * page without making a claim the product cannot back.
 */
const SAMPLE_PROJECT = {
    title: 'Fiurozz',
    descriptor: 'developer showcase',
    handle: '@fizzisme',
    tagline: 'Showcase your work, your way.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'GSAP'],
};

/** Chips past this many collapse into a `+N`, the way the reference gallery does. */
const VISIBLE_STACK = 3;

const leftVariants: Variants = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
    leaving: { x: '-120%', y: -40, rotate: -18, scale: 0.8, opacity: 0, filter: 'blur(6px)' },
};

const rightVariants: Variants = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
    leaving: { x: '120%', y: -40, rotate: 18, scale: 0.8, opacity: 0, filter: 'blur(6px)' },
};

const throwTransition: Transition = {
    duration: 0.7,
    ease: [0.55, 0, 1, 0.45],
};

/**
 * The project page assembles itself in reading order — cover, name, author,
 * stack, readme. It is the section's one authored moment, and it says the
 * thing the copy says: work you finished turning into a page people can read.
 *
 * Named `hidden` / `shown` rather than `initial` / `leaving` on purpose: the
 * wrapper above runs its own variants, and Framer propagates a parent's variant
 * name to any child that declares `variants`. Distinct names plus an explicit
 * `animate` here keep the two timelines from driving each other.
 */
const assembly: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const piece: Variants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    shown: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

/**
 * The left column enters as one staggered sequence rather than three hand-timed
 * delays, and it has to be a variant tree: the wrapper above animates to the
 * variant *label* `initial`, and Framer hands that label down to every motion
 * descendant, which strands any child that animates to a plain object instead.
 * An explicit `animate` here stops the inheritance at this node.
 */
const leftIntro: Variants = {
    rest: {},
    enter: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const introPiece: Variants = {
    rest: { opacity: 0, y: 20, filter: 'blur(6px)' },
    enter: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Description({ isLeaving = false }: DescriptionProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="no-scrollbar relative flex min-h-svh flex-col overflow-hidden bg-background pt-14 text-foreground md:pt-[82px]">
            {/* The horizon this scene sits on. Anchored low and left of the text
                column: it is ground, and copy never has to compete with it. */}
            <div className="pointer-events-none absolute -bottom-20 -left-24 z-0 select-none">
                <Image
                    alt=""
                    src="/home/planet.png"
                    height={460}
                    width={460}
                    priority
                    style={{ height: 'auto' }}
                    className="opacity-90 dark:opacity-100 dark:brightness-[0.35] dark:blur-sm"
                />
                <div
                    className="pointer-events-none absolute inset-0 hidden dark:block"
                    style={{
                        background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0) 30%, rgba(10,10,10,0.85) 100%)',
                    }}
                />
            </div>

            {/* `flex-1` claims the viewport left over once the fixed header has
                taken its band, so the grid centres against what the visitor can
                actually see rather than against the whole page. */}
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 items-center px-6 py-10 sm:px-10 lg:px-16">
                <div className="z-1 grid w-full items-center gap-14 md:grid-cols-[0.95fr_1.05fr] lg:gap-20">
                    {/* =====================================================
                        LEFT — THE PROMISE
                    ====================================================== */}
                    <motion.div
                        className="relative"
                        variants={leftVariants}
                        animate={isLeaving ? 'leaving' : 'initial'}
                        transition={isLeaving ? throwTransition : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            variants={leftIntro}
                            initial={reduceMotion ? 'enter' : 'rest'}
                            animate="enter"
                            className="flex flex-col items-center md:items-start"
                        >
                            <HeroHeading />

                            <motion.p
                                variants={introPiece}
                                className="mt-4 max-w-[320px] text-center text-sm leading-6 text-muted-foreground md:mt-7 md:max-w-xl md:text-left md:text-lg md:leading-7"
                            >
                                Publish the thing you built, and give it a page worth sending to someone — read,
                                found, and answered by developers who build too.
                            </motion.p>

                            <motion.div
                                variants={introPiece}
                                className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start"
                            >
                                <Button asChild>
                                    <Link href="/projects">Projects</Link>
                                </Button>

                                <Button asChild variant="outline">
                                    <Link href="/design">Meet Catronaut</Link>
                                </Button>
                            </motion.div>

                            {/* The agent is not shipped. The hero says so here rather
                                than implying otherwise with a demo. */}
                            <motion.div
                                variants={introPiece}
                                className="mt-8 flex items-center gap-3 border-t border-foreground/10 pt-5 md:mt-12"
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded bg-[#f5eee6] dark:bg-primary">
                                    <CatronautCoding scale={0.3} />
                                </span>

                                <p className="max-w-[34ch] text-xs leading-5 text-muted-foreground">
                                    <span className="font-semibold text-foreground">Catronaut</span>, our design agent,
                                    is still in the workshop. Come see what it will do.
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* =====================================================
                        RIGHT — A REAL PROJECT PAGE
                    ====================================================== */}
                    <motion.div
                        className="relative"
                        variants={rightVariants}
                        initial={{ opacity: 0, x: 35, filter: 'blur(8px)' }}
                        animate={isLeaving ? 'leaving' : 'initial'}
                        transition={isLeaving ? throwTransition : { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    >
                        <motion.div
                            variants={assembly}
                            initial={reduceMotion ? 'shown' : 'hidden'}
                            animate="shown"
                        >
                            <Link
                                href="/projects"
                                aria-label="Browse project pages on Fiurozz"
                                className="group/card block overflow-hidden rounded bg-card ring-1 ring-foreground/10 shadow-[0_20px_60px_-30px_rgba(30,25,20,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-30px_rgba(30,25,20,0.45)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
                            >
                                {/* COVER — full bleed, and the tallest band on the card. A real
                                    screenshot of the site itself, top-cropped so the header and
                                    hero survive the crop rather than the empty middle of the page. */}
                                <motion.div
                                    variants={piece}
                                    className="relative h-[188px] overflow-hidden border-b border-foreground/10 bg-primary/10 sm:h-[216px]"
                                >
                                    <Image
                                        alt="Fiurozz's own home page, rendered as its project cover"
                                        src="/home/fiurozz.jpg"
                                        fill
                                        sizes="(min-width: 1024px) 45vw, 90vw"
                                        className="select-none object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03]"
                                    />
                                </motion.div>

                                <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
                                    {/* NAME, and what kind of thing it is */}
                                    <motion.div
                                        variants={piece}
                                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                                    >
                                        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                            {SAMPLE_PROJECT.title}
                                        </h2>

                                        <span className="font-mono text-[11px] tracking-tight text-muted-foreground">
                                            {SAMPLE_PROJECT.descriptor}
                                        </span>
                                    </motion.div>

                                    <motion.p variants={piece} className="mt-2 text-sm text-muted-foreground">
                                        {SAMPLE_PROJECT.tagline}
                                    </motion.p>

                                    {/* STACK — mono chips, the rest collapsed into a count */}
                                    <motion.ul variants={piece} className="mt-5 flex flex-wrap items-center gap-2">
                                        {SAMPLE_PROJECT.stack.slice(0, VISIBLE_STACK).map((tech) => (
                                            <li
                                                key={tech}
                                                className="rounded border border-foreground/10 px-2 py-1 font-mono text-[11px] leading-none text-muted-foreground"
                                            >
                                                {tech}
                                            </li>
                                        ))}

                                        {SAMPLE_PROJECT.stack.length > VISIBLE_STACK && (
                                            <li className="font-mono text-[11px] leading-none text-muted-foreground/70">
                                                +{SAMPLE_PROJECT.stack.length - VISIBLE_STACK}
                                            </li>
                                        )}
                                    </motion.ul>
                                </div>

                                {/* FOOTER — who made it, and the way in */}
                                <motion.div
                                    variants={piece}
                                    className="flex items-center justify-between border-t border-foreground/10 px-5 py-3 sm:px-6"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <span
                                            aria-hidden="true"
                                            className="size-1.5 rotate-45 bg-primary"
                                        />
                                        <span className="font-mono text-[11px] tracking-tight text-muted-foreground">
                                            {SAMPLE_PROJECT.handle}
                                        </span>
                                    </span>

                                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground" />
                                </motion.div>
                            </Link>

                            <motion.p
                                variants={piece}
                                className="mt-3 text-center text-xs text-muted-foreground md:text-left"
                            >
                                A project page on Fiurozz — this one is ours.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
