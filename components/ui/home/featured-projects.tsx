'use client';

import { motion } from 'framer-motion';
import MotionCarousel from '@/components/animate-ui/components/community/motion-carousel';

const myCard = (
    <div style={{ opacity: 1 }}>
        <div className="relative w-full dark:bg-neutral-800 bg-neutral-100 rounded-2xl pt-1">
            <p className="text-[22px] font-black text-muted-foreground absolute top-3 left-1/2 -translate-x-1/2">Hi</p>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.83 66.52">
                <path className="dark:fill-neutral-700 fill-neutral-200" d="M15.97 15.06h57.88v40.4H15.97z" />
                <path className="dark:fill-neutral-500 fill-neutral-400" d="M21.01 19.81h8.13v8.13h-8.13z" />
            </svg>
        </div>
    </div>
);

export default function FeaturedProjects() {
    return (
        <section
            aria-labelledby="main-card-heading"
            className="relative flex h-full w-full flex-col items-center justify-center px-6 md:px-10 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                {/* -------------------------------------------
                    SECTION HEADER
                ------------------------------------------- */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    className="mb-6 max-w-2xl"
                >
                    {/* Eyebrow */}
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />

                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary">
                            FEATURED PROJECTS
                        </span>

                        <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
                            &middot; N&deg; 04
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="main-card-heading"
                        className="text-2xl font-black leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl"
                    >
                        See what the <span className="font-serif italic font-normal">community</span> is building.
                    </h2>

                    {/* Description */}
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
                        A rotating look at real projects, shipped by real developers — updated as the community keeps
                        building.
                    </p>
                </motion.div>

                {/* -------------------------------------------
                    CAROUSEL
                ------------------------------------------- */}
                <div className="w-full max-w-full overflow-hidden">
                    <MotionCarousel
                        slides={[myCard, myCard, myCard, myCard, myCard]}
                        cardHeight="300px"
                        options={{ loop: true }}
                    />
                </div>
            </div>
        </section>
    );
}
