import { Bookmark, CircleUserRound, Mail } from 'lucide-react';

import { Activity } from '@/components/animate-ui/icons/activity';

import { Bell } from '@/components/animate-ui/icons/bell';
import { User } from '@/components/animate-ui/icons/user';
import { Users } from '@/components/animate-ui/icons/users';
import { MessageSquare } from '@/components/animate-ui/icons/message-square';

type IconType = React.ComponentType<{
    className?: string;
}>;

type MenuItem = {
    label: string;
    icon?: IconType;
    badge?: number;
    href: string;
};

type MenuGroup = {
    label: string;
    items: MenuItem[];
};

/* -------------------------------------------------------------------------- */
/*                                  Main Menu                                 */
/* -------------------------------------------------------------------------- */

export const menuItems: MenuGroup[] = [
    {
        label: 'Profile',
        items: [
            {
                label: 'My Profile',
                icon: CircleUserRound,
                href: '/profile',
            },
            {
                label: 'Activity',
                icon: Activity,
                href: '/profile/activity',
            },
            {
                label: 'Saved',
                icon: Bookmark,
                href: '/profile/saved',
            },
        ],
    },

    {
        label: 'Community',
        items: [
            {
                label: 'Notifications',
                icon: Bell,
                badge: 5,
                href: '/notifications',
            },
            {
                label: 'Messages',
                icon: MessageSquare,
                badge: 2,
                href: '/messages',
            },
            {
                label: 'Followers',
                icon: Users,
                href: '/followers',
            },
            {
                label: 'Following',
                icon: User,
                href: '/following',
            },
        ],
    },

    {
        label: 'Explore',
        items: [
            {
                label: 'Members',
                icon: Users,
                href: '/members',
            },
            {
                label: 'Posts',
                icon: MessageSquare,
                href: '/posts',
            },
            {
                label: 'Contact Us',
                icon: Mail,
                href: '/contact',
            },
        ],
    },
];
