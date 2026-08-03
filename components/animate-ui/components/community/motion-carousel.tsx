'use client'

import * as React from 'react'
import { motion, type Transition } from 'motion/react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/animate-ui/components/buttons/button'
import { ChevronRight, ChevronLeft } from 'lucide-react'

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  cardHeight?: string // <-- CHỈNH CHIỀU CAO TẠI ĐÂY
}

const transition: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
}

const useEmblaControls = (api: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [prevDisabled, setPrevDisabled] = React.useState(true)
  const [nextDisabled, setNextDisabled] = React.useState(true)

  const update = (embla: EmblaCarouselType) => {
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevDisabled(!embla.canScrollPrev())
    setNextDisabled(!embla.canScrollNext())
  }

  React.useEffect(() => {
    if (!api) return
    setScrollSnaps(api.scrollSnapList())
    update(api)

    api.on('select', update)
    api.on('reInit', update)
  }, [api])

  return { selectedIndex, scrollSnaps, prevDisabled, nextDisabled }
}

export default function MotionCarousel({
                                         slides,
                                         options,
                                         cardHeight = '350px',
                                       }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, prevDisabled, nextDisabled } =
      useEmblaControls(emblaApi)

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
                      className="flex-none w-[25%]"
                      style={{ height: cardHeight }}
                  >
                    <motion.div
                        className="h-full w-full"
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

        {/* CONTROLS */}
        <div className="flex items-center justify-between">
          <Button disabled={prevDisabled} size="icon" onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft className="size-5" />
          </Button>

          {/*<div className="flex gap-2">*/}
          {/*    {scrollSnaps.map((_, index) => (*/}
          {/*        <button*/}
          {/*            key={index}*/}
          {/*            onClick={() => emblaApi?.scrollTo(index)}*/}
          {/*            className={`h-3 w-3 rounded-full transition-all ${*/}
          {/*                index === selectedIndex ? 'bg-primary scale-125' : 'bg-gray-400'*/}
          {/*            }`}*/}
          {/*        />*/}
          {/*    ))}*/}
          {/*</div>*/}

          <Button disabled={nextDisabled} size="icon" onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
  )
}
