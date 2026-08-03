'use client'

import ReactMarkdown from 'react-markdown'
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs'

import { Code, CodeBlock, CodeHeader } from '@/components/animate-ui/components/animate/code'

const ReadmeIcon = () => {
    return (
        <>
            <svg fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="size-5">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M 5 6 C 3.346 6 2 7.346 2 9 L 2 21 C 2 22.654 3.346 24 5 24 L 11.183594 23.980469 C 12.173594 23.980469 13.133031 24.290844 13.957031 24.839844 L 16 26.201172 L 18.042969 24.839844 C 18.866969 24.290844 19.826406 24 20.816406 24 L 27 24 C 28.654 24 30 22.654 30 21 L 30 9 C 30 7.346 28.654 6 27 6 L 20.816406 6 C 19.430406 6 18.086594 6.4077813 16.933594 7.1757812 L 16 7.7988281 L 15.066406 7.1757812 C 13.912406 6.4067813 12.570594 6 11.183594 6 L 5 6 z M 5 8 L 11.183594 8 C 12.173594 8 13.133031 8.2908438 13.957031 8.8398438 L 16 10.201172 L 18.042969 8.8398438 C 18.866969 8.2908438 19.826406 8 20.816406 8 L 27 8 C 27.552 8 28 8.449 28 9 L 28 21 C 28 21.551 27.552 22 27 22 L 20.816406 22 C 19.430406 22 18.086594 22.407781 16.933594 23.175781 L 16 23.798828 L 15.066406 23.175781 C 13.912406 22.406781 12.570594 22 11.183594 22 L 5 22 C 4.448 22 4 21.551 4 21 L 4 9 C 4 8.449 4.448 8 5 8 z M 6 12 L 6 14 L 14 14 L 14 12 L 6 12 z M 18 12 L 18 14 L 26 14 L 26 12 L 18 12 z M 6 16 L 6 18 L 14 18 L 14 16 L 6 16 z M 18 16 L 18 18 L 26 18 L 26 16 L 18 16 z"></path>
                </g>
            </svg>
        </>
    )
}

const ReadmePreviewer = ({
                             code,
                             duration,
                             delay,
                             writing,
                             cursor,
                         }: {
    code: string
    duration: number
    delay: number
    writing: boolean
    cursor: boolean
}) => {

    return (
        <div className="w-full">
            <Tabs defaultValue="code">
                <TabsList>
                    <TabsTrigger value="code" className='cursor-pointer'>Code</TabsTrigger>
                    <TabsTrigger value="preview" className='cursor-pointer'>Preview</TabsTrigger>
                </TabsList>
                <TabsContents>
                    <TabsContent value="code">
                        <Code
                            className="h-[420px] "
                            code={code}
                            key={'code-view'}
                            style={{
                                maxHeight: '460px',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <CodeHeader icon={ReadmeIcon} copyButton>
                                README.md
                            </CodeHeader>

                            <CodeBlock
                                cursor={cursor}
                                lang="markdown"
                                writing={writing}
                                duration={duration}
                                delay={delay}
                                className='dark:bg-secondary'
                                style={{ flex: 1, minHeight: 0, overflow: 'auto' }}
                            />
                        </Code>
                    </TabsContent>
                    <TabsContent value="preview">
                        <div className="h-[420px] overflow-auto border rounded-lg p-6 bg-white prose dark:bg-[#171717] leading-8">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                                    h2: ({ node, ...props }) => (
                                        <h2 className="text-xl font-semibold mb-3 mt-4" {...props} />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p className="text-[15px] leading-[1.75] mb-3" {...props} />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong className="font-semibold  dark:text-neutral-100" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="leading-[1.75]" {...props} />,
                                }}
                            >
                                {code}
                            </ReactMarkdown>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}

export default ReadmePreviewer
