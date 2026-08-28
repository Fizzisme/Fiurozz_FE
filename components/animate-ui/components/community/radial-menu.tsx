'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { ContextMenu } from '@base-ui/react/context-menu';
import { cn } from '@/lib/utils';

type RadialMenuProps = {
    children?: React.ReactNode;
    menuItems: MenuItem[];
    size?: number;
    iconSize?: number;
    bandWidth?: number;
    innerGap?: number;
    outerGap?: number;
    outerRingWidth?: number;
    onSelect?: (item: MenuItem) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    anchor?: React.ComponentProps<typeof ContextMenu.Positioner>['anchor'];
};

type MenuItem = {
    id: number;
    label?: string;
    icon?: LucideIcon;
    avatarUrl?: string;
};

type SlotPosition = {
    x: string;
    y: string;
};

const menuTransition: Transition = {
    type: 'spring',
    stiffness: 420,
    damping: 32,
    mass: 1,
};

/**
 * 8 vị trí cố định.
 *
 * 1   2   3
 * 4   ●   5
 * 6   7   8
 *
 * KHÔNG phụ thuộc vào số lượng menuItems.
 */
const SLOT_POSITIONS: SlotPosition[] = [
    { x: '15%', y: '15%' }, // 1
    { x: '50%', y: '15%' }, // 2
    { x: '85%', y: '15%' }, // 3

    // Middle
    { x: '15%', y: '50%' }, // 4
    { x: '85%', y: '50%' }, // 5

    // Bottom
    { x: '15%', y: '85%' }, // 6
    { x: '50%', y: '85%' }, // 7
    { x: '85%', y: '85%' }, // 8
];

function RadialMenu({
                        children,
                        menuItems,
                        size = 240,
                        iconSize = 18,
                        onSelect,
                        open: controlledOpen,
                        onOpenChange,
                        anchor,
                    }: RadialMenuProps) {
    const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    // Uncontrolled fallback
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const resetActive = () => {
        setActiveIndex(null);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledOpen(isOpen);
        }

        onOpenChange?.(isOpen);

        if (!isOpen) {
            resetActive();
        }
    };

    /**
     * Radial menu chỉ hỗ trợ tối đa 8 item.
     *
     * Không slice lại menuItems vì index phải được giữ nguyên
     * để item luôn nằm đúng slot.
     */
    const visibleItems = menuItems.slice(0, 8);

    return (
        <ContextMenu.Root
            open={open}
            onOpenChange={handleOpenChange}
        >
            <ContextMenu.Trigger
                render={(triggerProps) => {
                    return (
                        <div
                            {...triggerProps}
                            className={cn(
                                'select-none outline-none',
                                triggerProps.className,
                            )}
                        >
                            {children ? (
                                children
                            ) : (
                                <div className="size-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                                    Right-click here.
                                </div>
                            )}
                        </div>
                    );
                }}
            />

            <AnimatePresence>
                {open && (
                    <ContextMenu.Portal keepMounted>
                        <ContextMenu.Positioner
                            anchor={anchor}
                            align="center"
                            sideOffset={({ positioner }) =>
                                -positioner.height / 2
                            }
                            className="outline-none z-[9999]"
                        >
                            <ContextMenu.Popup
                                style={{
                                    width: size,
                                    height: size,
                                }}
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-[10px]
                                    border
                                    border-neutral-200
                                    bg-white
                                    shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                                    outline-none
                                    dark:border-neutral-800
                                    dark:bg-neutral-950
                                    dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                                "
                                render={
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.5,
                                        }}
                                        transition={menuTransition}
                                    />
                                }
                            >
                                {/* =========================
                                    8 FIXED MENU SLOTS
                                   ========================= */}

                                {visibleItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const position =
                                        SLOT_POSITIONS[index];

                                    const isActive =
                                        activeIndex === index;

                                    return (
                                        <div
                                            key={item.id}
                                            className="absolute"
                                            style={{
                                                left: position.x,
                                                top: position.y,
                                                transform:
                                                    'translate(-50%, -50%)',
                                            }}
                                        >
                                            <ContextMenu.Item
                                                ref={(el) => {
                                                    itemRefs.current[index] =
                                                        el as HTMLElement | null;
                                                }}
                                                onFocus={() =>
                                                    setActiveIndex(index)
                                                }
                                                onMouseEnter={() =>
                                                    setActiveIndex(index)
                                                }
                                                onMouseLeave={() =>
                                                    setActiveIndex(null)
                                                }
                                                onClick={() => {
                                                    onSelect?.(item);
                                                }}
                                                aria-label={item.label}
                                                className={cn(
                                                    `
                                                    flex
                                                    flex-col
                                                    size-11
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    outline-none
                                                    transition-all
                                                    duration-150
                                                    text-neutral-500
                                                    dark:text-neutral-400
                                                    `,
                                                    `
                                                    hover:bg-neutral-100
                                                    hover:text-neutral-900
                                                    dark:hover:bg-neutral-900
                                                    dark:hover:text-neutral-50
                                                    `,
                                                    {
                                                        'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50':
                                                        isActive,
                                                    },
                                                )}
                                            >
                                                {item.avatarUrl ? (
                                                    <img
                                                        src={item.avatarUrl}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                        className="rounded object-cover"
                                                        draggable={false}
                                                    />
                                                ) : Icon ? (
                                                    <Icon
                                                        style={{
                                                            width: iconSize,
                                                            height: iconSize,
                                                        }}
                                                        strokeWidth={1.8}
                                                    />
                                                ) : null}
                                                <span className="max-w-[70px] truncate text-[10px] font-medium leading-none">
        {item.label}
    </span>
                                            </ContextMenu.Item>
                                        </div>
                                    );
                                })}

                                {/* =========================
                                    CENTER CIRCLE
                                   ========================= */}

                                <div
                                    className="
                                        absolute
                                        left-1/2
                                        top-1/2
                                        flex
                                        items-center
                                        justify-center
                                        -translate-x-1/2
                                        -translate-y-1/2
                                        rounded-full
                                        border
                                        border-neutral-200
                                        bg-white
                                        dark:border-neutral-800
                                        dark:bg-neutral-950
                                    "
                                    style={{
                                        width: size * 0.32,
                                        height: size * 0.32,
                                    }}
                                >
                                    <div
                                        className="
                                            size-2
                                            rounded-full
                                            border
                                            border-neutral-400
                                            dark:border-neutral-600
                                        "
                                    />
                                </div>
                            </ContextMenu.Popup>
                        </ContextMenu.Positioner>
                    </ContextMenu.Portal>
                )}
            </AnimatePresence>
        </ContextMenu.Root>
    );
}

export { RadialMenu };