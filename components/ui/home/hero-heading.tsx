'use client';

import { motion } from 'framer-motion';
import { RotatingTextContainer, RotatingText } from '@/components/animate-ui/primitives/texts/rotating';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};

const line = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)',
    },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function HeroHeading() {
    return (
        <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="
        text-center
        md:text-left
        text-[2.5rem]
        font-medium
        leading-[0.98]
        tracking-[-0.055em]
        text-[#171717]
        dark:text-white
        sm:text-[3rem]
        md:text-[3.5rem]
        lg:text-[4rem]
        xl:text-[4.25rem]
    "
        >
            <motion.span variants={line} className="block">
                Discover what
            </motion.span>

            <motion.span variants={line} className="block">
                developers are
            </motion.span>

            <motion.span variants={line} className="block">
                building{' '}
                <RotatingTextContainer text={['today.', 'together.', 'to all']} duration={2400} className="inline-flex">
                    <RotatingText className=" italic text-primary pr-3 pb-2" />
                </RotatingTextContainer>
            </motion.span>
        </motion.h1>
    );
}
