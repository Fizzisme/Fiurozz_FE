'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface Star {
    id: number;
    startXvw: number;
    startYvh: number;
    deltaXvw: number;
    deltaYvh: number;
    duration: number;
    length: number;
    angle: number;
    animating: boolean;
}

function ShootingStars() {
    const [stars, setStars] = useState<Star[]>([]);
    const idRef = useRef(0);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Tránh hydration mismatch + chỉ chạy khi đang ở dark mode
        if (!mounted || resolvedTheme !== 'dark') return;

        // Track toàn bộ timer để clear hết khi unmount, tránh setState sau khi unmount
        const timers: ReturnType<typeof setTimeout>[] = [];
        const rafIds: number[] = [];

        const spawnStar = () => {
            const id = ++idRef.current;

            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // Điểm xuất phát: ngoài mép trái - trên (đơn vị vw/vh)
            const startXvw = -15 - Math.random() * 10;
            const startYvh = -10 - Math.random() * 15;

            // Điểm kết thúc: ngoài mép phải - dưới
            const endXvw = 115 + Math.random() * 10;
            const endYvh = 110 + Math.random() * 15;

            const deltaXvw = endXvw - startXvw;
            const deltaYvh = endYvh - startYvh;

            const duration = Math.random() + 2; // 2s - 3s
            const length = Math.random() * 100 + 160; // 160px - 260px

            // Quy đổi ra pixel THẬT để tính góc chính xác
            const startXpx = (startXvw / 100) * vw;
            const startYpx = (startYvh / 100) * vh;
            const endXpx = (endXvw / 100) * vw;
            const endYpx = (endYvh / 100) * vh;

            const angle = (Math.atan2(endYpx - startYpx, endXpx - startXpx) * 180) / Math.PI;

            const newStar: Star = {
                id,
                startXvw,
                startYvh,
                deltaXvw,
                deltaYvh,
                duration,
                length,
                angle,
                animating: false,
            };

            setStars((prev) => [...prev, newStar]);

            const raf1 = requestAnimationFrame(() => {
                const raf2 = requestAnimationFrame(() => {
                    setStars((prev) => prev.map((s) => (s.id === id ? { ...s, animating: true } : s)));
                });
                rafIds.push(raf2);
            });
            rafIds.push(raf1);

            const removeTimer = setTimeout(() => {
                setStars((prev) => prev.filter((s) => s.id !== id));
            }, duration * 1000 + 100);
            timers.push(removeTimer);
        };

        const scheduleNext = () => {
            const delay = Math.random() * 8000 + 5000; // 5-13s / lần
            const t = setTimeout(() => {
                spawnStar();
                timers.push(scheduleNext());
            }, delay);
            return t;
        };

        timers.push(scheduleNext());

        return () => {
            timers.forEach(clearTimeout);
            rafIds.forEach(cancelAnimationFrame);
        };
    }, [mounted, resolvedTheme]);

    // Không render gì ở light mode / trước khi mount xong (tránh hydration mismatch)
    if (!mounted || resolvedTheme !== 'dark') return null;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="absolute"
                    style={{
                        left: `${s.startXvw}vw`,
                        top: `${s.startYvh}vh`,
                        transform: `translate3d(${s.animating ? s.deltaXvw : 0}vw, ${
                            s.animating ? s.deltaYvh : 0
                        }vh, 0) translate(-50%, -50%) rotate(${s.angle}deg)`,
                        transition: `transform ${s.duration}s linear`,
                        transformOrigin: 'center center',
                        willChange: 'transform',
                    }}
                >
                    <div
                        style={{
                            width: `${s.length}px`,
                            height: '2px',
                            background:
                                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.95) 100%)',
                            borderRadius: '999px',
                            position: 'relative',
                        }}
                    >
                        <span
                            className="absolute rounded-full"
                            style={{
                                right: '-2px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '5px',
                                height: '5px',
                                background: '#fff',
                                boxShadow:
                                    '0 0 6px 2px rgba(255,255,255,0.95), 0 0 14px 5px rgba(200,220,255,0.6), 0 0 24px 10px rgba(180,200,255,0.3)',
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShootingStars;
