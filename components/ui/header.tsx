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

const IDLE_DELAY = 1200; // ms không scroll thì mới ẩn
const TOP_THRESHOLD = 10; // px, coi như đang ở đầu trang
export default function Header() {
    const [hidden, setHidden] = useState(false);
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const atTop = window.scrollY <= TOP_THRESHOLD;

            // Đang scroll (hoặc ở top) -> luôn hiện header
            setHidden(false);

            if (idleTimer.current) clearTimeout(idleTimer.current);

            // Nếu không ở top, hẹn giờ ẩn header sau khi ngừng scroll
            if (!atTop) {
                idleTimer.current = setTimeout(() => {
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

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 h-[82px] bg-primary dark:bg-primary border-b border-input dark:border-input  z-10 flex items-center justify-between px-6"
            animate={{ y: hidden ? '-100%' : '0%' }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            }}
        >
            <Logo />

            <div className="flex items-center gap-1">
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

                    {/*{!loading &&*/}
                    {/*    (user ? (*/}
                    {/*        <Link href="/member/post">*/}
                    {/*          <Avatar className="h-[28px] w-[28px] cursor-pointer border-2 border-black dark:border-white">*/}
                    {/*            <AvatarImage src={member?.profile?.avatar} />*/}
                    {/*            <AvatarFallback>{getInitials(member?.username ?? 'Guest')}</AvatarFallback>*/}
                    {/*          </Avatar>*/}
                    {/*        </Link>*/}
                    {/*    ) : (*/}
                    <Tooltip>
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
                    {/*    ))}*/}
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
