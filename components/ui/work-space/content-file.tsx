'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cn } from '@/lib/utils';

interface ContentFileProps {
    content: string;
    isLoading?: boolean;
    language?: string;
}

/**
 * The atelier's own code style — ink at four weights on paper, not a borrowed
 * editor theme. The page is fixed-light (see Workspace's body-colour effect),
 * so there is no dark variant to branch on; the four hues are the ones from
 * DESIGN.md's atelier palette that still clear 4.5:1 on ctr-paper-lift —
 * ctr-terracotta, ctr-ochre and ctr-sage read beautifully as swatches but
 * fail contrast at code size, so they stay out of this file entirely.
 */
const MONO = 'var(--font-courier-prime), ui-monospace, SFMono-Regular, Menlo, monospace';
const INK = '#2B3A4A';
const INK_SOFT = '#4E5E6C';
const TERRACOTTA_INK = '#8E3D28';
const DESK = '#454D3D';
const SELECTION = { background: 'rgba(201,143,82,0.35)' };

const ATELIER_CODE_STYLE = {
    'code[class*="language-"]': { color: INK, fontFamily: MONO, fontSize: '13.5px', lineHeight: '1.7' },
    'pre[class*="language-"]': { color: INK, fontFamily: MONO, fontSize: '13.5px', lineHeight: '1.7' },
    'pre[class*="language-"]::selection': SELECTION,
    'pre[class*="language-"] ::selection': SELECTION,
    'code[class*="language-"]::selection': SELECTION,
    'code[class*="language-"] ::selection': SELECTION,
    comment: { color: INK_SOFT, fontStyle: 'italic' },
    prolog: { color: INK_SOFT, fontStyle: 'italic' },
    doctype: { color: INK_SOFT, fontStyle: 'italic' },
    cdata: { color: INK_SOFT, fontStyle: 'italic' },
    punctuation: { color: INK },
    operator: { color: INK },
    string: { color: TERRACOTTA_INK },
    'attr-value': { color: TERRACOTTA_INK },
    regex: { color: TERRACOTTA_INK },
    inserted: { color: TERRACOTTA_INK },
    url: { color: TERRACOTTA_INK },
    keyword: { color: DESK, fontWeight: 600 },
    atrule: { color: DESK, fontWeight: 600 },
    important: { color: DESK, fontWeight: 600 },
    tag: { color: DESK, fontWeight: 600 },
    selector: { color: DESK, fontWeight: 600 },
    boolean: { color: DESK, fontWeight: 600 },
    deleted: { color: DESK },
    function: { color: INK_SOFT },
    'class-name': { color: INK_SOFT },
    'attr-name': { color: INK_SOFT },
    property: { color: INK_SOFT },
    number: { color: INK_SOFT },
    variable: { color: INK_SOFT },
    constant: { color: INK_SOFT },
    symbol: { color: INK_SOFT },
    namespace: { color: INK_SOFT },
};

export default function ContentFile({ content, isLoading = false, language = 'text' }: ContentFileProps) {
    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-auto p-5 thin-scrollbar">
            <div className="relative flex min-h-full flex-1 flex-col">
                {isLoading && (
                    <div className="absolute inset-0 animate-pulse space-y-3 pt-1 select-none">
                        <div className="h-4 w-[30%] rounded-[1px] bg-ctr-ink/[0.08]" />
                        <div className="h-4 w-[50%] rounded-[1px] bg-ctr-ink/[0.08]" />
                        <div className="h-4 w-[40%] rounded-[1px] bg-ctr-ink/[0.08]" />
                        <div className="h-4 w-[60%] rounded-[1px] bg-ctr-ink/[0.08]" />
                        <div className="h-4 w-[20%] rounded-[1px] bg-ctr-ink/[0.08]" />
                    </div>
                )}

                <div
                    className={cn(
                        'min-h-full flex-1 transition-opacity duration-500 ease-in-out',
                        isLoading ? 'opacity-0' : 'opacity-100',
                    )}
                >
                    <SyntaxHighlighter
                        language={language}
                        style={ATELIER_CODE_STYLE}
                        customStyle={{
                            padding: 0,
                            margin: 0,
                            fontSize: '13.5px',
                            lineHeight: '1.7',
                            minHeight: '100%',
                            background: 'transparent',
                        }}
                        lineNumberStyle={{
                            minWidth: '2.6em',
                            paddingRight: '1.4em',
                            color: 'rgba(43,58,74,0.32)',
                            textAlign: 'right',
                            fontFamily: MONO,
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
