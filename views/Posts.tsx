'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { PostComposer } from '@/components/ui/post/post-composer';
import { PostItem, PostItemSkeleton } from '@/components/ui/post/post-item';
import { PAGE_SIZE } from '@/lib/constanst';
import { postService } from '@/services/post-service';
import type { Post, PostFeed, PostsCursorPage } from '@/mock-data/posts';
import { cn } from '@/lib/utils';

const FEEDS: { value: PostFeed; label: string }[] = [
    { value: 'for-you', label: 'For you' },
    { value: 'following', label: 'Following' },
];

const COMPOSER_FIELD_ID = 'posts-composer-text';

interface PostsProps {
    initialPage: PostsCursorPage;
    /** Set when the page was opened from "Quote" somewhere else (?quote=) */
    initialQuote: Post | null;
}

export default function Posts({ initialPage, initialQuote }: PostsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();

    const [feed, setFeed] = useState<PostFeed>('for-you');
    const [posts, setPosts] = useState<Post[]>(initialPage.items);
    const [cursor, setCursor] = useState<string | null>(initialPage.nextCursor);
    const [hasMore, setHasMore] = useState(initialPage.hasMore);
    const [isSwitching, setIsSwitching] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [quote, setQuote] = useState<Post | null>(initialQuote);

    const sentinelRef = useRef<HTMLDivElement>(null);
    const isFetchingRef = useRef(false);
    /** Only the newest feed request may write state — an earlier slow one must not win. */
    const requestIdRef = useRef(0);
    /** The feed the list on screen already reflects, so the server-rendered page isn't refetched. */
    const appliedFeedRef = useRef<PostFeed>('for-you');

    useEffect(() => {
        if (feed === appliedFeedRef.current) return;
        appliedFeedRef.current = feed;

        const requestId = ++requestIdRef.current;
        setIsSwitching(true);

        postService
            .getPosts({ feed, cursor: null, limit: PAGE_SIZE })
            .then((page) => {
                if (requestId !== requestIdRef.current) return;
                setPosts(page.items);
                setCursor(page.nextCursor);
                setHasMore(page.hasMore);
            })
            .catch(() => {
                // Cho phép thử lại khi quay lại đúng tab vừa lỗi.
                if (requestId === requestIdRef.current) appliedFeedRef.current = feed === 'for-you' ? 'following' : 'for-you';
            })
            .finally(() => {
                if (requestId === requestIdRef.current) setIsSwitching(false);
            });
    }, [feed]);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || !hasMore || isSwitching) return;
        isFetchingRef.current = true;
        setIsLoadingMore(true);
        const requestId = requestIdRef.current;

        try {
            const page = await postService.getPosts({ feed, cursor, limit: PAGE_SIZE });
            if (requestId !== requestIdRef.current) return;
            setPosts((current) => [...current, ...page.items.filter((item) => !current.some((p) => p.id === item.id))]);
            setCursor(page.nextCursor);
            setHasMore(page.hasMore);
        } finally {
            isFetchingRef.current = false;
            setIsLoadingMore(false);
        }
    }, [cursor, feed, hasMore, isSwitching]);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) void loadMore();
            },
            { rootMargin: '600px 0px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, loadMore]);

    const clearQuote = () => {
        setQuote(null);
        if (initialQuote) router.replace(pathname, { scroll: false });
    };

    const startQuote = (post: Post) => {
        setQuote(post);
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        document.getElementById(COMPOSER_FIELD_ID)?.focus({ preventScroll: true });
    };

    const handlePosted = (post: Post) => {
        setPosts((current) => [post, ...current]);
    };

    const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const index = FEEDS.findIndex((item) => item.value === feed);
        const next = FEEDS[(index + (event.key === 'ArrowRight' ? 1 : FEEDS.length - 1)) % FEEDS.length];
        setFeed(next.value);
        document.getElementById(`posts-tab-${next.value}`)?.focus();
    };

    return (
        <div className="w-full px-4 pb-10 sm:px-8">
            <div className="mx-auto w-full max-w-[640px]">
                <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <h1 className="text-2xl font-semibold tracking-[-0.02em]">Posts</h1>
                </header>

                <div role="tablist" aria-label="Feed" className="grid grid-cols-2 border-b border-border">
                    {FEEDS.map((item) => {
                        const selected = feed === item.value;
                        return (
                            <button
                                key={item.value}
                                id={`posts-tab-${item.value}`}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                aria-controls="posts-feed"
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setFeed(item.value)}
                                onKeyDown={onTabKeyDown}
                                className={cn(
                                    'relative h-11 cursor-pointer text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset',
                                    selected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                {item.label}
                                {selected && (
                                    <motion.span
                                        layoutId="posts-tab-marker"
                                        transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <PostComposer
                    textareaId={COMPOSER_FIELD_ID}
                    quote={quote}
                    onClearQuote={clearQuote}
                    onPosted={handlePosted}
                    autoFocus={!!initialQuote}
                    className="border-b border-border"
                />

                <div id="posts-feed" role="tabpanel" aria-labelledby={`posts-tab-${feed}`} aria-busy={isSwitching}>
                    {isSwitching ? (
                        <div className="divide-y divide-border">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <PostItemSkeleton key={index} />
                            ))}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="py-16 text-center">
                            {feed === 'following' ? (
                                <>
                                    <p className="text-sm font-medium">Nothing from people you follow yet.</p>
                                    <p className="mt-1.5 text-sm text-muted-foreground">
                                        Follow builders whose work you like and their posts show up here.
                                    </p>
                                    <Link
                                        href="/members"
                                        className="mt-4 inline-block rounded text-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    >
                                        Find people to follow
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm font-medium">No posts yet.</p>
                                    <p className="mt-1.5 text-sm text-muted-foreground">
                                        Be the first to share what you’re building.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <ul className="divide-y divide-border">
                            <AnimatePresence initial={false}>
                                {posts.map((post) => (
                                    <motion.li
                                        key={post.id}
                                        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <PostItem post={post} onQuote={startQuote} />
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                            {isLoadingMore &&
                                Array.from({ length: 2 }).map((_, index) => (
                                    <li key={`more-${index}`}>
                                        <PostItemSkeleton />
                                    </li>
                                ))}
                        </ul>
                    )}

                    {hasMore && !isSwitching && <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />}
                    {!hasMore && !isSwitching && posts.length > 0 && (
                        <p className="border-t border-border py-8 text-center text-xs text-muted-foreground">You’re all caught up.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
