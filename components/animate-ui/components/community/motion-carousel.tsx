'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, type Transition } from 'motion/react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight } from 'lucide-react'

type PropType = {
    slides: React.ReactNode[]
    options?: EmblaOptionsType
    cardHeight?: string
}

const transition: Transition = {
    type: 'spring',
    stiffness: 240,
    damping: 24,
    mass: 1,
}

const useEmblaSelectedIndex = (api: EmblaCarouselType | undefined) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        const update = () => setSelectedIndex(api.selectedScrollSnap())

        update()
        api.on('select', update)
        api.on('reInit', update)
    }, [api])

    return selectedIndex
}

export default function MotionCarousel({
                                           slides,
                                           options,
                                           cardHeight = '350px',
                                       }: PropType) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const selectedIndex = useEmblaSelectedIndex(emblaApi)

    return (
        <div className="w-full space-y-4">
            {/* CAROUSEL */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-4">
                    {slides.map((slide, i) => {
                        const isActive = i === selectedIndex
                        return (
                            <motion.div
                                key={i}
                                className="flex-none w-[100%] min-[450px]:w-[70%] sm:w-[48%] md:w-[32%] lg:w-[25%] "
                                style={{ height: cardHeight }}
                            >
                                <motion.div
                                    className="h-full w-full "
                                    animate={{ scale: isActive ? 1 : 0.92 }}
                                    transition={transition}
                                >
                                    {slide}
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* SEE MORE */}
            <div className="flex items-center justify-end">
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide text-primary transition-colors hover:text-primary/80"
                >
                    See more
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}