'use server';

import { gatewayClient, ApiError } from '@/services/gateway-client';
import {
    fetchMembersCursorPage as fetchMockMembersCursorPage,
    getMemberByUsername as getMockMemberByUsername,
    setMockFollow,
    type Member,
    type MembersCursorPage,
    type GetMembersCursorParams,
} from '@/mock-data/members';

export interface FollowResult {
    isFollowing: boolean;
    followers: number;
}

const EMPTY_PAGE: MembersCursorPage = { items: [], nextCursor: null, hasMore: false, total: 0 };

export async function getMembersCursorPageAction(
    params: GetMembersCursorParams = {},
): Promise<MembersCursorPage> {
    try {
        // TODO: real url
        const envelope = await gatewayClient.get<MembersCursorPage>('/members', {
            query: {
                cursor: params.cursor ?? undefined,
                limit: params.limit,
                q: params.q ?? undefined,
                role: params.role ?? undefined,
                skill: params.skill ?? undefined,
                sort: params.sort ?? undefined,
            },
        });

        return envelope.data ?? EMPTY_PAGE;
    } catch (error) {
        if (error instanceof ApiError && error.payload) {
            const envelope = error.payload as { data?: MembersCursorPage };
            return envelope.data ?? EMPTY_PAGE;
        }

        // MockData
        return fetchMockMembersCursorPage(params);
    }
}

export async function getMemberByUsernameAction(username: string): Promise<Member | null> {
    try {
        // TODO: check real url
        const envelope = await gatewayClient.get<Member>(`/members/${username}`);
        return envelope.data ?? null;
    } catch (error) {
        if (error instanceof ApiError && error.payload) {
            const envelope = error.payload as { data?: Member | null };
            return envelope.data ?? null;
        }

        return getMockMemberByUsername(username) ?? null;
    }
}

/**
 * Follow / unfollow một member. Trả về trạng thái BE chốt lại, để client
 * đồng bộ số follower thay vì tự đoán sau khi cập nhật lạc quan.
 */
export async function setMemberFollowAction(username: string, follow: boolean): Promise<FollowResult> {
    try {
        // TODO: real url
        const path = `/members/${username}/follow`;
        const envelope = follow
            ? await gatewayClient.post<FollowResult>(path)
            : await gatewayClient.delete<FollowResult>(path);

        if (envelope.data) return envelope.data;
    } catch (error) {
        if (error instanceof ApiError && error.payload) {
            const envelope = error.payload as { data?: FollowResult };
            if (envelope.data) return envelope.data;
        }
    }

    // MockData
    const member = setMockFollow(username, follow);
    return {
        isFollowing: member?.isFollowing ?? follow,
        followers: member?.stats.followers ?? 0,
    };
}
