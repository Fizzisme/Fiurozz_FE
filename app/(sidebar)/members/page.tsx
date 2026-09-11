import Members from '@/views/Members';
import { memberService } from '@/services/member-service';
import { PAGE_SIZE } from '@/lib/constanst';

export const metadata = {
    title: 'Members',
    description: 'Find other builders on Fiurozz.',
};

export default async function MembersPage() {
    const { items, nextCursor, hasMore, total } = await memberService.getMembers({
        cursor: null,
        limit: PAGE_SIZE,
    });

    return (
        <Members
            initialMembers={items}
            initialCursor={nextCursor}
            initialHasMore={hasMore}
            initialTotal={total}
        />
    );
}
