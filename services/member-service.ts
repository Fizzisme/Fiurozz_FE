import type { GetMembersCursorParams, Member, MembersCursorPage } from '@/mock-data/members';
import {
    getMemberByUsernameAction,
    getMembersCursorPageAction,
    setMemberFollowAction,
    type FollowResult,
} from '@/actions/members-action';

export const memberService = {

    async getMembers(params: GetMembersCursorParams = {}): Promise<MembersCursorPage> {
        return getMembersCursorPageAction(params);
    },

    async getMemberByUsername(username: string): Promise<Member | null> {
        return getMemberByUsernameAction(username);
    },

    async setFollow(username: string, follow: boolean): Promise<FollowResult> {
        return setMemberFollowAction(username, follow);
    },
};
