'use client';

import { useUserStore } from '@/lib/store/user-store';
import ProfileHeader from '@/components/ui/profile/profile-header';
import ProjectTabs from '@/components/ui/project-tabs';

export default function Profile() {
    const user = useUserStore((state) => state.user);
    if (!user) return null;

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
            <ProfileHeader user={user} />
            <ProjectTabs user={user} />
        </div>
    );
}
