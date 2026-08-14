'use client';

import { motion } from 'motion/react';
import { RotatingTextContainer, RotatingText } from '@/components/animate-ui/primitives/texts/rotating';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.1,
        },
    },
};

const line = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish, mượt và "nảy" nhẹ ở cuối
        },
    },
};

function HeroHeading() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-2 text-3xl min-[450px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold flex flex-col justify-center items-center"
        >
            <motion.span variants={line} className="dark:text-white">
                Showcase ur projects
            </motion.span>

            <motion.span variants={line} className="inline-flex items-baseline flex-wrap gap-x-3 dark:text-white">
                to{' '}
                <RotatingTextContainer
                    text={['the World', 'Everyone', 'your Team']}
                    duration={2000}
                    className="inline-flex items-baseline py-0 leading-none"
                >
                    <RotatingText className="whitespace-nowrap bg-[linear-gradient(90deg,#4338CA_0%,#7E22CE_25%,#0891B2_50%,#7E22CE_75%,#4338CA_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" />
                </RotatingTextContainer>
            </motion.span>
        </motion.div>
    );
}

export default HeroHeading;
