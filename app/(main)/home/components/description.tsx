'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { EyeClosed, Eye } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import LogoFramework from '@/app/(main)/home/components/logoframework';
import HeroHeading from '@/components/ui/hero-heading';
import BackgroundSpace from '@/components/ui/background-space';
import { Star } from '@/lib/utils';

export default function Description({ smallStars, bigStars }: { smallStars: Star[]; bigStars: Star[] }) {
    return (
        <div className="text-center pt-20 flex flex-col items-center min-h-screen justify-center relative border-b border-input dark:border-input">
            <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/60 p-1 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1 font-medium shadow-sm dark:shadow-lg">
                    ✦<span>Share · Discover · Build</span>
                </span>
            </div>
            <BackgroundSpace smallStars={smallStars} bigStars={bigStars} />

            <HeroHeading />
            {/* Subheading description, fades/slides in after the heading animation starts */}
            <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="mt-6 w-[55%] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed dark:text-white/70 z-2"
            >
                A modern space to showcase developer projects, discover inspiring work, and connect with creators who
                love building and sharing.
            </motion.p>

            {/* CTA buttons, fades/slides in last to complete the staggered entrance sequence */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
                className="flex gap-3 mt-5"
            >
                <Button className="cursor-pointer bg-black hover:bg-black/80 dark:bg-white">Get started</Button>

                <Link href="/projects/e-commerce/online-store">
                    <Button
                        variant="ghost"
                        className="group w-[150px] flex items-center justify-between cursor-pointer"
                    >
                        <span>View projects</span>

                        {/* Icon swap on hover: closed-eye -> open-eye, cross-faded via opacity/scale */}
                        <span className="relative w-5 h-5">
                            <EyeClosed className="size-5 transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 absolute inset-0" />
                            <Eye className="size-5 transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 absolute inset-0" />
                        </span>
                    </Button>
                </Link>
            </motion.div>

            {/* Row of framework/tech logos rendered below the hero content */}
            <LogoFramework />
        </div>
    );
}
