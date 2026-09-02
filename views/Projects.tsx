'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {  type Project } from '@/mock-data/projects';
import ProjectCardSkeleton from '@/components/ui/project/project-card-skeleton';
import ProjectCard from '@/components/ui/project/project-card';
import { getSpanClassName } from '@/lib/utils';
import { PAGE_SIZE } from '@/lib/constanst';
import { projectService } from '@/services/project-service';



interface ProjectsGridProps {
    categorySlug?: string | null;
    subCategorySlug?: string | null;
    initialProjects: Project[];
    initialCursor: string | null;
    initialHasMore: boolean;
}

export default function ProjectsGrid({
                                         categorySlug = null,
                                         subCategorySlug = null,
                                         initialProjects,
                                         initialCursor,
                                         initialHasMore,
                                     }: ProjectsGridProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const isFetchingRef = useRef(false);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || !hasMore) return;
        isFetchingRef.current = true;
        setIsLoadingMore(true);

        const result = await projectService.getProjects({
            cursor,
            limit: PAGE_SIZE,
            categorySlug,
            subCategorySlug,
        });

        setProjects((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = result.items.filter((item) => !existingIds.has(item.id));
            return [...prev, ...newItems];
        });

        setCursor(result.nextCursor);
        setHasMore(result.hasMore);
        setIsLoadingMore(false);
        isFetchingRef.current = false;
    }, [cursor, hasMore, categorySlug, subCategorySlug]);

    useEffect(() => {
        if (!hasMore) return;

        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: '600px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, loadMore]);

    return (
        <div className="projects-grid-container">
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} className={getSpanClassName(index)} />
                ))}

                {isLoadingMore &&
                    Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <ProjectCardSkeleton
                            key={`more-skeleton-${i}`}
                            className={getSpanClassName(projects.length + i)}
                        />
                    ))}
            </div>

            {projects.length === 0 && (
                <p className="py-16 text-center text-sm text-neutral-500">
                    No projects found in this category.
                </p>
            )}

            {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />}
        </div>
    );
}