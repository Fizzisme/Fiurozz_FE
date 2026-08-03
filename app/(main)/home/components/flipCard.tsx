'use client'
import { useState } from 'react'
import MemberCard from "@/app/(main)/home/components/memberCard";
import ReadmePreviewer from "@/app/(main)/home/components/readmePreview";
import { cn } from '@/lib/utils';

export default function FlipCard({ emoji, color, code }: { emoji: string; color: string; code: string }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        const isInteractive = target.closest('button, a, input, textarea, select')

        if (!isInteractive) {
            setIsFlipped(!isFlipped)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`text-5xl font-bold ${color} mb-12`}>{emoji}</div>

            <div
                className="relative w-full max-w-sm cursor-pointer grid grid-cols-1"
                onClick={handleFlip}
            >
                {/* Front */}
                <div
                    className={cn(
                        'col-start-1 row-start-1 min-w-0 transition-opacity duration-300',
                        isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-400'
                    )}
                >
                    <MemberCard />
                </div>

                {/* Back */}
                <div
                    className="col-start-1 row-start-1 min-w-0 self-start"
                    style={{
                        clipPath: isFlipped ? 'circle(142% at 0% 0%)' : 'circle(0% at 0% 0%)',
                        transition: 'clip-path 700ms ease-in-out',
                    }}
                >
                    <ReadmePreviewer duration={5000} delay={0} writing={true} cursor={true} code={code} />
                </div>
            </div>
        </div>
    )
}