import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/animate-ui/components/radix/hover-card';
import Image from 'next/image';

interface AuthorCardProps {
    name: string;
    email?: string;
    avatar?: string;
    bio?: string;

    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    followCursor?: boolean | 'x' | 'y';
}

export default function AuthorCard({
    name,
    email,
    avatar,
    bio,

    side = 'bottom',
    sideOffset = 8,
    align = 'center',
    alignOffset = 0,
    followCursor = false,
}: AuthorCardProps) {
    const avatarUrl = avatar || '/default-avatar.png';

    return (
        <HoverCard followCursor={followCursor}>
            <HoverCardTrigger asChild>
                <button className="size-12 border rounded-full overflow-hidden hover:opacity-80 transition">
                    <Image src={avatarUrl} alt={name} width={100} height={100} className="object-cover" />
                </button>
            </HoverCardTrigger>

            <HoverCardContent
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                className="w-80"
            >
                <div className="flex flex-col gap-4">
                    <Image
                        className="size-16 rounded-full overflow-hidden border"
                        src={avatarUrl}
                        alt={name}
                        width={80}
                        height={80}
                    />

                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="font-bold text-lg">{name}</div>

                            {email && <div className="text-sm text-muted-foreground">{email}</div>}
                        </div>

                        {bio && <div className="text-sm text-muted-foreground">{bio}</div>}

                        <div className="text-xs text-muted-foreground">Project Author</div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
