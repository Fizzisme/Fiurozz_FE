'use client'

import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// 1. Tạo Context để component con biết trạng thái đóng/mở
const CollapsibleContext = React.createContext<{ isOpen: boolean }>({
    isOpen: false,
})

// 2. Viết lại Root để quản lý state và truyền vào Context
const Collapsible = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ children, open: openProp, onOpenChange, defaultOpen, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false)

    // Xử lý logic Controlled vs Uncontrolled của React
    const isControlled = openProp !== undefined
    const currentOpen = isControlled ? openProp : isOpen

    const handleOpenChange = (open: boolean) => {
        if (!isControlled) {
            setIsOpen(open)
        }
        onOpenChange?.(open)
    }

    return (
        <CollapsiblePrimitive.Root open={currentOpen} onOpenChange={handleOpenChange} ref={ref} {...props}>
            <CollapsibleContext.Provider value={{ isOpen: currentOpen }}>{children}</CollapsibleContext.Provider>
        </CollapsiblePrimitive.Root>
    )
})
Collapsible.displayName = CollapsiblePrimitive.Root.displayName

// 3. Trigger giữ nguyên
const CollapsibleTrigger = CollapsiblePrimitive.Trigger

// 4. Content sử dụng AnimatePresence và motion giống hệt Disclosure của bạn
const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(CollapsibleContext)

    return (
        <CollapsiblePrimitive.Content
            ref={ref}
            forceMount // Bắt buộc để framer-motion xử lý việc unmount
            {...props}
            asChild
        >
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        className={cn('overflow-hidden', className)}
                        initial={{ height: 0, opacity: 0, y: 10 }} // y: 10 để trượt nhẹ từ dưới lên
                        animate={{
                            height: 'auto',
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{ height: 0, opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }} // Tinh chỉnh tốc độ
                    >
                        {/* Wrapper div để tránh lỗi padding/margin ảnh hưởng chiều cao animation */}
                        <div className={cn('pb-2', className)}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CollapsiblePrimitive.Content>
    )
})
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
