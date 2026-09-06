'use client';

import { motion } from 'framer-motion';
import { CloudUpload } from '@/components/animate-ui/icons/cloud-upload';
import { Users } from '@/components/animate-ui/icons/users';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { Compass } from '@/components/animate-ui/icons/compass';
import HeroHeading from '@/components/ui/home/hero-heading';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import { Eye, CodeXml } from 'lucide-react';
import { CodeBlock, CodeHeader, Code } from '@/components/animate-ui/components/animate/code';
import Image from 'next/image';
import ReactECharts from 'echarts-for-react';
import { Transition } from 'motion/react';
import Link from 'next/link';
import CatronautCoding from '@/components/ui/catronaut/coding';

type DescriptionProps = {
    isLeaving?: boolean;
};

const leftVariants = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
    leaving: {
        x: '-120%',
        y: -40,
        rotate: -18,
        scale: 0.8,
        opacity: 0,
        filter: 'blur(6px)',
    },
};

const rightVariants = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
    leaving: {
        x: '120%',
        y: -40,
        rotate: 18,
        scale: 0.8,
        opacity: 0,
        filter: 'blur(6px)',
    },
};

const throwTransition: Transition = {
    duration: 0.7,
    ease: [0.55, 0, 1, 0.45],
};

export default function Description({ isLeaving = false }: DescriptionProps) {
    return (
        <section
            className="relative min-h-screen overflow-hidden bg-background text-[#171717]  no-scrollbar"
            style={{
                paddingTop: '82px',
            }}
        >
            <div className="absolute z-0 bottom-0">
                <Image
                    alt={'planet'}
                    src={'/home/planet.png'}
                    height={540}
                    width={540}
                    className="dark:blur-sm dark:brightness-[0.35]"
                />

                <div
                    className="pointer-events-none absolute inset-0 hidden dark:block"
                    style={{
                        background: 'radial-gradient(ellipse at bottom, rgba(0,0,0,0) 30%, rgba(10,10,10,0.85) 100%)',
                    }}
                />
            </div>
            <div
                className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 sm:px-10 lg:px-16"
                style={{
                    paddingTop: '24px',
                }}
            >
                <div className="absolute z-0 hidden lg:block lg:left-[400px] xl:left-[500px] top-10">
                    <Image
                        alt={'fish'}
                        src={'/home/fish.png'}
                        height={200}
                        width={200}
                        className="dark:blur-[2px] dark:brightness-[0.45] dark:opacity-80"
                    />
                </div>
                <div className="grid items-center gap-16 md:grid-cols-[0.95fr_1.05fr] lg:gap-20 z-1">
                    {/* =====================================================
                        LEFT — HERO CONTENT
                    ====================================================== */}

                    <motion.div
                        className="relative"
                        variants={leftVariants}
                        animate={isLeaving ? 'leaving' : 'initial'}
                        transition={isLeaving ? throwTransition : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-col items-center md:items-start">
                            {/* Eyebrow */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="mb-5 md:mb-7 flex gap-3 items-center
                                "
                            >
                                <span
                                    className="
                                h-px w-6 bg-neutral-300 dark:bg-neutral-700

                                "
                                />

                                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                                    SDCB
                                </span>

                                <span className="font-mono text-[11px] tracking-[0.18em] text-neutral-400">
                                    &middot; N&deg; 01
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <HeroHeading />

                            {/* Description */}
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: 'blur(6px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: 'easeOut',
                                    delay: 0.35,
                                }}
                                className="mt-2 md:mt-7 max-w-[300px] md:max-w-xl text-center md:text-left  text-xs leading-5 md:leading-7 text-neutral-500 dark:text-neutral-400 sm:text-lg"
                            >
                                Fiurozz is where developers showcase their projects, connect with other builders, and
                                ship faster with AI agents.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: 'blur(6px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: 'easeOut',
                                    delay: 0.5,
                                }}
                                className="mt-5 md:mt-8 flex flex-wrap gap-3"
                            >
                                <Button>
                                    <Link href="/projects">Projects</Link>
                                </Button>

                                <Button variant="outline">
                                    <Link href="/design">Try AI Agent</Link>
                                </Button>
                            </motion.div>

                            {/* Value props */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.7,
                                }}
                                className="
                                mt-7 md:mt-12
                                grid
                                max-w-xl
                                grid-cols-1
                                gap-5
                                sm:grid-cols-2
                            "
                            >
                                <Feature
                                    icon={<CloudUpload className="size-4" />}
                                    title="Showcase"
                                    description="your projects"
                                />

                                <Feature
                                    icon={<Compass className="size-4" />}
                                    title="Discover"
                                    description="developer projects"
                                />

                                <Feature
                                    icon={<Users className="size-4" />}
                                    title="Connect"
                                    description="with developers"
                                />

                                <Feature
                                    icon={<CatronautCoding scale={0.3} />}
                                    title="Build faster"
                                    description="with Catronaut"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* =====================================================
                        RIGHT — AI CODE GENERATOR
                    ====================================================== */}

                    <motion.div
                        className="relative"
                        variants={rightVariants}
                        initial={{ opacity: 0, x: 35, filter: 'blur(8px)' }}
                        animate={isLeaving ? 'leaving' : 'initial'}
                        transition={isLeaving ? throwTransition : { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    >
                        <div
                            className="
            overflow-hidden
            rounded
            border
            border-[#ddd8d1]
            bg-background
            shadow-[0_20px_60px_rgba(30,25,20,0.06)]
            dark:border-neutral-800
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        "
                        >
                            {/* Editor header */}
                            <div className="flex h-14 items-center justify-between border-b border-[#e7e2db] px-5 dark:border-neutral-800">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                                </div>

                                <div className="flex items-center">
                                    <span className="flex items-center gap-1 rounded border border-[#e5dfd8] px-2 py-1 font-mono text-[10px] text-[#f06a2c] dark:border-neutral-700">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b2c]" />
                                        LIVE
                                    </span>
                                </div>
                            </div>

                            {/* Main editor */}
                            <div className="grid min-h-[470px] xl:grid-cols-[0.9fr_1.1fr]">
                                {/* Prompt */}
                                <div className="border-b border-[#e7e2db] p-5 hidden xl:block lg:border-b-0 lg:border-r dark:border-neutral-800">
                                    <div className="flex h-full flex-col">
                                        {/* Prompt header */}
                                        <div className="mb-5 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0ece7] dark:bg-neutral-800">
                                                    <span className="text-[10px] font-semibold text-[#55504a] dark:text-neutral-300">
                                                        U
                                                    </span>
                                                </div>

                                                <span className="text-xs font-semibold text-[#3f3a35] dark:text-neutral-200">
                                                    Your prompt
                                                </span>
                                            </div>

                                            <span className="font-mono text-[10px] text-[#aaa] dark:text-neutral-500">
                                                PROMPT
                                            </span>
                                        </div>

                                        {/* Prompt content */}
                                        <div className="flex-1 rounded-xl border border-[#e5dfd8] bg-white p-4 shadow-[0_4px_20px_rgba(30,25,20,0.03)] dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none">
                                            <p className="text-[13px] leading-6 text-[#3f3a35] dark:text-neutral-200">
                                                Create a beautiful project dashboard with stats and recent activity.
                                            </p>

                                            <p className="mt-3 text-[13px] leading-6 text-[#777] dark:text-neutral-400">
                                                Use Next.js and shadcn/ui. Keep the interface clean, minimal, and
                                                responsive.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Generated result */}
                                <div className="bg-[#faf8f5] p-5 dark:bg-neutral-900">
                                    <Tabs defaultValue="code" className="h-full">
                                        <div className="mb-5 flex items-center justify-between">
                                            <span className="text-xs font-semibold text-[#3f3a35] dark:text-neutral-200">
                                                Generated result
                                            </span>

                                            <TabsList>
                                                <TabsTrigger value="preview" className="cursor-pointer">
                                                    <Eye />
                                                </TabsTrigger>

                                                <TabsTrigger value="code" className="cursor-pointer">
                                                    <CodeXml />
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>

                                        <TabsContents>
                                            {/* Code */}
                                            <TabsContent value="code">
                                                <Code
                                                    key={'code-view'}
                                                    code={`import { Catronaut } from 'fiurozz-ai'

const agent = new Catronaut({
  model: 'catronaut-v1',
  capability: 'full-stack',
  creativity: 0.8,
})

const result = await agent.generate({
  prompt: 'Create a beautiful
  project dashboard with
  stats and recent activity',
  framework: 'Next.js',
  ui: 'shadcn/ui',
})`}
                                                    className="h-[390px] rounded border border-[#e5dfd8] bg-[#fcfcfb] shadow-none dark:border-neutral-700 dark:bg-neutral-950"
                                                >
                                                    <CodeHeader copyButton>ai-agent.ts</CodeHeader>

                                                    <CodeBlock
                                                        writing
                                                        duration={35}
                                                        delay={350}
                                                        lang="typescript"
                                                        className="text-[#3f3a35] dark:text-neutral-200"
                                                    />
                                                </Code>
                                            </TabsContent>

                                            {/* Preview */}
                                            <TabsContent value="preview">
                                                <div className="h-[390px] overflow-auto border border-[#e5dfd8] bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900">
                                                    {/* Header */}
                                                    <div className="mb-5 flex items-center justify-between">
                                                        <span className="text-xs font-semibold">Project Dashboard</span>

                                                        <span className="text-xs text-[#999] dark:text-neutral-500">
                                                            ⋯
                                                        </span>
                                                    </div>

                                                    {/* Overview */}
                                                    <div className="mb-3 text-[10px] font-medium uppercase tracking-wider text-[#777] dark:text-neutral-400">
                                                        Overview
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-2">
                                                        <Stat label="Projects" value="24" />
                                                        <Stat label="Views" value="12.4K" />
                                                        <Stat label="Likes" value="3.2K" />
                                                    </div>

                                                    {/* Activity Chart */}
                                                    <div className="mt-5">
                                                        <div className="mb-3 flex items-center justify-between">
                                                            <div className="text-[10px] font-medium uppercase tracking-wider text-[#777] dark:text-neutral-400">
                                                                Activity
                                                            </div>

                                                            <span className="text-[10px] text-[#999] dark:text-neutral-500">
                                                                Last 7 days
                                                            </span>
                                                        </div>

                                                        <div className="h-[150px] w-full">
                                                            <ReactECharts
                                                                option={{
                                                                    animation: true,
                                                                    tooltip: { trigger: 'axis' },
                                                                    grid: { top: 10, right: 10, bottom: 20, left: 35 },
                                                                    xAxis: {
                                                                        type: 'category',
                                                                        boundaryGap: false,
                                                                        data: [
                                                                            'Mon',
                                                                            'Tue',
                                                                            'Wed',
                                                                            'Thu',
                                                                            'Fri',
                                                                            'Sat',
                                                                            'Sun',
                                                                        ],
                                                                        axisLine: { show: false },
                                                                        axisTick: { show: false },
                                                                        axisLabel: { fontSize: 9, color: '#999' },
                                                                    },
                                                                    yAxis: {
                                                                        type: 'value',
                                                                        splitLine: { lineStyle: { color: '#eeeae5' } },
                                                                        axisLabel: { fontSize: 9, color: '#aaa' },
                                                                    },
                                                                    series: [
                                                                        {
                                                                            name: 'Views',
                                                                            type: 'line',
                                                                            smooth: true,
                                                                            symbol: 'none',
                                                                            data: [
                                                                                820,
                                                                                1100,
                                                                                980,
                                                                                1450,
                                                                                1280,
                                                                                1750,
                                                                                2100,
                                                                            ],
                                                                            lineStyle: { width: 2 },
                                                                            areaStyle: { opacity: 0.06 },
                                                                        },
                                                                        {
                                                                            name: 'Likes',
                                                                            type: 'line',
                                                                            smooth: true,
                                                                            symbol: 'none',
                                                                            data: [180, 240, 220, 310, 290, 380, 420],
                                                                            lineStyle: { width: 2 },
                                                                        },
                                                                    ],
                                                                }}
                                                                style={{ width: '100%', height: '100%' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Recent Activity */}
                                                    <div className="mt-5">
                                                        <div className="mb-3 text-[10px] font-medium uppercase tracking-wider text-[#777] dark:text-neutral-400">
                                                            Recent Activity
                                                        </div>

                                                        <div className="overflow-hidden rounded-md border border-[#e5dfd8] bg-white dark:border-neutral-700 dark:bg-neutral-900">
                                                            <Activity
                                                                text="New project 'Nebula UI' published"
                                                                time="2m ago"
                                                            />
                                                            <Activity
                                                                text="Someone starred your project"
                                                                time="15m ago"
                                                            />
                                                            <Activity
                                                                text="AI Agent generated 3 components"
                                                                time="1h ago"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        </TabsContents>
                                    </Tabs>
                                </div>
                            </div>

                            {/* Generator footer */}
                            <div className="flex items-center justify-end border-t border-[#e7e2db] px-5 py-4 dark:border-neutral-800">
                                <span className="font-mono text-[10px] text-[#aaa] dark:text-neutral-500">
                                    142 tokens
                                </span>
                            </div>
                        </div>

                        {/* Floating status */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="
            absolute
            -right-4
            -top-5
            hidden
            rounded
            border
            border-[#e5dfd8]
            bg-[#fcfcfb]
            px-3
            py-2
            text-[10px]
            shadow-sm
            sm:block
            dark:border-neutral-700
            dark:bg-neutral-900
            dark:text-neutral-200
            dark:shadow-none
        "
                        >
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                            AI Agent is thinking...
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex items-center gap-3">
            <AnimateIcon
                animateOnHover
                className="flex size-10 shrink-0 items-center justify-center rounded bg-[#f5eee6] text-[#4b4540] dark:bg-primary dark:text-[#171717]"
            >
                {icon}
            </AnimateIcon>

            <div>
                <div className="text-sm font-semibold text-[#292929] dark:text-white">{title}</div>

                <div className="text-xs text-[#77716b] dark:text-neutral-400">{description}</div>
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-md border border-[#e6e0d9] bg-white p-3">
            <div className="text-[9px] text-[#999]">{label}</div>

            <div className="mt-1 text-sm font-semibold">{value}</div>

            <div className="mt-2 h-4">
                <svg viewBox="0 0 60 20" className="h-full w-full" fill="none">
                    <path
                        d="M1 17C8 16 10 12 16 13C22 14 25 8 31 10C37 12 39 5 45 7C51 9 55 3 59 4"
                        stroke="#ff6b2c"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </div>
    );
}

function Activity({ text, time }: { text: string; time: string }) {
    return (
        <div className="flex items-center justify-between border-b border-[#eee9e3] px-3 py-3 last:border-0">
            <span className="text-[10px] text-[#444]">{text}</span>

            <span className="ml-3 shrink-0 text-[9px] text-[#aaa]">{time}</span>
        </div>
    );
}
