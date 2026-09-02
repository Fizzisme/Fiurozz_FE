'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
} from '@/components/animate-ui/components/radix/sidebar';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

type IconType = React.ComponentType<{ className?: string }>;

export type SidebarMenuGroupItem = {
    label: string;
    icon?: IconType;
    badge?: number;
    href: string;
};

interface SidebarMenuGroupProps {
    label: string;
    items: SidebarMenuGroupItem[];
}

export default function SidebarMenuGroup({ label, items }: SidebarMenuGroupProps) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[#898781]">{label}</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <SidebarMenuItem key={item.label}>
                                <AnimateIcon animateOnHover asChild>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        className="text-[#52514e] dark:text-[#c3c2b7]"
                                    >
                                        <Link href={item.href}>
                                            {Icon && <Icon />}
                                            <span className="truncate">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </AnimateIcon>

                                {item.badge !== undefined && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
