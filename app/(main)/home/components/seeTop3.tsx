'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconButton } from '@/components/animate-ui/components/buttons/icon'
import { StarIcon } from 'lucide-react'
import { scroller } from 'react-scroll'
import MemberOfYear from "@/app/(main)/home/components/memberOfYear";

export default function SeeTop3() {
    const [show, setShow] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleShowTop3 = () => {
        if (!show) {
            // Mở: Scroll xuống
            setShow(true)
            setTimeout(() => {
                scroller.scrollTo('member-section', {
                    duration: 1000,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: 100,
                })
            }, 100)
        } else {
            // Đóng: Scroll lên TRƯỚC, sau đó mới unmount
            setIsClosing(true)
            scroller.scrollTo('button-section', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -600,
            })

            // Đợi scroll xong (800ms) + buffer 100ms
            setTimeout(() => {
                setShow(false)
                setIsClosing(false)
            }, 900)
        }
    }

    return (
        <div className="mt-20">
            <h2 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white border-t-2 border-dashed border-[#f2f2f3] dark:border-input pb-10 pl-2 pt-1 relative">
                Top 3 members in 2025.
                <div
                    className="absolute left-0 top-0 bottom-0 w-[35px] border-l-[2px] border-dashed border-[#f2f2f3] dark:border-input"
                    style={{ height: 'calc(100% + 35px)', top: '-35px' }}
                ></div>
                <div
                    className="absolute right-0 top-0 bottom-0 w-[35px] border-r-[2px] border-dashed border-[#f2f2f3] dark:border-input"
                    style={{ height: 'calc(100% + 35px)', top: '-35px' }}
                ></div>
                <div className="w-[35px] h-[2px] absolute top-[-1px] left-[-35px] border-t-[2px] border-dashed border-[#f2f2f3] dark:border-input"></div>
                <div className="w-[35px] h-[2px] absolute top-[-1px] right-[-35px] border-t-[2px] border-dashed border-[#f2f2f3] dark:border-input"></div>
            </h2>

            <div className="text-gray-600 dark:text-[#737373] border-[#f2f2f3] dark:border-input border-2 border-dashed pl-2 pt-1 pb-2">
                <p className="w-[40%]">These are the top members who made outstanding achievements this year.</p>
            </div>

            <div id="button-section" className="pt-5 border-b-2 border-dashed border-[#f2f2f3] dark:border-input pb-2 pl-2 relative">
                <IconButton
                    className="w-28 gap-1 cursor-pointer bg-black hover:bg-black/80 dark:bg-white"
                    onClick={handleShowTop3}
                    disabled={isClosing} // Disable button khi đang scroll
                >
                    <StarIcon /> {show ? 'Hide' : 'See top 3'}
                </IconButton>
                <div
                    className="absolute left-0 top-0 bottom-0 w-[35px] border-l-[2px] border-dashed border-[#f2f2f3] dark:border-input"
                    style={{ height: 'calc(100% + 35px)', bottom: '-35px' }}
                ></div>
                <div
                    className="absolute right-0 top-0 bottom-0 w-[35px] border-r-[2px] border-dashed border-[#f2f2f3] dark:border-input"
                    style={{ height: 'calc(100% + 35px)', bottom: '-35px' }}
                ></div>
                <div className="w-[35px] h-[2px] absolute bottom-[-2px] left-[-35px] border-t-[2px] border-dashed border-[#f2f2f3] dark:border-input"></div>
                <div className="w-[35px] h-[2px] absolute bottom-[-2px] right-[-35px] border-t-[2px] border-dashed border-[#f2f2f3] dark:border-input"></div>
            </div>

            <AnimatePresence>
                {show && (
                    <motion.div
                        id="member-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <MemberOfYear />
                        <p className="relative left-1/2 -translate-x-1/2 pt-5 pb-10 text-[#737373] inline-flex items-center justify-center gap-1 flex-wrap">
                            Built by
                            <a href="#" className="text-black dark:text-white underline underline-offset-2">
                                Fizzisme
                            </a>
                            . The source code is available on
                            <a href="#" className="text-black dark:text-white underline underline-offset-2">
                                Github
                            </a>
                            .
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
