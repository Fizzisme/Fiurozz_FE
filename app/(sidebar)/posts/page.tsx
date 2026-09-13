import Posts from '@/views/Posts';
import { postService } from '@/services/post-service';
import { PAGE_SIZE } from '@/lib/constanst';

export const metadata = {
    title: 'Posts',
    description: 'What builders on Fiurozz are working on, asking about and sharing.',
};

interface PostsPageProps {
    searchParams: Promise<{ quote?: string | string[] }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
    const { quote } = await searchParams;
    const quoteId = typeof quote === 'string' ? quote : null;

    const [page, quoted] = await Promise.all([
        postService.getPosts({ feed: 'for-you', cursor: null, limit: PAGE_SIZE }),
        quoteId ? postService.getThread(quoteId) : Promise.resolve(null),
    ]);

    return <Posts initialPage={page} initialQuote={quoted?.post ?? null} />;
}
