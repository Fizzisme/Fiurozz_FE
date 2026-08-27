'use client';

import { motion } from 'framer-motion';

type SectionNavProps = {
    count: number;
    activeIndex: number;
    onSelect?: (index: number) => void;
    className?: string;
};

const SEGMENT_HEIGHT = 28; // px — chiều cao mỗi đoạn chia trên thanh liền

export default function SectionNav({ count, activeIndex, onSelect, className }: SectionNavProps) {
    return (
        <div
            className={`relative flex flex-col overflow-visible ${className ?? ''}`}
            style={{ height: count * SEGMENT_HEIGHT, width: 16 }}
        >
            {Array.from({ length: count }).map((_, index) => {
                const isActive = index === activeIndex;

                return (
                    <button
                        key={index}
                        type="button"
                        aria-label={`Đi tới section ${index + 1}`}
                        onClick={() => onSelect?.(index)}
                        className="flex flex-1 items-center justify-end"
                        style={{ padding: 0 }}
                    >
                        {/* Nét liền — chỉ đổi độ sáng/độ dày của đoạn active, không tách rời khỏi thanh */}
                        <motion.span
                            className="block w-[1px] rounded bg-neutral-900 dark:bg-white"
                            style={{ height: SEGMENT_HEIGHT, transformOrigin: 'center' }}
                            animate={{
                                opacity: isActive ? 1 : 0.25,
                                scaleX: isActive ? 2 : 1,
                            }}
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
