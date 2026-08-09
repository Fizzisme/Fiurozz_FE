import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href={'/'}>
            <Image src="/logo/logo-light.png" alt="Fiurozz" width={100} height={100} className="block dark:hidden" />
            <Image src="/logo/logo-dark.png" alt="Fiurozz" width={90} height={90} className="hidden dark:block" />
        </Link>
    );
}
