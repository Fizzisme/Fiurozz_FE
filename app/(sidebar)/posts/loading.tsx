import { Skeleton } from '@/components/ui/global/skeleton';
import { PostItemSkeleton } from '@/components/ui/post/post-item';
import { PAGE_SIZE } from '@/lib/constanst';

const FEEDS = ['For you', 'Following'];

/**
 * Must mirror every band of views/Posts.tsx — title bar, tabs, composer —
 * not just the feed list, so the page doesn't jump when the real view
 * takes over.
 */
export default function PostsLoading() {
    return (
        <div className="w-full px-4 pb-10 sm:px-8">
            <div className="mx-auto w-full max-w-[640px]">
                <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <h1 className="text-2xl font-semibold tracking-[-0.02em]">Posts</h1>
                </header>

                <div aria-hidden="true" className="grid grid-cols-2 border-b border-border">
                    {FEEDS.map((label) => (
                        <span
                            key={label}
                            className="flex h-11 items-center justify-center text-sm font-medium text-muted-foreground"
                        >
                            {label}
                        </span>
                    ))}
                </div>

                {/* COMPOSER — real content needs the signed-in user, so this stays generic */}
                <div aria-hidden="true" className="flex gap-3 border-b border-border py-4">
                    <Skeleton className="size-9 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                        <Skeleton className="h-3.5 w-32" />
                        <Skeleton className="mt-3 h-3 w-2/3" />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="-ml-2 flex items-center gap-0.5">
                                <Skeleton className="size-8 rounded" />
                                <Skeleton className="size-8 rounded" />
                                <Skeleton className="size-8 rounded" />
                            </div>
                            <Skeleton className="h-8 w-16 rounded" />
                        </div>
                    </div>
                </div>

                {/* FEED — count matches the initial page's own limit */}
                <div className="divide-y divide-border">
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <PostItemSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
