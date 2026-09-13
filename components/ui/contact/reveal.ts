import type { Variants } from 'framer-motion';

/** One orchestrated entrance for the contact page: a container plus a shared piece variant. */
export const revealGroup: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const revealPiece: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    shown: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};
