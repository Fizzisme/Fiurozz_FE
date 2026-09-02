'use client';
import { Star } from '@/lib/utils';

export default function StarField({ smallStars, bigStars }: { smallStars: Star[]; bigStars: Star[] }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {smallStars.map((s) => (
                <span
                    key={`sm-${s.id}`}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}

            {bigStars.map((s) => (
                <span
                    key={`lg-${s.id}`}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        boxShadow: '0 0 6px 1px rgba(255,255,255,0.8)',
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
