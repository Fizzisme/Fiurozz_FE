'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Folder, LayoutDashboard, Trash2, Folder as ProjectIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/animate-ui/components/radix/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { projectCategories } from '@/mock-data/projects';
import { useUserStore } from '@/lib/store/user-store';

export default function SidebarProjectsGroup() {
    const pathname = usePathname();
    const user = useUserStore((state) => state.user);

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[#898781]">Projects</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {user && (
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
                    )}

                    {/* ------------------------------------------------ */}
                    {/* Categories                                      */}
                    {/* ------------------------------------------------ */}

                    <Collapsible defaultOpen={pathname.startsWith('/projects')} className="group/collapsible">
                        <SidebarMenuItem>
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
                                                    <ProjectIcon />

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

                                        // Mở sẵn nếu đang đứng trong category này (kể cả ở 1 sub-category con
                                        // hoặc sâu hơn - trang chi tiết project). Có '/' ở cuối để tránh
                                        // false-positive khi 1 category slug là tiền tố của category khác.
                                        const isOpen =
                                            pathname === categoryPath || pathname.startsWith(`${categoryPath}/`);

                                        // Active riêng cho chính trang category (không tính sub-category)
                                        const isCategoryActive = pathname === categoryPath;

                                        return (
                                            <Collapsible
                                                key={category.slug}
                                                defaultOpen={isOpen}
                                                className="group/collapsible"
                                            >
                                                <SidebarMenuItem>
                                                    {/* Category - bấm vẫn toggle mở/đóng NHƯNG đồng thời điều hướng luôn,
                                                        vì bên trong CollapsibleTrigger giờ là 1 Link thật */}
                                                    <CollapsibleTrigger asChild>
                                                        <AnimateIcon animateOnHover asChild>
                                                            <SidebarMenuButton
                                                                asChild
                                                                isActive={isCategoryActive}
                                                                className="text-[#52514e] dark:text-[#c3c2b7]"
                                                            >
                                                                <Link href={categoryPath}>
                                                                    <Icon />

                                                                    <span className="min-w-0 truncate">
                                                                        {category.title}
                                                                    </span>

                                                                    <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </AnimateIcon>
                                                    </CollapsibleTrigger>

                                                    {/* Sub Categories */}
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {category.subCategories.map((subCategory) => {
                                                                const subCategoryPath = `${categoryPath}/${subCategory.slug}`;

                                                                // === : đang đứng đúng trang sub-category
                                                                // startsWith(path + '/'): đang ở route con (vd trang
                                                                // chi tiết project) của sub-category này. Có '/' ở
                                                                // cuối để tránh false-positive khi 1 slug là tiền tố
                                                                // của slug khác.
                                                                const isActive =
                                                                    pathname === subCategoryPath ||
                                                                    pathname.startsWith(`${subCategoryPath}/`);

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
    );
}
