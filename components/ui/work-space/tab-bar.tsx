'use client';

import { File, FileCode, FileCode2, FileText, Image as ImageIcon, Palette, PanelLeft, Plus, X } from 'lucide-react';
import { PanelLeftOpen } from '@/components/animate-ui/icons/panel-left-open';
import { fileColor } from '@/components/ui/work-space/box-chat';
import CatronautHappy from '@/components/ui/catronaut/happy';
import { useChatSidebar } from '@/components/ui/work-space/chat-sidebar-context';
import { AnimatePresence, motion } from 'motion/react';

export function FileIcon({ name, size = 14 }: { name: string; size?: number }) {
    const props = { size, strokeWidth: 1.7, color: fileColor(name) };

    if (name.endsWith('.css')) return <Palette {...props} />;
    if (name.endsWith('.js')) return <FileCode {...props} />;
    if (name.endsWith('.html')) return <FileCode2 {...props} />;
    if (name.endsWith('.md')) return <FileText {...props} />;
    if (name.endsWith('.svg') || name.endsWith('.webp')) return <ImageIcon {...props} />;

    return <File {...props} />;
}

interface TabBarProps {
    tabs: string[];
    activeFile: string | null;
    treeCollapsed: boolean;
    onActivate: (name: string) => void;
    onClose: (name: string) => void;
    onNewTab: () => void;
    onOpenTree: () => void;
}

export default function TabBar({
    tabs,
    activeFile,
    treeCollapsed,
    onActivate,
    onClose,
    onNewTab,
    onOpenTree,
}: TabBarProps) {
    const textColor = 'text-[#52514e] dark:text-[#c3c2b7]';

    const { open: chatOpen, toggle: toggleChat } = useChatSidebar();

    return (
        <div className="flex flex-none items-center border-b border-line-1 bg-sidebar px-2.5 py-2 h-[59px]">
            {/* LEFT */}
            <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
                {treeCollapsed ? (
                    <button onClick={onOpenTree} title="Open explorer" className={`cursor-pointer pr-2 ${textColor}`}>
                        <PanelLeftOpen size={16} strokeWidth={1.7} animateOnHover />
                    </button>
                ) : null}

                {tabs.map((tab) => {
                    const active = tab === activeFile;

                    return (
                        <div
                            key={tab}
                            onClick={() => onActivate(tab)}
                            className={
                                `flex max-w-[190px] flex-none cursor-pointer items-center gap-[7px] ` +
                                `rounded-[7px] border px-2.5 py-1.5 transition-colors duration-100 ` +
                                (active
                                    ? `border-line-1 bg-background font-semibold shadow-xs ${textColor}`
                                    : `border-transparent bg-sidebar ${textColor} hover:bg-background/60`)
                            }
                        >
                            <FileIcon name={tab} />

                            <span className="truncate text-[13px]">{tab}</span>

                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose(tab);
                                }}
                                title="Close"
                                className={
                                    `flex h-[18px] w-[18px] flex-none items-center justify-center rounded ` +
                                    `${textColor} opacity-60 transition-colors duration-100 ` +
                                    `hover:bg-line-2 hover:opacity-100`
                                }
                            >
                                <X size={13} strokeWidth={1.7} />
                            </span>
                        </div>
                    );
                })}

                <button
                    onClick={onNewTab}
                    title="New tab"
                    className={
                        `ml-1 flex h-7 w-7 flex-none cursor-pointer items-center justify-center rounded-md ` +
                        `${textColor} transition-colors duration-100 hover:bg-background/60`
                    }
                >
                    <Plus size={16} strokeWidth={1.7} />
                </button>
            </div>

            {/* RIGHT */}
            <AnimatePresence>
                {!chatOpen ? (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                            duration: 0.25,
                            ease: 'easeOut',
                            delay: 0.2,
                        }}
                        onClick={toggleChat}
                        title="Open chat"
                        className="ml-2 cursor-pointer"
                    >
                        <CatronautHappy scale={0.3} />
                    </motion.button>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
