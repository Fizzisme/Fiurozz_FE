import Link from 'next/link'

export default function Navigate() {
    return (
        <div className="flex gap-7 px-5 items-center font-semibold rounded-3xl fixed left-1/2 -translate-x-1/2 top-4 w-fit h-[50px] backdrop-blur-[10px] z-20">
            <Link
                href="/projects/e-commerce/online-store"
                className="cursor-pointer transition-colors"
            >
                Projects
            </Link>
            <p className="cursor-pointer transition-colors">Members</p>
            <p className="cursor-pointer transition-colors">Posts</p>
            <p className="cursor-pointer transition-colors">Contact Us</p>
        </div>
    )
}
