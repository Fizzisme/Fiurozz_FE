'use client';

import {
    SidebarFooter as SidebarFooterRadix,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/animate-ui/components/radix/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import Link from 'next/link';
import { Bell } from '@/components/animate-ui/icons/bell';
import { LogOut } from '@/components/animate-ui/icons/log-out';
import { ChevronUpDown } from '@/components/animate-ui/icons/chevron-up-down';
import { BadgeCheck } from '@/components/animate-ui/icons/badge-check';
import * as React from 'react';
import { useUserStore } from '@/lib/store/user-store';
import LogoIcon from '@/components/icons/logo-icon';
import { useIsMobile } from '@/hooks/use-mobile';

const mainMenuItems = [
    {
        label: 'Account',
        icon: BadgeCheck,
    },
    {
        label: 'Create Project',
        icon: PlusCircle,
        href: '/projects/create_project',
    },
    {
        label: 'Notifications',
        icon: Bell,
    },
];

export default function SidebarFooter() {
    const user = useUserStore((state) => state.user);
    const isMobile = useIsMobile();

    return (
        <SidebarFooterRadix>
            {/* Nav User */}
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={!user}>
                            <AnimateIcon animateOnHover>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatarUrl ?? ''} alt={user?.displayName} />
                                        <AvatarFallback>{getInitials(user?.fullName || 'Guest')}</AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">@{user?.displayName || 'Guest'}</span>
                                        <span className="truncate text-xs">
                                            {user?.email || 'guest.example@gmail.com'}
                                        </span>
                                    </div>
                                    <ChevronUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </AnimateIcon>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded"
                            side={isMobile ? 'bottom' : 'right'}
                            sideOffset={-4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatarUrl ?? ''} alt={user?.displayName} />
                                        <AvatarFallback>{getInitials(user?.fullName ?? 'Guest')}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">@{user?.displayName}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* Upgrade */}
                            <DropdownMenuGroup>
                                <AnimateIcon animateOnHover>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <LogoIcon height={30} width={30} />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </AnimateIcon>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            {/* Main menu */}
                            <DropdownMenuGroup>
                                {mainMenuItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <AnimateIcon key={item.label} animateOnHover>
                                            <DropdownMenuItem className="cursor-pointer">
                                                {item.href ? (
                                                    <Link href={item.href} className="flex w-full items-center gap-2">
                                                        <Icon />
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <>
                                                        <Icon />
                                                        {item.label}
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                        </AnimateIcon>
                                    );
                                })}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <AnimateIcon animateOnHover>
                                <DropdownMenuItem
                                    // onClick={handleClickLogout}

                                    className="cursor-pointer"
                                >
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </AnimateIcon>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            {/* Nav User */}
        </SidebarFooterRadix>
    );
}
