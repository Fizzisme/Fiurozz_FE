'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { EyeClosed, Eye } from 'lucide-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import LogoFramework from '@/app/(main)/home/components/logoframework';

export default function Description() {
    return (
        <div>
            <div className="text-center mt-20 flex flex-col items-center">
                {/*
              Heading with a two-layer blur/reveal effect:
              - Bottom layer: a faded, blurred duplicate of the text that fades into
                focus, acting as a soft "ghost" backdrop for depth.
              - Top layer: the actual crisp text, revealed via a clip-path wipe
                combined with a blur-in + slide-in animation.
              Both layers are absolutely positioned and share the same dimensions
              via `inset-0`, so they overlap perfectly during the transition.
            */}
                <div className="relative w-[70%] min-h-[48px]">
                    {/* Blurred background layer (ghost text) */}
                    <motion.p
                        className="text-5xl font-medium select-none text-black/30 absolute inset-0"
                        initial={{ filter: 'blur(8px)' }}
                        animate={{ filter: 'blur(0px)' }}
                        transition={{ duration: 1.6, ease: 'easeOut' }}
                    >
                        Showcase your projects to the World
                    </motion.p>

                    {/* Foreground layer (sharp text) with slide-in + blur-in */}
                    <motion.p
                        className="text-5xl font-medium select-none absolute inset-0"
                        initial={{
                            filter: 'blur(8px)',
                            opacity: 0,
                            x: -30,
                        }}
                        animate={{
                            filter: 'blur(0px)',
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 1.6,
                            ease: 'easeOut',
                        }}
                    >
                        {/* Clip-path wipe reveal, animates left-to-right on top of the parent's fade/slide */}
                        <motion.span
                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                            animate={{ clipPath: 'inset(0 0% 0 0)' }}
                            transition={{
                                duration: 1.6,
                                ease: 'easeOut',
                            }}
                            className="inline-block pb-[10px]"
                        >
                            Showcase your projects to the World
                        </motion.span>
                    </motion.p>
                </div>

                {/* Subheading description, fades/slides in after the heading animation starts */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="mt-6 w-[55%] text-lg leading-relaxed text-[#737373]"
                >
                    A modern platform where you can share your personal web projects, explore work from other creators
                    and exchange insights with a community of developers who love creating just as much as you do.
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
        </div>
    );
}
