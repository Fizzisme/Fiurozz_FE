import { Skeleton } from '@/components/ui/global/skeleton';

interface ProjectCardSkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Mirrors ProjectCard's own bands (cover, meta, footer) rather than one flat
 * rectangle, so the grid doesn't jump when real cards swap in.
 */
export default function ProjectCardSkeleton({ className, style }: ProjectCardSkeletonProps) {
    return (
        <div
            style={style}
            aria-hidden="true"
            className={`overflow-hidden rounded bg-card ring-1 ring-foreground/10 ${className ?? ''}`}
        >
            <Skeleton className="aspect-video w-full rounded-none" />

            <div className="px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
                <div className="flex items-baseline justify-between gap-3">
                    <Skeleton className="h-5 w-2/5" />
                    <Skeleton className="h-3 w-1/5" />
                </div>

                <Skeleton className="mt-2.5 h-3.5 w-full" />
                <Skeleton className="mt-1.5 h-3.5 w-4/5" />

                <div className="mt-4 flex gap-2">
                    <Skeleton className="h-5 w-14" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-foreground/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2.5">
                    <Skeleton className="size-5 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>

                <Skeleton className="size-4 rounded-sm" />
            </div>
        </div>
    );
}
