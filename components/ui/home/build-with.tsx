'use client';

import { motion, type Variants } from 'framer-motion';
import {
    SiVercel,
    SiNestjs,
    SiSpring,
    SiGo,
    SiGithub,
    SiDribbble,
    SiHuggingface,
    SiOllama,
    SiShadcnui,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type Credit = {
    name: string;
    description: string;
    href: string;
    Icon?: IconType;
};

function SiAnimateUi({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="44 39 146 136"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                d="M1055 1591 c-118 -40 -175 -98 -291 -297 -44 -77 -120 -206
                -169 -289 -104 -177 -122 -215 -136 -290 -29 -157 72 -340 229
                -413 l57 -27 430 0 430 0 58 27 c36 17 81 51 117 87 73 75 102
                144 108 257 5 100 -11 145 -118 325 -40 68 -113 194 -163 279
                -51 85 -107 176 -125 202 -92 130 -278 190 -427 139z m152 -350
                c9 -11 57 -91 108 -178 50 -87 122 -209 158 -271 37 -62 67 -121
                67 -131 0 -40 -12 -41 -361 -41 -186 0 -344 3 -353 6 -35 13 -13
                63 145 333 89 152 166 282 172 289 14 18 45 15 64 -7z"
                transform="matrix(0.1 0 0 -0.1 0 201)"
            />
        </svg>
    );
}

const CREDITS: Credit[] = [
    {
        name: 'Vercel',
        description: 'Deployment & frontend infrastructure',
        href: 'https://vercel.com',
        Icon: SiVercel,
    },
    {
        name: 'shadcn/ui',
        description: 'Accessible interface components',
        href: 'https://ui.shadcn.com',
        Icon: SiShadcnui,
    },
    {
        name: 'animate-ui',
        description: 'Motion & interactive UI',
        href: 'https://animate-ui.com',
        Icon: SiAnimateUi,
    },
    {
        name: 'NestJS',
        description: 'Backend APIs & services',
        href: 'https://nestjs.com',
        Icon: SiNestjs,
    },
    {
        name: 'Spring Boot',
        description: 'Business logic & services',
        href: 'https://spring.io/projects/spring-boot',
        Icon: SiSpring,
    },
    {
        name: 'Go',
        description: 'Gateway & high-performance services',
        href: 'https://go.dev',
        Icon: SiGo,
    },
    {
        name: 'GitHub',
        description: 'Source control & collaboration',
        href: 'https://github.com',
        Icon: SiGithub,
    },
    {
        name: 'Dribbble',
        description: 'Design inspiration & discovery',
        href: 'https://dribbble.com',
        Icon: SiDribbble,
    },
    {
        name: 'Hugging Face',
        description: 'Open-source AI models',
        href: 'https://huggingface.co',
        Icon: SiHuggingface,
    },
    {
        name: 'Ollama',
        description: 'Local AI model runtime',
        href: 'https://ollama.com',
        Icon: SiOllama,
    },
];

const container : Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

const item : Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.92,
        filter: 'blur(4px)',
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 22,
            mass: 0.9,
        },
    },
};

export default function BuiltWith() {
    return (
        <section
            aria-labelledby="built-with-heading"
            className="relative flex h-full w-full items-center px-6 md:px-10 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                {/* -------------------------------------------
                    SECTION HEADER
                ------------------------------------------- */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.55,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="mb-5 max-w-2xl"
                >
                    {/* Eyebrow */}
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />

                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary">
                            BUILT WITH
                        </span>

                        <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
                            &middot; N&deg; 02
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="built-with-heading"
                        className="text-2xl font-black leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl"
                    >
                        The tools behind{' '}
                        <span className="font-serif font-normal italic">
                            Fiurozz.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
                        Inspired by the tools and communities shaping modern development.
                        These technologies help power the interface, experiences,
                        and infrastructure behind Fiurozz.
                    </p>
                </motion.div>

                {/* -------------------------------------------
                    TECHNOLOGY GRID
                ------------------------------------------- */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    className="grid grid-cols-3 border-l border-t border-neutral-200 dark:border-neutral-800 sm:grid-cols-4 md:grid-cols-5"
                >
                    {CREDITS.map((credit) => {
                        const Icon = credit.Icon;

                        return (
                            <motion.a
                                key={credit.name}
                                variants={item}
                                href={credit.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${credit.name} — ${credit.description}`}
                                className="
                                    group
                                    relative
                                    min-h-[92px]
                                    border-b
                                    border-r
                                    border-neutral-200
                                    p-3
                                    transition-colors
                                    duration-300

                                    dark:border-neutral-800
                                    dark:hover:bg-neutral-900/40
                                    sm:min-h-[104px]
                                    sm:p-4
                                "
                            >

                                {/* Icon */}
                                <div
                                    className="
                                        mb-3
                                        flex
                                        h-5
                                        w-5
                                        items-center
                                        justify-start
                                        text-neutral-900
                                        transition-all
                                        duration-300
                                        dark:text-white
                                        sm:h-6
                                        sm:w-6
                                    "
                                >
                                    {Icon && (
                                        <Icon
                                            className="
                                                h-5
                                                w-5
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105
                                                sm:h-6
                                                sm:w-6
                                            "
                                        />
                                    )}
                                </div>

                                {/* Name */}
                                <h3
                                    className="
                                        text-[11px]
                                        font-bold
                                        tracking-tight
                                        text-neutral-900
                                        transition-colors
                                        duration-300

                                        dark:text-white
                                        sm:text-xs
                                    "
                                >
                                    {credit.name}
                                </h3>

                                {/* Description */}
                                <p
                                    className="
                                        mt-0.5
                                        line-clamp-2
                                        max-w-[140px]
                                        text-[9px]
                                        leading-snug
                                        text-neutral-400
                                        dark:text-neutral-500
                                    "
                                >
                                    {credit.description}
                                </p>
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* -------------------------------------------
                    FOOTNOTE
                ------------------------------------------- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-3 flex items-center justify-between"
                >
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-400">
                        Selected technologies & tools
                    </p>

                    <span className="font-mono text-[9px] tracking-[0.16em] text-primary">
                        {String(CREDITS.length).padStart(2, '0')} TOOLS
                    </span>
                </motion.div>
            </div>
        </section>
    );
}