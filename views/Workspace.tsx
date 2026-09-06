'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

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

const CHAT_MIN = 280;
const CHAT_MAX = 480;

export default function Workspace() {
    const [chatWidth, setChatWidth] = useState(348);

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
            <div className="flex h-screen w-full overflow-hidden">
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

                    <SidebarInset className="min-w-0 flex-1">
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
                        className="border-l border-line-1 bg-sidebar"
                    >
                        <BoxChat onOpenFile={openFile} />
                    </Sidebar>
                </SidebarProvider>
            </div>
        </ChatSidebarProvider>
    );
}