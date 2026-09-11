'use client';

import { useState } from 'react';

import {
    ArrowUp,
    ChevronDown,
    ChevronRight,
    Copy,
    Files,
    Folder,
    GitBranch,
    MoreHorizontal,
    Palette,
    Pencil,
    Plus,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    Wand,
    X,
    File,
    FileCode,
    FileCode2,
    FileText,
    Image as ImageIcon,
} from 'lucide-react';

import {
    SidebarHeader,
    SidebarContent,
    SidebarTrigger,
} from '@/components/animate-ui/components/radix/sidebar';

import { MessageSquare } from '@/components/animate-ui/icons/message-square';

import {
    INITIAL_MESSAGES,
    mockReply,
    type ChatMessage,
} from '@/mock-data/chat';

interface BoxChatProps {
    onOpenFile: (name: string) => void;
}

const SUGGESTIONS = [
    {
        label: 'Match next step',
        Icon: Sparkles,
        color: '#BE6247', // ctr-terracotta
    },
    {
        label: 'Design polish / ready to ship',
        Icon: Palette,
        color: '#C98F52', // ctr-ochre
    },
    {
        label: 'More',
        Icon: MoreHorizontal,
        color: '#4E5E6C', // ctr-ink-soft
    },
];

const EASE = '[transition-timing-function:var(--ease-ctr)]';
const PLATE_SHADOW = 'shadow-[0_1px_0_rgba(43,58,74,0.16),0_10px_24px_-16px_rgba(43,58,74,0.5)]';

const iconBtn =
    `flex h-[26px] w-[26px] items-center justify-center rounded-[1px] text-ctr-ink-soft transition-colors duration-300 ${EASE} hover:bg-ctr-paper-2 hover:text-ctr-ink`;

export default function BoxChat({ onOpenFile }: BoxChatProps) {
    const [messages, setMessages] =
        useState<ChatMessage[]>(INITIAL_MESSAGES);

    const [draft, setDraft] = useState('');

    function send() {
        const text = draft.trim();

        if (!text) return;

        setMessages((prev) => [
            ...prev,
            {
                role: 'user',
                text,
            },
            mockReply(),
        ]);

        setDraft('');
    }

    return (
        <>
            {/* HEADER */}
            <SidebarHeader className="flex h-[59px] flex-none flex-row items-center gap-2 border-b border-ctr-ink-hair bg-ctr-paper px-3 font-ctr-sans">
                {/* Collapse */}
                <SidebarTrigger
                    title="Collapse chat"
                    className="cursor-pointer text-ctr-ink"
                />

                {/* Project selector */}
                <button
                    className={`flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-[1px] px-2 py-1.5 text-[13.5px] font-semibold text-ctr-ink transition-colors duration-300 ${EASE} hover:bg-ctr-paper-2`}
                    title="Select project"
                >
                    <Folder
                        size={15}
                        strokeWidth={1.7}
                        color="#8E3D28"
                        className="flex-none"
                    />

                    <span className="min-w-0 flex-1 truncate text-left">
                        Web prototype
                    </span>

                    <ChevronDown
                        size={14}
                        strokeWidth={1.7}
                        color="#4E5E6C"
                        className="flex-none"
                    />
                </button>

                {/* New chat */}
                <button
                    title="New chat"
                    className={`flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[1px] text-ctr-ink transition-colors duration-300 ${EASE} hover:bg-ctr-paper-2`}
                >
                    <MessageSquare
                        animateOnHover
                        size={16}
                        strokeWidth={1.7}
                    />
                </button>
            </SidebarHeader>

            {/* MESSAGES */}
            <SidebarContent className="min-h-0 flex-1 bg-ctr-paper">
                <div className="flex min-h-0 flex-1 select-text flex-col gap-[18px] overflow-y-auto p-4 thin-scrollbar">
                    {messages.map((m, i) =>
                        m.role === 'user' ? (
                            <div
                                key={i}
                                className="max-w-[88%] self-end rounded-[2px_2px_0px_2px] bg-[#9C4C34] px-[11px] py-2 font-ctr-serif leading-normal text-ctr-paper"
                            >
                                {m.text}
                            </div>
                        ) : (
                            <div
                                key={i}
                                className="flex flex-col gap-2.5 font-ctr-serif"
                            >
                                <p className="m-0 leading-relaxed text-ctr-ink">
                                    {m.text}
                                </p>

                                {(m.bullets || []).map((b, j) => (
                                    <div
                                        key={j}
                                        className="flex gap-2 leading-relaxed text-ctr-ink-soft"
                                    >
                                        <span className="text-ctr-ink-soft">
                                            &mdash;
                                        </span>

                                        <span className="flex-1">
                                            {b}
                                        </span>
                                    </div>
                                ))}

                                {m.note ? (
                                    <p className="m-0 leading-relaxed text-ctr-ink-soft italic">
                                        {m.note}
                                    </p>
                                ) : null}

                                {m.files?.length ? (
                                    <div className={`overflow-hidden rounded-[1px] border border-ctr-ink-hair bg-ctr-paper-lift font-ctr-sans ${PLATE_SHADOW}`}>
                                        <div className="flex items-center gap-2 border-b border-ctr-ink-faint bg-ctr-paper-2 px-3 py-2.5">
                                            <Files
                                                size={14}
                                                strokeWidth={1.7}
                                                color="#4E5E6C"
                                            />

                                            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ctr-ink-soft">
                                                Files from this turn
                                            </span>

                                            <span className="ml-auto text-xs text-ctr-ink-soft">
                                                Write{' '}
                                                {
                                                    m.files.filter(
                                                        (f) =>
                                                            f.status ===
                                                            'write',
                                                    ).length
                                                }{' '}
                                                &middot; Edit{' '}
                                                {
                                                    m.files.filter(
                                                        (f) =>
                                                            f.status ===
                                                            'edit',
                                                    ).length
                                                }
                                            </span>
                                        </div>

                                        <div className="flex flex-col p-1">
                                            {m.files.map((f) => (
                                                <button
                                                    key={f.name}
                                                    onClick={() =>
                                                        onOpenFile(f.name)
                                                    }
                                                    className={`flex items-center gap-2.5 rounded-[1px] px-2 py-[7px] text-left text-[13px] transition-colors duration-300 ${EASE} hover:bg-ctr-paper-2`}
                                                >
                                                    <span
                                                        className={
                                                            'flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[1px] border ' +
                                                            (f.status === 'edit'
                                                                ? 'border-[#8E3D28]/35 bg-[#C98F52]/15 text-[#8E3D28]'
                                                                : 'border-[#454D3D]/35 bg-[#8B9C86]/15 text-[#454D3D]')
                                                        }
                                                    >
                                                        {f.status === 'edit' ? (
                                                            <Pencil
                                                                size={12}
                                                                strokeWidth={
                                                                    1.7
                                                                }
                                                            />
                                                        ) : (
                                                            <FileIcon
                                                                name={f.name}
                                                                size={12}
                                                            />
                                                        )}
                                                    </span>

                                                    <span className="font-ctr-mono text-[12.5px] text-ctr-ink">
                                                        {f.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                <div className="flex items-center gap-0.5 pt-0.5">
                                    <button
                                        title="Copy"
                                        className={iconBtn}
                                    >
                                        <Copy
                                            size={15}
                                            strokeWidth={1.7}
                                        />
                                    </button>

                                    <button
                                        title="Branch"
                                        className={iconBtn}
                                    >
                                        <GitBranch
                                            size={15}
                                            strokeWidth={1.7}
                                        />
                                    </button>

                                    <button
                                        title="Good response"
                                        className={iconBtn}
                                    >
                                        <ThumbsUp
                                            size={15}
                                            strokeWidth={1.7}
                                        />
                                    </button>

                                    <button
                                        title="Bad response"
                                        className={iconBtn}
                                    >
                                        <ThumbsDown
                                            size={15}
                                            strokeWidth={1.7}
                                        />
                                    </button>
                                </div>
                            </div>
                        ),
                    )}

                    {/* SUGGESTIONS */}
                    <div className="flex flex-col gap-2 rounded-[1px] border border-ctr-ink-faint bg-ctr-paper-2 p-3 font-ctr-sans">
                        {SUGGESTIONS.map(
                            ({ label, Icon, color }) => (
                                <button
                                    key={label}
                                    onClick={() => setDraft(label)}
                                    className={`flex items-center gap-2.5 rounded-[1px] border border-ctr-ink-hair bg-ctr-paper-lift px-3 py-2.5 text-[13px] text-ctr-ink transition-colors duration-300 ${EASE} hover:border-[#BE6247]/40 hover:bg-ctr-paper`}
                                >
                                    <Icon
                                        size={15}
                                        strokeWidth={1.7}
                                        color={color}
                                    />

                                    <span className="flex-1 text-left">
                                        {label}
                                    </span>

                                    <ChevronRight
                                        size={14}
                                        strokeWidth={1.7}
                                        color="#4E5E6C"
                                    />
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </SidebarContent>

            {/* INPUT */}
            <div className="flex-none border-t border-ctr-ink-faint bg-ctr-paper p-3">
                <div className={`overflow-hidden rounded-[1px] border border-ctr-ink-hair bg-ctr-paper-lift ${PLATE_SHADOW}`}>
                    <textarea
                        value={draft}
                        onChange={(e) =>
                            setDraft(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                send();
                            }
                        }}
                        rows={2}
                        placeholder="Improve the icon system for the current design…"
                        className="block max-h-[180px] min-h-[56px] w-full select-text resize-none bg-transparent p-3 font-ctr-serif text-[14px] leading-normal text-ctr-ink outline-none placeholder:text-ctr-ink-soft/70"
                    />

                    <div className="flex items-center gap-0.5 border-t border-ctr-ink-faint py-2 pr-2 pl-1.5 font-ctr-sans">
                        <button
                            title="Attach"
                            className={iconBtn}
                        >
                            <Plus
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                        <button
                            title="Style"
                            className={iconBtn}
                        >
                            <Palette
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                        <button
                            title="Tools"
                            className={iconBtn}
                        >
                            <Wand
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                        <button
                            title="Clear"
                            onClick={() => setDraft('')}
                            className={iconBtn}
                        >
                            <X
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                        <button className={`ml-auto flex items-center gap-1.5 rounded-[1px] px-2 py-[5px] text-[12.5px] text-ctr-ink-soft transition-colors duration-300 ${EASE} hover:bg-ctr-paper-2`}>
                            <span>
                                Default (CLI config)
                            </span>

                            <ChevronDown
                                size={14}
                                strokeWidth={1.7}
                                color="#4E5E6C"
                            />
                        </button>

                        <button
                            onClick={send}
                            title="Send"
                            className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[1px] bg-[#9C4C34] text-ctr-paper transition-colors duration-300 ${EASE} hover:bg-[#8A422D]`}
                        >
                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

/** The atelier's own ink palette, never the app's orange/ember accent. */
export function fileColor(name: string) {
    if (name.endsWith('.css')) return '#93A9B8'; // ctr-blue
    if (name.endsWith('.js')) return '#C98F52'; // ctr-ochre
    if (name.endsWith('.html')) return '#8E3D28'; // ctr-terracotta-ink

    return '#4E5E6C'; // ctr-ink-soft
}

export function FileIcon({
                             name,
                             size = 14,
                         }: {
    name: string;
    size?: number;
}) {
    const props = {
        size,
        strokeWidth: 1.7,
        color: fileColor(name),
    };

    if (name.endsWith('.css')) {
        return <Palette {...props} />;
    }

    if (name.endsWith('.js')) {
        return <FileCode {...props} />;
    }

    if (name.endsWith('.html')) {
        return <FileCode2 {...props} />;
    }

    if (name.endsWith('.md')) {
        return <FileText {...props} />;
    }

    if (
        name.endsWith('.svg') ||
        name.endsWith('.webp')
    ) {
        return <ImageIcon {...props} />;
    }

    return <File {...props} />;
}
