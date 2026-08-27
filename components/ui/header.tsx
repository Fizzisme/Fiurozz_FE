'use client';

import Link from 'next/link';
import Search from '@/components/ui/search';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/components/animate-ui/icons/user';
import Logo from '@/components/ui/logo';

import { Button } from '@/components/ui/button';
import Github from '@/components/icons/github';
import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Tooltip,
} from '@/components/animate-ui/components/animate/tooltip';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/lib/store/user-store';
import { UserMenu } from '@/components/ui/user-menu';

const IDLE_DELAY = 1200;
const TOP_THRESHOLD = 10; // px

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Tracks whether the cursor is currently over the header. Read
    // inside handleScroll's timeout callback (not via state) so the
    // check always sees the LATEST value without needing to be a
    // dependency that re-creates the scroll listener on every hover.
    const isHoveringRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const atTop = window.scrollY <= TOP_THRESHOLD;

            setHidden(false);

            if (idleTimer.current) clearTimeout(idleTimer.current);

            if (!atTop) {
                idleTimer.current = setTimeout(() => {
                    // Cursor is still resting on the header when the
                    // idle delay fires -- skip hiding. The header will
                    // only hide once the mouse actually leaves (see
                    // handleMouseLeave below), not on a fixed timer
                    // while hovered.
                    if (isHoveringRef.current) return;
                    setHidden(true);
                }, IDLE_DELAY);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    const handleMouseEnter = () => {
        isHoveringRef.current = true;
        // Cancel any pending hide and make sure the header is visible
        // for as long as the cursor stays on it.
        if (idleTimer.current) clearTimeout(idleTimer.current);
        setHidden(false);
    };

    const handleMouseLeave = () => {
        isHoveringRef.current = false;

        const atTop = window.scrollY <= TOP_THRESHOLD;
        // Resume the normal idle-hide behavior only if the page isn't
        // at the top -- same condition handleScroll uses, so leaving
        // the header while already at the top doesn't hide it either.
        if (!atTop) {
            idleTimer.current = setTimeout(() => {
                setHidden(true);
            }, IDLE_DELAY);
        }
    };

    const user = useUserStore((state) => state.user);
    const isInitialized = useUserStore((state) => state.isInitialized);

    return (
        <motion.header
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed top-0 left-0 right-0 h-[56px] md:h-[82px] bg-background border-b border-input z-10 flex items-center justify-between px-4 md:px-6"
            animate={{ y: hidden ? '-100%' : '0%' }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            }}
        >
            <Logo />

            <Button variant="ghost" className="h-[25px] w-[25px] [&_svg]:pointer-events-auto cursor-pointer md:hidden">
                <ThemeTogglerButton />
            </Button>

            <div className="hidden md:flex items-center gap-1">
                <Search />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a href="https://github.com/Fizzisme/WebFi_FE">
                                <Button
                                    variant="ghost"
                                    className="h-[25px] [&_svg]:pointer-events-auto cursor-pointer opacity-60 hover:opacity-80 transition-opacity"
                                >
                                    <Github className="size-4" /> 0
                                </Button>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View source on GitHub</p>
                        </TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" />

                    {!isInitialized ? (
                        <div className="h-[25px] w-[25px] rounded bg-muted animate-pulse" />
                    ) : user ? (
                        <UserMenu />
                    ) : (
                        <Tooltip key="guest">
                            <TooltipTrigger asChild>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        className="h-[25px] w-[25px] [&_svg]:pointer-events-auto cursor-pointer"
                                    >
                                        <User
                                            animateOnHover
                                            className="size-4 opacity-60 hover:opacity-80 transition-opacity"
                                        />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Log in</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    <Separator orientation="vertical" />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-[25px] w-[25px] [&_svg]:pointer-events-auto cursor-pointer"
                            >
                                <ThemeTogglerButton />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </motion.header>
    );
}
