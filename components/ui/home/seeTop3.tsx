'use client';

import MemberOfYear from '@/components/ui/home/memberOfYear';

export default function SeeTop3() {
    return (
        <section
            aria-labelledby="see-top-3-heading"
            className="relative flex h-full w-full flex-col items-center px-6 pt-4 md:px-10 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                {/* -------------------------------------------
                    SECTION HEADER
                ------------------------------------------- */}
                <div className="mb-6 max-w-2xl">
                    {/* Eyebrow */}
                    <div className="mb-2 flex items-center gap-3">
                        <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />

                        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-primary">
                            TOP MEMBERS
                        </span>

                        <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
                            &middot; N&deg; 05
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="see-top-3-heading"
                        className="text-2xl font-black leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl"
                    >
                        Top 3 members in <span className="font-serif italic font-normal">2027.</span>
                    </h2>

                    {/* Description */}
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-sm">
                        These are the top members who made outstanding achievements this year.
                    </p>
                </div>

                {/* MemberOfYear */}
                <MemberOfYear />

                {/* Footer credit */}
                <p className="relative flex flex-wrap items-center justify-center gap-1 pb-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    Built by
                    <a href="#" className="text-black underline underline-offset-2 dark:text-white">
                        Fizzisme
                    </a>
                    . The source code is available on
                    <a href="#" className="text-black underline underline-offset-2 dark:text-white">
                        Github
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
