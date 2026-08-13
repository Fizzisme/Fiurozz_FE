import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href={'/'}>
            <Image src="/logo/logo-light.png" alt="Fiurozz" width={80} height={80} className="block dark:hidden" />
            <Image src="/logo/logo-dark.png" alt="Fiurozz" width={80} height={80} className="hidden dark:block" />
        </Link>
    );
}
