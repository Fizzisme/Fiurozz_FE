'use client'

import * as React from 'react'

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuAction,
} from '@/components/animate-ui/components/radix/sidebar'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu'
import {
    AudioWaveform,
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    Command,
    CreditCard,
    Folder,
    Forward,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings2,
    Sparkles,
    SquareTerminal,
    Trash2,
    ShoppingCart,
    Users,
    GraduationCap,
    HeartPulse,
    PlayCircle,
    Code,
    BrainCog,
    PlusCircle,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getInitials } from '@/lib/utils'

// import { IMember } from '@/service/member'
// import { logoutMember } from '@/app/(main)/(Auth)/action'
// import { IProjectCategory } from '@/app/(main)/projects/layout'
// interface SideBarProps {
//     member: IMember | null
//     projectCategories: IProjectCategory[]
// }
const DATA = {
    user: {
        name: 'Fizzisme',
        email: 'nguyenletuanphi910.2019@gmail.com',
        avatar: 'https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'History',
                    url: '#',
                },
                {
                    title: 'Starred',
                    url: '#',
                },
                {
                    title: 'Settings',
                    url: '#',
                },
            ],
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#',
                },
                {
                    title: 'Explorer',
                    url: '#',
                },
                {
                    title: 'Quantum',
                    url: '#',
                },
            ],
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
                {
                    title: 'Get Started',
                    url: '#',
                },
                {
                    title: 'Tutorials',
                    url: '#',
                },
                {
                    title: 'Changelog',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ],

    projectCategories: [
        {
            title: 'E-commerce',
            url: '#',
            icon: ShoppingCart,
            items: [
                { title: 'Online Store', url: '/projects/online-store' },
                { title: 'Marketplace', url: '/projects/market-place' },
                { title: 'Booking System', url: '/projects/booking-system' },
                { title: 'Subscription Service', url: '/projects/subscription-service' },
            ],
        },
        {
            title: 'Community & Social',
            url: '#',
            icon: Users,
            items: [
                { title: 'Forum', url: '/projects/forum' },

                { title: 'Chat Application', url: '/projects/chat-application' },
                { title: 'Social Network', url: '/projects/social-network' },
            ],
        },
        {
            title: 'Education',
            url: '#',
            icon: GraduationCap,
            items: [
                { title: 'E-learning Platform', url: '/projects/elearning-platform' },
                { title: 'Online Courses', url: '/projects/online-courses' },
                { title: 'Quiz System', url: '/projects/quiz-system' },
                { title: 'Student Management', url: '/projects/student-management' },
            ],
        },
        {
            title: 'Finance & Fintech',
            url: '#',
            icon: CreditCard,
            items: [
                { title: 'Expense Tracker', url: '/projects/expense-tracker' },
                { title: 'Payment System', url: '/projects/payment-system' },
                { title: 'Crypto Dashboard', url: '/projects/crypto-dashboard' },
                { title: 'Invoice & Billing', url: '/projects/invoice-and-billing' },
            ],
        },
        {
            title: 'Healthcare & Lifestyle',
            url: '#',
            icon: HeartPulse,
            items: [
                { title: 'Appointment Booking', url: '/projects/appointment-booking' },
                { title: 'Fitness Tracker', url: '/projects/fitness-tracker' },
                { title: 'Health Records', url: '/projects/health-records' },
                { title: 'Mental Health App', url: '/projects/mental-health-app' },
            ],
        },

        {
            title: 'Entertainment & Media',
            url: '#',
            icon: PlayCircle,
            items: [
                { title: 'Streaming Platform', url: '/projects/streaming-platform' },
                { title: 'Music Player', url: '/projects/music-music' },
                { title: 'Mini Games', url: '/projects/mini-games' },
                { title: 'Podcast Platform', url: '/projects/podcast' },
            ],
        },
        {
            title: 'AI & Data',
            url: '#',
            icon: BrainCog,
            items: [
                { title: 'AI Chatbot', url: '/projects/ai-chatbot' },
                { title: 'Recommendation System', url: '/projects/recommendation-system' },
                { title: 'Data Visualization', url: '/projects/data-visualization' },
                { title: 'AI SaaS Tool', url: '/projects/ai-saas-tool' },
            ],
        },
        {
            title: 'Developer Tools',
            url: '#',
            icon: Code,
            items: [
                { title: 'Component Library', url: '/projects/component-library' },
                { title: 'API Platform', url: '/projects/api-platform' },
                { title: 'Code Snippet Manager', url: '/projects/code-snippet-manager' },
                { title: 'Dev Dashboard', url: '/projects/dev-dashboard' },
            ],
        },
    ],

    account: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
}


// { member, projectCategories }: SideBarProps

export const SideBar = () => {
    const isMobile = useIsMobile()
    const [activeTeam, setActiveTeam] = React.useState(DATA.teams[0])

    const pathname = usePathname()

    if (!activeTeam) return null
    // const avatarSrc = member?.profile.avatar ?? ''
    // const displayName = member?.displayName ?? 'Guest'
    // const email = member?.email ?? 'Guest'
    //
    // const handleClickLogout = async () => {
    //     return await logoutMember()
    // }
    const ICON_MAP: Record<string, React.ElementType> = {
        ShoppingCart: ShoppingCart,
        Users: Users,
        GraduationCap: GraduationCap,
        HeartPulse: HeartPulse,
        CreditCard: CreditCard,
        PlayCircle: PlayCircle,
        BrainCog: BrainCog,
        Code: Code,
        // Thêm các icon khác nếu cần...
        // Mặc định có thể dùng Folder nếu không tìm thấy
        Folder: Folder,
    }
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {/* Team Switcher */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <activeTeam.logo className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{activeTeam.name}</span>
                                        <span className="truncate text-xs">{activeTeam.plan}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side={isMobile ? 'bottom' : 'right'}
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                                {DATA.teams.map((team, index) => (
                                    <DropdownMenuItem
                                        key={team.name}
                                        onClick={() => setActiveTeam(team)}
                                        className="gap-2 p-2"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <team.logo className="size-4 shrink-0" />
                                        </div>
                                        {team.name}
                                        <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Add team</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* Team Switcher */}
            </SidebarHeader>

            <SidebarContent>
                {/* Nav Main */}
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {DATA.navMain.map(item => (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title} className="group">
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map(subItem => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                {/* Nav Main */}

                {/*Projects Categories*/}
                <SidebarGroup>
                    <SidebarGroupLabel>Projects Categories</SidebarGroupLabel>
                    <SidebarMenu>
                        {projectCategories.map(projectCategory => {
                            const IconComponent = ICON_MAP[projectCategory.icon as string] || Folder
                            const isOpen = pathname.includes(projectCategory.slug!)
                            return (
                                <Collapsible
                                    key={projectCategory._id}
                                    defaultOpen={isOpen}
                                    asChild
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={projectCategory.title} className="group">
                                                {IconComponent && <IconComponent />}
                                                <span>{projectCategory.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {projectCategory?.subCategories?.map(subItem => {
                                                    const isActive = pathname.includes(subItem.slug!)
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild isActive={isActive}>
                                                                <Link
                                                                    href={`/projects/${projectCategory.slug}/${subItem.slug}`}
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Nav Project */}
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarMenu>
                        {DATA.account.map(item => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </a>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontal />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48 rounded-lg"
                                        side={isMobile ? 'bottom' : 'right'}
                                        align={isMobile ? 'end' : 'start'}
                                    >
                                        <DropdownMenuItem>
                                            <Folder className="text-muted-foreground" />
                                            <span>View Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Forward className="text-muted-foreground" />
                                            <span>Share Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Trash2 className="text-muted-foreground" />
                                            <span>Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ))}
                        <SidebarMenuItem>
                            <SidebarMenuButton className="text-sidebar-foreground/70">
                                <MoreHorizontal className="text-sidebar-foreground/70" />
                                <span>More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                {/* Nav Project */}
            </SidebarContent>
            <SidebarFooter>
                {/* Nav User */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild disabled={!member}>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={avatarSrc} alt={displayName} />
                                        <AvatarFallback className="rounded-lg">
                                            {getInitials(member?.username ?? 'Guest')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">@{displayName}</span>
                                        <span className="truncate text-xs">{email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side={isMobile ? 'bottom' : 'right'}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={avatarSrc} alt={displayName} />
                                            <AvatarFallback className="rounded-lg">
                                                {getInitials(member?.username ?? 'Guest')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">@{displayName}</span>
                                            <span className="truncate text-xs">{email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href={'/projects/create_project'} className="flex gap-2 items-center">
                                            <PlusCircle />
                                            Create Project
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleClickLogout} className="cursor-pointer">
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* Nav User */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
