'use client';

import { useEffect, useState } from 'react';

import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import { POST_CODE_LANGUAGES, type PostCode } from '@/mock-data/posts';
import { cn } from '@/lib/utils';

const LANGUAGE_LABELS: Record<string, string> = Object.fromEntries(
    POST_CODE_LANGUAGES.map((language) => [language.value, language.label]),
);

/**
 * A code snippet inside a post. Renders the plain text immediately (same
 * metrics, so nothing shifts) and swaps in Shiki's highlighting once it loads;
 * the dark palette rides on Shiki's `--shiki-dark` variables.
 */
export function PostCodeBlock({ code, className }: { code: PostCode; className?: string }) {
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        import('shiki')
            .then(({ codeToHtml }) =>
                codeToHtml(code.code, {
                    lang: code.lang,
                    themes: { light: 'github-light', dark: 'github-dark' },
                    defaultColor: 'light',
                }),
            )
            .then((highlighted) => {
                if (!cancelled) setHtml(highlighted);
            })
            .catch(() => {
                // Unknown language: the plain rendering stays.
            });

        return () => {
            cancelled = true;
        };
    }, [code.code, code.lang]);

    return (
        <div className={cn('overflow-hidden rounded bg-[#fafaf8] ring-1 ring-foreground/10 dark:bg-white/[0.03]', className)}>
            <div className="flex h-9 items-center justify-between border-b border-border pr-1.5 pl-3">
                <span className="font-mono text-[11px] text-muted-foreground">{LANGUAGE_LABELS[code.lang] ?? code.lang}</span>
                <CopyButton content={code.code} variant="ghost" size="xs" aria-label="Copy code" />
            </div>
            <div className="thin-scrollbar overflow-x-auto px-3 py-3 font-mono text-[12.5px] leading-[1.65] [tab-size:4]">
                {html ? (
                    <div
                        className="[&_code]:font-mono [&_pre]:bg-transparent! dark:[&_span]:[color:var(--shiki-dark)]!"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <pre>
                        <code className="text-foreground/80">{code.code}</code>
                    </pre>
                )}
            </div>
        </div>
    );
}
