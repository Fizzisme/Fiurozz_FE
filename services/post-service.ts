import type {
    CreatePostInput,
    GetPostsCursorParams,
    PostInteraction,
    PostProject,
    PostsCursorPage,
    PostThread,
    PostViewerState,
} from '@/mock-data/posts';
import {
    createPostAction,
    getPostThreadAction,
    getPostsCursorPageAction,
    searchPostProjectsAction,
    setPostViewerStateAction,
    type CreatePostResult,
} from '@/actions/posts-action';

export const postService = {

    async getPosts(params: GetPostsCursorParams = {}): Promise<PostsCursorPage> {
        return getPostsCursorPageAction(params);
    },

    async getThread(postId: string): Promise<PostThread | null> {
        return getPostThreadAction(postId);
    },

    async create(input: CreatePostInput): Promise<CreatePostResult> {
        return createPostAction(input);
    },

    async setViewerState(postId: string, key: keyof PostViewerState, value: boolean): Promise<PostInteraction | null> {
        return setPostViewerStateAction(postId, key, value);
    },

    async searchProjects(q: string): Promise<PostProject[]> {
        return searchPostProjectsAction(q);
    },
};
