import Link from 'next/link';
import Fiurozz from '@/components/icons/logo';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string; classNameFiurozz?: string }) {
    return (
        <Link
            href={'/home'}
            className={cn('w-12 h-12 md:w-15 md:h-15 overflow-hidden bg-white dark:bg-primary', className)}
        >
            <Fiurozz />
        </Link>
    );
}
