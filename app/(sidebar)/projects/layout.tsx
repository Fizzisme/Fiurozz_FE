'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/global/breadcrumb';
import { projectCategories } from '@/mock-data/projects';

interface ProjectsLayoutProps {
    children: React.ReactNode;
}

interface BreadcrumbItemData {
    label: string;
    /** No href = this is the current page (rendered as BreadcrumbPage) */
    href?: string;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
    const pathname = usePathname();

    // "/projects/e-commerce/online-store" -> ["e-commerce", "online-store"]
    const segments = pathname
        .replace(/^\/projects\/?/, '')
        .split('/')
        .filter(Boolean);

    const [categorySlug, subCategorySlug] = segments;

    const category = categorySlug ? projectCategories.find((c) => c.slug === categorySlug) : undefined;

    const subCategory =
        category && subCategorySlug ? category.subCategories.find((s) => s.slug === subCategorySlug) : undefined;

    const categoryBreadCrumb = category?.title;
    const subBreadCrumb = subCategory?.title;

    // The last item is always the current page -> no href (BreadcrumbPage)
    const items: BreadcrumbItemData[] = [{ label: "Community's projects", href: '/projects' }];

    if (categoryBreadCrumb) {
        items.push({
            label: categoryBreadCrumb,
            // If a sub-category follows -> category stays a link to go back
            // If category is the last item -> no href (it's the current page)
            href: subBreadCrumb ? `/projects/${categorySlug}` : undefined,
        });
    }

    if (subBreadCrumb) {
        items.push({ label: subBreadCrumb });
    }

    return (
        <div className="w-full px-4 sm:px-8 md:pl-8 md:pr-4 lg:pl-12 lg:pr-6 pb-6">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;
                            const isCurrent = isLast || !item.href;

                            return (
                                <React.Fragment key={item.label}>
                                    <BreadcrumbItem className={index === 0 ? 'hidden md:block' : undefined}>
                                        {isCurrent ? (
                                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            {children}
        </div>
    );
}
