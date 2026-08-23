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
    FolderTree,
    GraduationCap,
    HeartPulse,
    MessageCircle,
    MessageSquare,
    PlayCircle,
    ShoppingCart,
    UserRound,
    Users,
} from 'lucide-react';

import { Activity } from '@/components/animate-ui/icons/activity';
import { Trash2 } from '@/components/animate-ui/icons/trash-2';
import { Bell } from '@/components/animate-ui/icons/bell';
import { Settings } from '@/components/animate-ui/icons/settings';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarTrigger,
} from '@/components/animate-ui/components/radix/sidebar';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import { CurrentUser } from '@/lib/store/user-store';
import Fiurozz from '@/components/icons/logo';

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
            },
            {
                label: 'Activity',
                icon: Activity,
            },
            {
                label: 'Saved',
                icon: Bookmark,
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
            },
            {
                label: 'Messages',
                icon: MessageSquare,
                badge: 2,
            },
            {
                label: 'Followers',
                icon: Users,
            },
            {
                label: 'Following',
                icon: UserRound,
            },
        ],
    },

    {
        label: 'Explore',
        items: [
            {
                label: 'Members',
                icon: Users,
            },
            {
                label: 'Posts',
                icon: MessageSquare,
            },
            {
                label: 'Contact Us',
                icon: MessageCircle,
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

export function ProfileSidebar({ user }: { user: CurrentUser }) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            {/* ---------------------------------------------------------------- */}
            {/* Header                                                           */}
            {/* ---------------------------------------------------------------- */}

            <SidebarHeader className="flex flex-row items-center justify-between">
                <Fiurozz className="h-8 w-8 opacity-80 md:h-10 md:w-10" />

                <SidebarTrigger />
            </SidebarHeader>

            {/* ---------------------------------------------------------------- */}
            {/* Content                                                          */}
            {/* ---------------------------------------------------------------- */}

            <SidebarContent>
                {menuItems.map((group, groupIndex) => (
                    <React.Fragment key={group.label}>
                        {/* ---------------------------------------------------- */}
                        {/* Profile                                              */}
                        {/* ---------------------------------------------------- */}

                        <SidebarGroup>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <SidebarMenuItem key={item.label}>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuButton>
                                                        {Icon && <Icon />}

                                                        <span>{item.label}</span>
                                                    </SidebarMenuButton>
                                                </AnimateIcon>

                                                {item.badge !== undefined && (
                                                    <SidebarMenuBadge className="top-1/2 -translate-y-1/2">
                                                        {item.badge}
                                                    </SidebarMenuBadge>
                                                )}
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* ---------------------------------------------------- */}
                        {/* Projects - immediately after Profile               */}
                        {/* ---------------------------------------------------- */}

                        {groupIndex === 0 && (
                            <SidebarGroup>
                                <SidebarGroupLabel>Projects</SidebarGroupLabel>

                                <SidebarMenu>
                                    {/* ======================================== */}
                                    {/* My Projects                             */}
                                    {/* ======================================== */}

                                    <Collapsible defaultOpen className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuButton>
                                                        <Folder />

                                                        <span>My Projects</span>

                                                        <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </AnimateIcon>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {/* Published */}
                                                    <SidebarMenuSubItem>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuSubButton>
                                                                <span>Published</span>
                                                            </SidebarMenuSubButton>
                                                        </AnimateIcon>
                                                    </SidebarMenuSubItem>

                                                    {/* Drafts */}
                                                    <SidebarMenuSubItem>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuSubButton>
                                                                <span>Drafts</span>

                                                                <span className="ml-auto text-xs text-muted-foreground">
                                                                    3
                                                                </span>
                                                            </SidebarMenuSubButton>
                                                        </AnimateIcon>
                                                    </SidebarMenuSubItem>

                                                    {/* Archived */}
                                                    <SidebarMenuSubItem>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuSubButton>
                                                                <span>Archived</span>
                                                            </SidebarMenuSubButton>
                                                        </AnimateIcon>
                                                    </SidebarMenuSubItem>

                                                    {/* Trash */}
                                                    <SidebarMenuSubItem>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuSubButton>
                                                                <Trash2 />

                                                                <span>Trash</span>
                                                            </SidebarMenuSubButton>
                                                        </AnimateIcon>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>

                                    {/* ======================================== */}
                                    {/* Categories                              */}
                                    {/* ======================================== */}

                                    <Collapsible defaultOpen className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <AnimateIcon animateOnHover asChild>
                                                    <SidebarMenuButton>
                                                        <FolderTree />

                                                        <span>Categories</span>

                                                        <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </AnimateIcon>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {/* ================================= */}
                                                    {/* All Projects                     */}
                                                    {/* ================================= */}

                                                    <SidebarMenuSubItem>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={pathname === '/projects'}
                                                            >
                                                                <Link href="/projects">
                                                                    <Folder />

                                                                    <span>All Projects</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </AnimateIcon>
                                                    </SidebarMenuSubItem>

                                                    {/* ================================= */}
                                                    {/* Categories                       */}
                                                    {/* ================================= */}

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
                                                                <SidebarMenuSubItem>
                                                                    {/* Category */}
                                                                    <CollapsibleTrigger asChild>
                                                                        <AnimateIcon animateOnHover asChild>
                                                                            <SidebarMenuSubButton>
                                                                                <Icon />

                                                                                <span>{category.title}</span>

                                                                                <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                                                            </SidebarMenuSubButton>
                                                                        </AnimateIcon>
                                                                    </CollapsibleTrigger>

                                                                    {/* Sub Categories */}
                                                                    <CollapsibleContent>
                                                                        <SidebarMenuSub>
                                                                            {category.subCategories.map(
                                                                                (subCategory) => {
                                                                                    const subCategoryPath = `${categoryPath}/${subCategory.slug}`;

                                                                                    const isActive =
                                                                                        pathname === subCategoryPath;

                                                                                    return (
                                                                                        <SidebarMenuSubItem
                                                                                            key={subCategory.slug}
                                                                                        >
                                                                                            <AnimateIcon
                                                                                                animateOnHover
                                                                                                asChild
                                                                                            >
                                                                                                <SidebarMenuSubButton
                                                                                                    asChild
                                                                                                    isActive={isActive}
                                                                                                >
                                                                                                    <Link
                                                                                                        href={
                                                                                                            subCategoryPath
                                                                                                        }
                                                                                                    >
                                                                                                        <span>
                                                                                                            {
                                                                                                                subCategory.title
                                                                                                            }
                                                                                                        </span>
                                                                                                    </Link>
                                                                                                </SidebarMenuSubButton>
                                                                                            </AnimateIcon>
                                                                                        </SidebarMenuSubItem>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </SidebarMenuSub>
                                                                    </CollapsibleContent>
                                                                </SidebarMenuSubItem>
                                                            </Collapsible>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                </SidebarMenu>
                            </SidebarGroup>
                        )}

                        {/* ---------------------------------------------------- */}
                        {/* Community / Explore                                 */}
                        {/* ---------------------------------------------------- */}

                        {groupIndex !== 0 && (
                            <SidebarGroup>
                                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <SidebarMenuItem key={item.label}>
                                                    <AnimateIcon animateOnHover asChild>
                                                        <SidebarMenuButton>
                                                            {Icon && <Icon />}

                                                            <span>{item.label}</span>
                                                        </SidebarMenuButton>
                                                    </AnimateIcon>

                                                    {item.badge !== undefined && (
                                                        <SidebarMenuBadge className="top-1/2 -translate-y-1/2">
                                                            {item.badge}
                                                        </SidebarMenuBadge>
                                                    )}
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )}
                    </React.Fragment>
                ))}
            </SidebarContent>

            {/* ---------------------------------------------------------------- */}
            {/* Footer                                                           */}
            {/* ---------------------------------------------------------------- */}

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium">
                                {user.displayName.slice(0, 2).toUpperCase()}
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.displayName}</span>

                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
