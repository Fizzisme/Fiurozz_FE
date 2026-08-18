import Link from 'next/link';
import Fiurozz from '@/components/icons/logo';

export default function Logo() {
    return (
        <Link href={'/home'} className="w-12 h-12 md:w-15 md:h-15 overflow-hidden bg-white dark:bg-primary">
            <Fiurozz height={60} width={60} />
        </Link>
    );
}
