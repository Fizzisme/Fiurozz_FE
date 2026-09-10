'use client';

import { motion, type Variants } from 'motion/react';
import { createContext, useContext, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from 'react';

/**
 * Holds every Reveal below it at its `initial` state until the value flips
 * to `true`. The hero uses it so its copy waits for the opening plate to
 * finish shrinking; every other scene reads the default and reveals on
 * scroll as before.
 */
export const RevealGate = createContext(true);

/** Not really `any` for callers — `Reveal`'s own generic signature below
 *  still checks `as` against the tags it supports. This only loosens the
 *  internal JSX check, which can't verify a prop spread against a *union*
 *  of motion component types. */
type AnyMotionComponent = ElementType;

/** The atelier's easing, matching `--ease-ctr` in app/globals.css. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** v1's stagger: `[data-delay="n"]` == n * 110ms. */
const STEP = 0.11;

/** The tags Reveal is actually asked for — kept as stable references so
 *  `as="p"` etc. doesn't rebuild a component (and remount the DOM node) on
 *  every render. */
const MOTION_TAG = {
    div: motion.div,
    p: motion.p,
    h2: motion.h2,
    form: motion.form,
    li: motion.li,
    aside: motion.aside,
    figure: motion.figure,
    figcaption: motion.figcaption,
} as const;

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px', amount: 0.12 } as const;

type RevealProps<T extends keyof typeof MOTION_TAG> = {
    as?: T;
    delay?: 0 | 1 | 2 | 3;
    /** Overrides the scroll trigger. A pinned scene is on screen by
     *  definition, and the default's -12% bottom margin would strand
     *  anything sitting in the lowest band of the viewport. */
    viewport?: ComponentPropsWithoutRef<typeof motion.div>['viewport'];
    className?: string;
    children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * The slow reveal from v1: a fade, a slight rise and a touch of blur, once
 * the element scrolls 12% into view. Built on `motion`'s `whileInView` —
 * it already does the observer, the "only once", and the SSR-safe default
 * (visible until proven otherwise) that this used to take a hand-rolled
 * IntersectionObserver hook to get right.
 */
export function Reveal<T extends keyof typeof MOTION_TAG = 'div'>({
    as,
    delay = 0,
    viewport = VIEWPORT,
    className,
    children,
    ...rest
}: RevealProps<T>) {
    const MotionTag = MOTION_TAG[as ?? 'div'] as AnyMotionComponent;
    const open = useContext(RevealGate);

    return (
        <MotionTag
            /* Remounting on the gate flip is what makes the reveal fire: a
               `whileInView` observer attached while the element was already
               in view would have nothing left to cross. */
            key={open ? 'open' : 'gated'}
            initial={{ opacity: 0, y: 20, filter: 'blur(7px)' }}
            whileInView={open ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
            viewport={viewport}
            transition={{ duration: 0.9, delay: delay * STEP, ease: EASE }}
            className={className}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}

const linesContainer: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.13 } },
};
const line: Variants = {
    hidden: { y: '106%' },
    shown: { y: '0%', transition: { duration: 1.2, ease: EASE } },
};

/**
 * The headline grammar: each line rises out of its own overflow-hidden
 * measure, staggered 130ms apart. Used by the hero title and the closing
 * invite line, both of which stay fully opaque as a block — v1 relies on
 * the line reveal alone for those two.
 */
export function RevealLines({ lines }: { lines: ReactNode[] }) {
    const open = useContext(RevealGate);

    return (
        <motion.span
            key={open ? 'open' : 'gated'}
            className="block"
            initial="hidden"
            whileInView={open ? 'shown' : undefined}
            viewport={VIEWPORT}
            variants={linesContainer}
        >
            {lines.map((text, i) => (
                <span className="block overflow-hidden" key={i}>
                    <motion.span className="block" variants={line}>
                        {text}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
