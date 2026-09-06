'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ContentFileProps {
    content: string;
    isLoading?: boolean;
    language?: string;
}

export default function ContentFile({ content, isLoading = false, language = 'text' }: ContentFileProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Flash of Unstyled Content

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Bản gốc của bạn khai báo codeStyle nhưng lại luôn truyền style={vs} cho
    // SyntaxHighlighter — mình sửa lại để nó thực sự đổi theo theme sáng/tối.
    const codeStyle = mounted && resolvedTheme === 'light' ? vs : vscDarkPlus;
    const showSkeleton = !mounted || isLoading;

    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-auto thin-scrollbar p-4">
            <div className="relative flex min-h-full flex-1 flex-col">
                {showSkeleton && (
                    <div className="absolute inset-0 space-y-3 pt-1 animate-pulse select-none">
                        <div className="h-4 w-[30%] rounded bg-muted/20" />
                        <div className="h-4 w-[50%] rounded bg-muted/20" />
                        <div className="h-4 w-[40%] rounded bg-muted/20" />
                        <div className="h-4 w-[60%] rounded bg-muted/20" />
                        <div className="h-4 w-[20%] rounded bg-muted/20" />
                    </div>
                )}

                <div
                    className={cn(
                        'min-h-full flex-1 transition-opacity duration-500 ease-in-out',
                        showSkeleton ? 'opacity-0' : 'opacity-100',
                    )}
                >
                    <SyntaxHighlighter
                        language={language}
                        style={codeStyle}
                        customStyle={{
                            padding: 0,
                            margin: 0,
                            fontSize: '14px',
                            lineHeight: '1.5',
                            minHeight: '100%',
                            background: 'transparent',
                        }}
                        lineNumberStyle={{
                            minWidth: '3em',
                            paddingRight: '1em',
                            color: mounted && resolvedTheme === 'dark' ? '#6e7681' : '#a0a0a0',
                            textAlign: 'right',
                        }}
                        showLineNumbers
                    >
                        {content}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
}
