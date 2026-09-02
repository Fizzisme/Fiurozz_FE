import StarField from '@/components/ui/global/start-field';
import ShootingStars from '@/components/ui/global/shooting-start';
import { Star } from '@/lib/utils';

export default function BackgroundSpace({ smallStars, bigStars }: { smallStars: Star[]; bigStars: Star[] }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* =========================================================
                DARK MODE
            ========================================================= */}

            {/* Main central atmosphere */}
            <div
                className="
                    absolute left-1/2 top-[5%]
                    h-[600px] w-[900px]
                    -translate-x-1/2 rounded-full
                    bg-transparent
                    blur-3xl
                    dark:bg-[#361B46]/50
                "
            />

            {/* Warm atmosphere */}
            <div
                className="
                    absolute left-[-80px] top-[25%]
                    h-[420px] w-[420px]
                    rounded-full
                    bg-transparent
                    blur-3xl
                    animate-[float_12s_ease-in-out_infinite]
                    dark:bg-[#482928]/40
                "
            />

            {/* Right atmosphere */}
            <div
                className="
                    absolute right-[-100px] top-[10%]
                    h-[500px] w-[500px]
                    rounded-full
                    bg-transparent
                    blur-3xl
                    animate-[float_15s_ease-in-out_infinite_reverse]
                    dark:bg-[#361B46]/55
                "
            />

            {/* Bottom transition */}
            <div
                className="
                    absolute bottom-[-200px] left-1/2
                    h-[500px] w-[900px]
                    -translate-x-1/2 rounded-full
                    bg-transparent
                    blur-3xl
                    dark:bg-[#26182D]/80
                "
            />

            {/* Stars - DARK ONLY */}
            <div className="dark:block hidden">
                <StarField smallStars={smallStars} bigStars={bigStars} />
                <ShootingStars />
            </div>

            {/* =========================================================
                LIGHT MODE
            ========================================================= */}

            {/* Pure white base */}
            <div className="absolute inset-0 bg-transparent" />

            {/* Very subtle edge glow */}
            <div
                className="
                    absolute -left-48 top-40
                    h-[420px] w-[420px]
                    rounded-full
                    bg-purple-100/20
                    blur-3xl
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute -right-48 bottom-[-40px]
                    h-[420px] w-[420px]
                    rounded-full
                    bg-sky-100/20
                    blur-3xl
                    dark:bg-transparent
                "
            />

            {/* Left dotted grid */}
            <div
                className="
                    absolute left-[8%] top-[8%]
                    h-28 w-40
                    opacity-25
                    dark:opacity-0
                "
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.22) 1.3px, transparent 1.3px)',
                    backgroundSize: '18px 18px',
                }}
            />

            {/* Right dotted grid */}
            <div
                className="
                    absolute right-[10%] bottom-[8%]
                    h-28 w-40
                    opacity-20
                    dark:opacity-0
                "
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.20) 1.3px, transparent 1.3px)',
                    backgroundSize: '18px 18px',
                }}
            />

            {/* Top-right subtle orbit */}
            <div
                className="
                    absolute -right-28 -top-24
                    h-[390px] w-[390px]
                    rounded-full
                    border border-indigo-200/25
                    dark:border-transparent
                "
            />

            <div
                className="
                    absolute -right-16 -top-12
                    h-[330px] w-[330px]
                    rounded-full
                    border border-indigo-200/18
                    dark:border-transparent
                "
            />

            <div
                className="
                    absolute right-[-2px] top-0
                    h-[270px] w-[270px]
                    rounded-full
                    border border-indigo-200/12
                    dark:border-transparent
                "
            />

            {/* Bottom-left subtle orbit */}
            <div
                className="
                    absolute -left-36 bottom-[-190px]
                    h-[500px] w-[500px]
                    rounded-full
                    border border-indigo-200/20
                    dark:border-transparent
                "
            />

            <div
                className="
                    absolute -left-20 bottom-[-160px]
                    h-[420px] w-[420px]
                    rounded-full
                    border border-indigo-200/14
                    dark:border-transparent
                "
            />

            <div
                className="
                    absolute left-[-5px] bottom-[-125px]
                    h-[340px] w-[340px]
                    rounded-full
                    border border-indigo-200/10
                    dark:border-transparent
                "
            />

            {/* Very subtle floating circles */}
            <div
                className="
                    absolute left-[24%] top-[16%]
                    h-8 w-8 rounded-full
                    bg-sky-200/25
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute right-[17%] top-[38%]
                    h-3 w-3 rounded-full
                    bg-cyan-300/35
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute left-[31%] bottom-[8%]
                    h-9 w-9 rounded-full
                    bg-sky-100/30
                    blur-sm
                    dark:bg-transparent
                "
            />

            {/* Outline circles */}
            <div
                className="
                    absolute right-[24%] top-[16%]
                    h-12 w-12 rounded-full
                    border border-slate-200/60
                    dark:border-transparent
                "
            />

            <div
                className="
                    absolute left-[20%] bottom-[14%]
                    h-12 w-12 rounded-full
                    border border-slate-200/45
                    dark:border-transparent
                "
            />

            {/* Tiny decorative dots */}
            <div
                className="
                    absolute left-[17%] top-[36%]
                    h-2 w-2 rounded-full
                    bg-indigo-200/40
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute right-[18%] top-[47%]
                    h-2 w-2 rounded-full
                    bg-sky-200/45
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute left-[28%] top-[65%]
                    h-1.5 w-1.5 rounded-full
                    bg-indigo-200/35
                    dark:bg-transparent
                "
            />

            <div
                className="
                    absolute right-[31%] bottom-[27%]
                    h-1.5 w-1.5 rounded-full
                    bg-cyan-200/40
                    dark:bg-transparent
                "
            />
            {/* Soft atmospheric blue/purple glows */}
            <div
                className="
        absolute
        -left-[220px] top-[18%]
        h-[520px] w-[520px]
        rounded-full
        bg-gradient-to-br
        from-purple-200/30
        via-indigo-100/15
        to-transparent
        blur-3xl
        dark:opacity-0
    "
            />

            <div
                className="
        absolute
        -right-[220px] top-[32%]
        h-[560px] w-[560px]
        rounded-full
        bg-gradient-to-bl
        from-sky-200/35
        via-blue-100/18
        to-transparent
        blur-3xl
        dark:opacity-0
    "
            />

            <div
                className="
        absolute
        left-[28%] -top-[260px]
        h-[500px] w-[700px]
        rounded-full
        bg-sky-100/15
        blur-3xl
        dark:opacity-0
    "
            />

            <div
                className="
        absolute
        left-[25%] -bottom-[280px]
        h-[500px] w-[800px]
        rounded-full
        bg-gradient-to-t
        from-indigo-100/20
        via-sky-100/10
        to-transparent
        blur-3xl
        dark:opacity-0
    "
            />
        </div>
    );
}
