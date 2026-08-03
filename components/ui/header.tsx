'use client'


import Link from "next/link";
import Search from "@/components/ui/search";
import {ThemeTogglerButton} from "@/components/animate-ui/components/buttons/theme-toggler";
import {Github} from "@/components/icons/github";
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {User} from '@/components/animate-ui/icons/user'
import Image from "next/image";

const IDLE_DELAY = 1200 // ms không scroll thì mới ẩn
const TOP_THRESHOLD = 10 // px, coi như đang ở đầu trang
export default function Header() {
    const [hidden, setHidden] = useState(false)
    const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            const atTop = window.scrollY <= TOP_THRESHOLD

            // Đang scroll (hoặc ở top) -> luôn hiện header
            setHidden(false)

            if (idleTimer.current) clearTimeout(idleTimer.current)

            // Nếu không ở top, hẹn giờ ẩn header sau khi ngừng scroll
            if (!atTop) {
                idleTimer.current = setTimeout(() => {
                    setHidden(true)
                }, IDLE_DELAY)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (idleTimer.current) clearTimeout(idleTimer.current)
        }
    }, [])


  return (
      <motion.header className="fixed top-0 left-0 right-0 h-[82px] bg-primary dark:bg-primary border-b border-input dark:border-input  z-10 flex items-center justify-between px-6"
                     animate={{ y: hidden ? '-100%' : '0%' }}
                     transition={{
                         type: 'spring',
                         stiffness: 300,
                         damping: 30,
                         mass: 0.8,
                     }}
      >
        <Link href="/" className="text-[20px] font-semibold">
          <Image src={'/logo.png'} alt={'hi'} width={100} height={100} />
        </Link>

        <div className="flex items-center gap-3">
          <Search />

          <a
              href="https://github.com/Fizzisme/WebFi_FE"
              className="border-[2px] h-[25px] w-[25px] border-black  dark:border-white rounded flex items-center justify-center"
          >
            <Github className="size-5" strokeWidth={1.5} />
          </a>

          {/*{!loading &&*/}
          {/*    (user ? (*/}
          {/*        <Link href="/member/post">*/}
          {/*          <Avatar className="h-[28px] w-[28px] cursor-pointer border-2 border-black dark:border-white">*/}
          {/*            <AvatarImage src={member?.profile?.avatar} />*/}
          {/*            <AvatarFallback>{getInitials(member?.username ?? 'Guest')}</AvatarFallback>*/}
          {/*          </Avatar>*/}
          {/*        </Link>*/}
          {/*    ) : (*/}
                  <Link
                      href="/login"
                      className="border-[2px] h-[25px] w-[25px] border-black  dark:border-white rounded flex items-center justify-center"
                  >
                    <User animateOnHover className="size-5" strokeWidth={1.5} />
                  </Link>
          {/*    ))}*/}

          {/*<div className="border-[2px] border-[#000] dark:border-white rounded h-[25px] w-[25px] flex items-center justify-center cursor-pointer">*/}
          {/*  <ThemeTogglerButton />*/}
          {/*</div>*/}
            <div className="border-[2px] h-[25px] w-[25px] border-black dark:border-white rounded flex items-center justify-center cursor-pointer">
                <ThemeTogglerButton />
            </div>
        </div>
      </motion.header>
  );
};