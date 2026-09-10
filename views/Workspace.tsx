'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Archivo, Courier_Prime, EB_Garamond } from 'next/font/google';

import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
} from '@/components/animate-ui/components/radix/sidebar';

import BoxChat from '@/components/ui/work-space/box-chat';
import Divider from '@/components/ui/work-space/divider';
import Editor from '@/components/ui/work-space/editor';
import FileTree from '@/components/ui/work-space/file-tree';
import {
    ChatSidebarProvider,
} from '@/components/ui/work-space/chat-sidebar-context';

import { FILES } from '@/mock-data/files';

/* The workspace is where "Generate" on /design lands, so it inherits that
   surface's own world rather than the SaaS app's — same ctr-* tokens, same
   three faces. A route this far from Design.tsx has to load them again
   itself; next/font/google is idempotent on an identical config, so this
   costs nothing extra to build. */
const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-eb-garamond',
});

const archivo = Archivo({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-archivo',
});

const courierPrime = Courier_Prime({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-courier-prime',
});

const CHAT_MIN = 280;
const CHAT_MAX = 480;

export default function Workspace() {
    const [chatWidth, setChatWidth] = useState(348);

    /* The atelier is fixed-light regardless of the app's own theme toggle —
       see Design.tsx, which does the same for the same reason. */
    useEffect(() => {
        const previous = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#F2ECDF';
        return () => {
            document.body.style.backgroundColor = previous;
        };
    }, []);

    const [tabs, setTabs] = useState<string[]>([
        'index.html',
        'style.css',
        'script.js',
    ]);

    const [activeFile, setActiveFile] = useState<string | null>(
        'script.js',
    );

    const [chatOpen, setChatOpen] = useState(true);


    const toggleChat = () => {
        setChatOpen((prev) => !prev);
    };

    function openFile(name: string) {
        if (!FILES[name]) return;

        setTabs((prev) =>
            prev.includes(name) ? prev : [...prev, name],
        );

        setActiveFile(name);
    }

    function closeTab(name: string) {
        setTabs((prev) => {
            const next = prev.filter((tab) => tab !== name);

            if (activeFile === name) {
                setActiveFile(
                    next[next.length - 1] ?? null,
                );
            }

            return next;
        });
    }

    function newTab() {
        const next = Object.keys(FILES).find(
            (file) => !tabs.includes(file),
        );

        if (next) {
            openFile(next);
        }
    }

    return (
        <ChatSidebarProvider
            open={chatOpen}
            toggle={toggleChat}
        >
            <div
                className={`${ebGaramond.variable} ${archivo.variable} ${courierPrime.variable} flex h-screen w-full overflow-hidden bg-ctr-paper font-ctr-sans text-ctr-ink selection:bg-ctr-ochre selection:text-ctr-ink`}
            >
                {/* LEFT */}
                <SidebarProvider
                    className="min-h-0 min-w-0 flex-1"
                    style={
                        {
                            '--sidebar-width': '248px',
                        } as CSSProperties
                    }
                >
                    <FileTree
                        activeFile={activeFile}
                        onOpenFile={openFile}
                    />

                    <SidebarInset className="min-w-0 flex-1 bg-ctr-paper-lift">
                        <Editor
                            tabs={tabs}
                            activeFile={activeFile}
                            onActivate={setActiveFile}
                            onClose={closeTab}
                            onNewTab={newTab}
                        />
                    </SidebarInset>
                </SidebarProvider>

                {/* RIGHT */}
                <SidebarProvider
                    open={chatOpen}
                    onOpenChange={setChatOpen}
                    className="!min-h-0 !w-auto shrink-0"
                    style={
                        {
                            '--sidebar-width': `${chatWidth}px`,
                        } as CSSProperties
                    }
                >
                    <Divider
                        width={chatWidth}
                        min={CHAT_MIN}
                        max={CHAT_MAX}
                        onResize={setChatWidth}
                    />

                    <Sidebar
                        side="right"
                        collapsible="offcanvas"
                        className="border-l border-ctr-ink-hair bg-ctr-paper"
                    >
                        <BoxChat onOpenFile={openFile} />
                    </Sidebar>
                </SidebarProvider>
            </div>
        </ChatSidebarProvider>
    );
}