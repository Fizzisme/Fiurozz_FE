import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type PlateVariant = 'default' | 'ink' | 'large';

const PLATE_BASE =
    'group inline-flex items-center gap-[0.85em] rounded-[1px] border font-ctr-sans font-medium uppercase tracking-[0.14em] no-underline transition-[transform,box-shadow,background-color] duration-500 [transition-timing-function:var(--ease-ctr)] active:translate-y-0';

const PLATE_VARIANT: Record<PlateVariant, string> = {
    default:
        'bg-ctr-ink border-ctr-ink text-ctr-paper px-[1.5em] pt-[0.82em] pb-[0.86em] text-[clamp(0.82rem,0.95vw,0.95rem)] shadow-[inset_0_1px_0_rgba(242,236,223,0.16),0_8px_20px_-14px_rgba(43,58,74,0.85)] hover:-translate-y-0.5 hover:bg-[#22303E] hover:shadow-[inset_0_1px_0_rgba(242,236,223,0.2),0_16px_28px_-16px_rgba(43,58,74,0.9)]',
    ink: 'bg-[#9C4C34] border-[#7E3D29] text-ctr-paper px-[1.5em] pt-[0.82em] pb-[0.86em] text-[clamp(0.82rem,0.95vw,0.95rem)] shadow-[inset_0_1px_0_rgba(242,236,223,0.16),0_8px_20px_-14px_rgba(43,58,74,0.85)] hover:-translate-y-0.5 hover:bg-[#8A422D] hover:shadow-[inset_0_1px_0_rgba(242,236,223,0.2),0_16px_28px_-16px_rgba(43,58,74,0.9)] disabled:pointer-events-none disabled:opacity-60',
    large: 'bg-ctr-paper border-ctr-paper text-ctr-ink px-[2.2em] pt-[1.05em] pb-[1.1em] text-[clamp(0.86rem,1.05vw,1.02rem)] tracking-[0.2em] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:bg-[#FFFAEE]',
};

type PlateProps<T extends ElementType> = {
    as?: T;
    variant?: PlateVariant;
    className?: string;
    children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/** The atelier's call-to-action button — ports `.plate` / `.plate--*`. */
export function Plate<T extends ElementType = 'a'>({
    as,
    variant = 'default',
    className = '',
    children,
    ...rest
}: PlateProps<T>) {
    const Tag = (as ?? 'a') as ElementType;
    return (
        <Tag className={[PLATE_BASE, PLATE_VARIANT[variant], className].join(' ')} {...rest}>
            {children}
        </Tag>
    );
}

/** The nib that rides inside every `Plate` — ports `.plate__nib`. */
export function PlateNib() {
    return (
        <svg
            className="h-[1.1em] w-[1.1em] fill-none stroke-current transition-transform duration-500 [transition-timing-function:var(--ease-ctr)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:-rotate-6"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            strokeLinecap="square"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M4 20 L9 19 L20 8 L16 4 L5 15 Z" />
            <path d="M9 19 L5 15" />
            <path d="M16 4 L20 8" />
        </svg>
    );
}
