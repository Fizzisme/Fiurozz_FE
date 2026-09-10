'use client';

import { useMemo, useState } from 'react';
import { useSidebar } from '@/components/animate-ui/components/radix/sidebar';

import { FILES } from '@/mock-data/files';
import TabBar from '@/components/ui/work-space/tab-bar';
import ContentFile from '@/components/ui/work-space/content-file';

interface EditorProps {
    tabs: string[];
    activeFile: string | null;
    onActivate: (name: string) => void;
    onClose: (name: string) => void;
    onNewTab: () => void;
}

function languageFor(name: string) {
    if (name.endsWith('.tsx') || name.endsWith('.jsx')) return 'tsx';
    if (name.endsWith('.ts')) return 'typescript';
    if (name.endsWith('.js')) return 'javascript';
    if (name.endsWith('.html')) return 'markup';
    if (name.endsWith('.css')) return 'css';
    if (name.endsWith('.json')) return 'json';
    if (name.endsWith('.md')) return 'markdown';

    return 'text';
}

export default function Editor(props: EditorProps) {
    const { activeFile } = props;

    const [reloading, setReloading] = useState(false);

    const { open: treeOpen, toggleSidebar } = useSidebar();

    const file = activeFile ? FILES[activeFile] : undefined;

    const isBinary = file?.kind === 'binary';

    const language = useMemo(() => (activeFile ? languageFor(activeFile) : 'text'), [activeFile]);

    function reload() {
        setReloading(true);

        setTimeout(() => setReloading(false), 500);
    }

    return (
        <main className="flex h-full min-w-0 flex-1 flex-col bg-ctr-paper-lift">
            <TabBar {...props} treeCollapsed={!treeOpen} onOpenTree={toggleSidebar} />

            {file && !isBinary ? (
                <ContentFile content={file.code ?? ''} language={language} isLoading={reloading} />
            ) : null}

            {isBinary ? (
                <div className="flex flex-1 items-center justify-center p-6">
                    <div className="flex flex-col items-center gap-1.5 rounded-[1px] border border-ctr-ink-hair bg-ctr-paper px-9 py-7 shadow-[0_1px_0_rgba(43,58,74,0.16),0_10px_24px_-16px_rgba(43,58,74,0.5)]">
                        <span className="font-ctr-mono text-[13px] text-ctr-ink">{activeFile}</span>

                        <span className="text-[12.5px] text-ctr-ink-soft">{file?.meta}</span>

                        <span className="mt-1.5 text-[12.5px] text-ctr-ink-soft">
                            Binary file &mdash; preview not available in the editor.
                        </span>
                    </div>
                </div>
            ) : null}

            {!file ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-ctr-ink-soft">
                    <span className="font-ctr-serif text-[17px] text-ctr-ink">No file open</span>

                    <span className="text-[13px]">Select a file in the explorer to open it here.</span>
                </div>
            ) : null}
        </main>
    );
}
