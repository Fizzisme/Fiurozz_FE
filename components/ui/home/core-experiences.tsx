'use client';

import { motion } from 'framer-motion';
import { Monitor, LocateFixed, Infinity as InfinityIcon, Sparkles, ArrowUpRight } from 'lucide-react';

type FeatureCard = {
    index: string;
    label: string;
    icon: React.ReactNode;
    title: string;
    description: string;
};

const FEATURES: FeatureCard[] = [
    {
        index: '01',
        label: 'SHOWCASE',
        icon: <Monitor className="h-4 w-4" strokeWidth={1.5} />,
        title: 'Showcase your projects',
        description: 'Create a project page with your story, tech stack, live demo, and progress.',
    },
    {
        index: '02',
        label: 'DISCOVER',
        icon: <LocateFixed className="h-4 w-4" strokeWidth={1.5} />,
        title: 'Discover developer projects',
        description: 'Explore projects by technology, category, and what developers are building.',
    },
    {
        index: '03',
        label: 'CONNECT',
        icon: <InfinityIcon className="h-4 w-4" strokeWidth={1.5} />,
        title: 'Connect with developers',
        description: 'Follow builders, share ideas, give feedback, and build together.',
    },
    {
        index: '04',
        label: 'BUILD WITH AI',
        icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} />,
        title: 'Build with AI agents',
        description: 'Turn ideas into code, generate features, and iterate faster — while you stay in control.',
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function CoreExperiences() {
    return (
        <section
            aria-labelledby="core-experiences-heading"
            className="relative flex h-full w-full items-center px-6 md:px-10 lg:px-16"
        >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
                {/* ================= LEFT — IMAGE PLACEHOLDER ================= */}
                <div className="relative hidden lg:block">
                    <div className="relative h-full w-full overflow-hidden rounded-sm border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
                        <svg
                            className="absolute bottom-3 right-3 h-3 w-3 text-neutral-300 dark:text-neutral-700"
                            viewBox="0 0 12 12"
                            fill="none"
                        >
                            <path d="M11 1 1 11M11 6 6 11M11 11h-3" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                </div>

                {/* ================= RIGHT — HEADING + CARDS ================= */}
                <div className="flex flex-col justify-center">
                    {/* Eyebrow */}
                    <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />
                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary">
                            CORE EXPERIENCES
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
                            &middot; N&deg; 03
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="core-experiences-heading"
                        className="text-2xl font-black leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl"
                    >
                        Four orbits, <span className="font-serif italic font-normal">one universe</span> of developer
                        work.
                    </h2>

                    {/* Subtext */}
                    <p className="mt-3 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
                        Showcase your work. Discover what other developers are building. Connect with the community and
                        use AI agents to build faster — without losing control of your ideas.
                    </p>

                    {/* Cards grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-5 grid grid-cols-2 gap-3"
                    >
                        {FEATURES.map((feature) => (
                            <motion.div
                                key={feature.index}
                                variants={item}
                                className="group relative flex flex-col rounded border border-neutral-200 bg-white/60 p-3 transition-colors duration-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900 sm:p-4"
                            >
                                {/* Header: số thứ tự + nhãn */}
                                <div className="mb-2 flex items-start justify-between">
                                    <span className="font-serif text-base italic text-primary sm:text-lg">
                                        {feature.index}
                                    </span>
                                    <span className="font-mono text-[8px] tracking-[0.1em] text-neutral-400 sm:text-[9px]">
                                        {feature.label}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="mb-2 text-neutral-800 dark:text-neutral-200">{feature.icon}</div>

                                {/* Title + description */}
                                <h3 className="mb-1 text-xs font-bold leading-tight text-neutral-900 dark:text-white sm:text-sm">
                                    {feature.title}
                                </h3>
                                <p className="mb-2 line-clamp-2 text-[10px] leading-snug text-neutral-500 dark:text-neutral-400 sm:text-xs">
                                    {feature.description}
                                </p>

                                {/* Nút mũi tên góc dưới phải */}
                                <div className="mt-auto flex justify-end">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-neutral-700">
                                        <ArrowUpRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
