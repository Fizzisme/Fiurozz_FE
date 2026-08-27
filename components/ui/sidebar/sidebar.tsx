'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Bookmark,
    BrainCog,
    ChevronRight,
    CircleUserRound,
    Code,
    CreditCard,
    Folder,
    GraduationCap,
    HeartPulse,
    Mail,
    PlayCircle,
    ShoppingCart,
} from 'lucide-react';

import { Activity } from '@/components/animate-ui/icons/activity';
import { Trash2 } from '@/components/animate-ui/icons/trash-2';
import { Bell } from '@/components/animate-ui/icons/bell';
import { User } from '@/components/animate-ui/icons/user';
import { Users } from '@/components/animate-ui/icons/users';
import { MessageSquare } from '@/components/animate-ui/icons/message-square';
import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';

import {
    Sidebar as SidebarRadix,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/animate-ui/components/radix/sidebar';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import SidebarHeader from '@/components/ui/sidebar/sidebar-header';
import SidebarFooter from '@/components/ui/sidebar/sidebar-footer';
import Project from '@/components/icons/project';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type IconType = React.ComponentType<{
    className?: string;
}>;

type MenuItem = {
    label: string;
    icon?: IconType;
    badge?: number;
    href: string;
};

type MenuGroup = {
    label: string;
    items: MenuItem[];
};

type ProjectCategory = {
    title: string;
    slug: string;
    icon: IconType;
    subCategories: {
        title: string;
        slug: string;
    }[];
};

/* -------------------------------------------------------------------------- */
/*                                  Main Menu                                 */
/* -------------------------------------------------------------------------- */

const menuItems: MenuGroup[] = [
    {
        label: 'Profile',
        items: [
            {
                label: 'My Profile',
                icon: CircleUserRound,
                href: '/profile',
            },
            {
                label: 'Activity',
                icon: Activity,
                href: '/profile/activity',
            },
            {
                label: 'Saved',
                icon: Bookmark,
                href: '/profile/saved',
            },
        ],
    },

    {
        label: 'Community',
        items: [
            {
                label: 'Notifications',
                icon: Bell,
                badge: 5,
                href: '/notifications',
            },
            {
                label: 'Messages',
                icon: MessageSquare,
                badge: 2,
                href: '/messages',
            },
            {
                label: 'Followers',
                icon: Users,
                href: '/followers',
            },
            {
                label: 'Following',
                icon: User,
                href: '/following',
            },
        ],
    },

    {
        label: 'Explore',
        items: [
            {
                label: 'Members',
                icon: Users,
                href: '/members',
            },
            {
                label: 'Posts',
                icon: MessageSquare,
                href: '/posts',
            },
            {
                label: 'Contact Us',
                icon: Mail,
                href: '/contact',
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                           Project Categories                               */
/* -------------------------------------------------------------------------- */

const projectCategories: ProjectCategory[] = [
    {
        title: 'E-commerce',
        slug: 'e-commerce',
        icon: ShoppingCart,
        subCategories: [
            {
                title: 'Online Store',
                slug: 'online-store',
            },
            {
                title: 'Marketplace',
                slug: 'market-place',
            },
            {
                title: 'Booking System',
                slug: 'booking-system',
            },
            {
                title: 'Subscription Service',
                slug: 'subscription-service',
            },
        ],
    },

    {
        title: 'Community & Social',
        slug: 'community-social',
        icon: Users,
        subCategories: [
            {
                title: 'Forum',
                slug: 'forum',
            },
            {
                title: 'Chat Application',
                slug: 'chat-application',
            },
            {
                title: 'Social Network',
                slug: 'social-network',
            },
        ],
    },

    {
        title: 'Education',
        slug: 'education',
        icon: GraduationCap,
        subCategories: [
            {
                title: 'E-learning Platform',
                slug: 'elearning-platform',
            },
            {
                title: 'Online Courses',
                slug: 'online-courses',
            },
            {
                title: 'Quiz System',
                slug: 'quiz-system',
            },
            {
                title: 'Student Management',
                slug: 'student-management',
            },
        ],
    },

    {
        title: 'Finance & Fintech',
        slug: 'finance-fintech',
        icon: CreditCard,
        subCategories: [
            {
                title: 'Expense Tracker',
                slug: 'expense-tracker',
            },
            {
                title: 'Payment System',
                slug: 'payment-system',
            },
            {
                title: 'Crypto Dashboard',
                slug: 'crypto-dashboard',
            },
            {
                title: 'Invoice & Billing',
                slug: 'invoice-and-billing',
            },
        ],
    },

    {
        title: 'Healthcare & Lifestyle',
        slug: 'healthcare-lifestyle',
        icon: HeartPulse,
        subCategories: [
            {
                title: 'Appointment Booking',
                slug: 'appointment-booking',
            },
            {
                title: 'Fitness Tracker',
                slug: 'fitness-tracker',
            },
            {
                title: 'Health Records',
                slug: 'health-records',
            },
            {
                title: 'Mental Health App',
                slug: 'mental-health-app',
            },
        ],
    },

    {
        title: 'Entertainment & Media',
        slug: 'entertainment-media',
        icon: PlayCircle,
        subCategories: [
            {
                title: 'Streaming Platform',
                slug: 'streaming-platform',
            },
            {
                title: 'Music Player',
                slug: 'music-player',
            },
            {
                title: 'Mini Games',
                slug: 'mini-games',
            },
            {
                title: 'Podcast Platform',
                slug: 'podcast',
            },
        ],
    },

    {
        title: 'AI & Data',
        slug: 'ai-data',
        icon: BrainCog,
        subCategories: [
            {
                title: 'AI Chatbot',
                slug: 'ai-chatbot',
            },
            {
                title: 'Recommendation System',
                slug: 'recommendation-system',
            },
            {
                title: 'Data Visualization',
                slug: 'data-visualization',
            },
            {
                title: 'AI SaaS Tool',
                slug: 'ai-saas-tool',
            },
        ],
    },

    {
        title: 'Developer Tools',
        slug: 'developer-tools',
        icon: Code,
        subCategories: [
            {
                title: 'Component Library',
                slug: 'component-library',
            },
            {
                title: 'API Platform',
                slug: 'api-platform',
            },
            {
                title: 'Code Snippet Manager',
                slug: 'code-snippet-manager',
            },
            {
                title: 'Dev Dashboard',
                slug: 'dev-dashboard',
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                              Profile Sidebar                               */
/* -------------------------------------------------------------------------- */

export function Sidebar() {
    const pathname = usePathname();

    return (
        <SidebarRadix collapsible="icon" className="w-[280px]">
            {/* Header */}
            <SidebarHeader />
            {/* ---------------------------------------------------------------- */}
            {/* Content                                                          */}
            {/* ---------------------------------------------------------------- */}

            <SidebarContent className="overflow-x-hidden thin-scrollbar">
                {/* ========================================================== */}
                {/* Profile                                                      */}
                {/* ========================================================== */}

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#898781]">Profile</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems[0].items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <AnimateIcon animateOnHover asChild>
                                            <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                {Icon && <Icon />}

                                                <span className="truncate">{item.label}</span>
                                            </SidebarMenuButton>
                                        </AnimateIcon>

                                        {item.badge !== undefined && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ========================================================== */}
                {/* Projects                                                     */}
                {/* ========================================================== */}

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#898781]">Projects</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* ------------------------------------------------ */}
                            {/* My Projects                                      */}
                            {/* ------------------------------------------------ */}

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <AnimateIcon animateOnHover asChild>
                                            <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                <Folder />

                                                <span className="truncate">My Projects</span>

                                                <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </AnimateIcon>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {/* Published */}
                                            <SidebarMenuSubItem>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuSubButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                        <span>Published</span>
                                                    </SidebarMenuSubButton>
                                                </AnimateIcon>
                                            </SidebarMenuSubItem>

                                            {/* Drafts */}
                                            <SidebarMenuSubItem>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuSubButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                        <span>Drafts</span>

                                                        <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                                            3
                                                        </span>
                                                    </SidebarMenuSubButton>
                                                </AnimateIcon>
                                            </SidebarMenuSubItem>

                                            {/* Archived */}
                                            <SidebarMenuSubItem>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuSubButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                        <span>Archived</span>
                                                    </SidebarMenuSubButton>
                                                </AnimateIcon>
                                            </SidebarMenuSubItem>

                                            {/* Trash */}
                                            <SidebarMenuSubItem>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuSubButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                        <Trash2 className="text-[#52514e] dark:text-[#c3c2b7]" />

                                                        <span>Trash</span>
                                                    </SidebarMenuSubButton>
                                                </AnimateIcon>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>

                            {/* ------------------------------------------------ */}
                            {/* Categories                                      */}
                            {/* ------------------------------------------------ */}

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    {/* Categories Header */}
                                    <CollapsibleTrigger asChild>
                                        <AnimateIcon animateOnHover asChild>
                                            <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                <LayoutDashboard />

                                                <span>Categories</span>

                                                <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </AnimateIcon>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenu className="ml-3.5 pr-2 border-l border-sidebar-border pl-2.5">
                                            {/* -------------------------------- */}
                                            {/* All Projects                     */}
                                            {/* -------------------------------- */}

                                            <SidebarMenuItem>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={pathname === '/projects'}
                                                        className="text-[#52514e] dark:text-[#c3c2b7]"
                                                    >
                                                        <Link href="/projects">
                                                            <Project />

                                                            <span className="truncate">All Projects</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </AnimateIcon>
                                            </SidebarMenuItem>

                                            {/* -------------------------------- */}
                                            {/* Project Categories               */}
                                            {/* -------------------------------- */}

                                            {projectCategories.map((category) => {
                                                const Icon = category.icon;

                                                const categoryPath = `/projects/${category.slug}`;

                                                const isOpen = pathname.startsWith(categoryPath);

                                                return (
                                                    <Collapsible
                                                        key={category.slug}
                                                        defaultOpen={isOpen}
                                                        className="group/collapsible"
                                                    >
                                                        <SidebarMenuItem>
                                                            {/* Category */}
                                                            <CollapsibleTrigger asChild>
                                                                <AnimateIcon animateOnHover asChild>
                                                                    <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                                        <Icon />

                                                                        <span className="min-w-0 truncate">
                                                                            {category.title}
                                                                        </span>

                                                                        <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                                                    </SidebarMenuButton>
                                                                </AnimateIcon>
                                                            </CollapsibleTrigger>

                                                            {/* Sub Categories */}
                                                            <CollapsibleContent>
                                                                <SidebarMenuSub>
                                                                    {category.subCategories.map((subCategory) => {
                                                                        const subCategoryPath = `${categoryPath}/${subCategory.slug}`;

                                                                        const isActive = pathname === subCategoryPath;

                                                                        return (
                                                                            <SidebarMenuSubItem key={subCategory.slug}>
                                                                                <AnimateIcon animateOnHover asChild>
                                                                                    <SidebarMenuSubButton
                                                                                        asChild
                                                                                        isActive={isActive}
                                                                                        className="text-[#52514e] dark:text-[#c3c2b7]"
                                                                                    >
                                                                                        <Link href={subCategoryPath}>
                                                                                            <span className="truncate">
                                                                                                {subCategory.title}
                                                                                            </span>
                                                                                        </Link>
                                                                                    </SidebarMenuSubButton>
                                                                                </AnimateIcon>
                                                                            </SidebarMenuSubItem>
                                                                        );
                                                                    })}
                                                                </SidebarMenuSub>
                                                            </CollapsibleContent>
                                                        </SidebarMenuItem>
                                                    </Collapsible>
                                                );
                                            })}
                                        </SidebarMenu>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ========================================================== */}
                {/* Community                                                    */}
                {/* ========================================================== */}

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#898781]">Community</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems[1].items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <AnimateIcon animateOnHover asChild>
                                            <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                {Icon && <Icon />}

                                                <span className="truncate">{item.label}</span>
                                            </SidebarMenuButton>
                                        </AnimateIcon>

                                        {item.badge !== undefined && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* ========================================================== */}
                {/* Explore                                                      */}
                {/* ========================================================== */}

                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#898781]">Explore</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems[2].items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <AnimateIcon animateOnHover asChild>
                                            <SidebarMenuButton className="text-[#52514e] dark:text-[#c3c2b7]">
                                                {Icon && <Icon />}

                                                <span className="truncate">{item.label}</span>
                                            </SidebarMenuButton>
                                        </AnimateIcon>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ---------------------------------------------------------------- */}
            {/* Footer                                                           */}
            {/* ---------------------------------------------------------------- */}

            <SidebarFooter />
        </SidebarRadix>
    );
}
