'use client';

interface DividerProps {
    width: number;
    min: number;
    max: number;
    onResize: (next: number) => void;
}

/** Hairline drag handle between two panels. Resizes from the width at drag start. */
export default function Divider({ width, min, max, onResize }: DividerProps) {
    function handleMouseDown(event: React.MouseEvent) {
        event.preventDefault();
        const startX = event.clientX;
        const startW = width;

        const move = (e: MouseEvent) => onResize(Math.max(min, Math.min(max, startW - (e.clientX - startX))));
        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
            document.body.style.cursor = '';
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        document.body.style.cursor = 'col-resize';
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            title="Drag to resize"
            className="z-10 -ml-[3px] w-[5px] flex-none cursor-col-resize bg-transparent transition-colors duration-300 [transition-timing-function:var(--ease-ctr)] hover:bg-ctr-terracotta/25"
        />
    );
}
