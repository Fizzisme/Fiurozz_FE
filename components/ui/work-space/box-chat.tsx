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
        color: '#1e7350',
    },
    {
        label: 'Design polish / ready to ship',
        Icon: Palette,
        color: '#2c5a7f',
    },
    {
        label: 'More',
        Icon: MoreHorizontal,
        color: '#657485',
    },
];

const iconBtn =
    'flex h-[26px] w-[26px] items-center justify-center rounded-md text-ink-500 transition-colors duration-100 hover:bg-paper-2 hover:text-ink-800';

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
            <SidebarHeader className="flex h-[59px] flex-none flex-row items-center gap-2 border-b border-line-1 px-3">
                {/* Collapse */}
                <SidebarTrigger
                    title="Collapse chat"
                    className="cursor-pointer"
                />

                {/* Project selector */}
                <button
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-[13.5px] font-semibold text-[#52514e] transition-colors hover:bg-paper-2 dark:text-[#c3c2b7]"
                    title="Select project"
                >
                    <Folder
                        size={15}
                        strokeWidth={1.7}
                        color="#1f4463"
                        className="flex-none"
                    />

                    <span className="min-w-0 flex-1 truncate text-left">
                        Web prototype
                    </span>

                    <ChevronDown
                        size={14}
                        strokeWidth={1.7}
                        color="#8695a5"
                        className="flex-none"
                    />
                </button>

                {/* New chat */}
                <button
                    title="New chat"
                    className="flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-md text-[#52514e] transition-colors hover:bg-paper-2 dark:text-[#c3c2b7]"
                >
                    <MessageSquare
                        animateOnHover
                        size={16}
                        strokeWidth={1.7}
                    />
                </button>
            </SidebarHeader>

            {/* MESSAGES */}
            <SidebarContent className="min-h-0 flex-1">
                <div className="flex min-h-0 flex-1 select-text flex-col gap-[18px] overflow-y-auto p-4 thin-scrollbar">
                    {messages.map((m, i) =>
                        m.role === 'user' ? (
                            <div
                                key={i}
                                className="max-w-[88%] self-end rounded-[10px_10px_4px_10px] bg-brand-700 px-[11px] py-2 leading-normal text-white"
                            >
                                {m.text}
                            </div>
                        ) : (
                            <div
                                key={i}
                                className="flex flex-col gap-2.5"
                            >
                                <p className="m-0 leading-relaxed text-ink-800">
                                    {m.text}
                                </p>

                                {(m.bullets || []).map((b, j) => (
                                    <div
                                        key={j}
                                        className="flex gap-2 leading-relaxed text-ink-700"
                                    >
                                        <span className="text-ink-300">
                                            &mdash;
                                        </span>

                                        <span className="flex-1">
                                            {b}
                                        </span>
                                    </div>
                                ))}

                                {m.note ? (
                                    <p className="m-0 leading-relaxed text-ink-600">
                                        {m.note}
                                    </p>
                                ) : null}

                                {m.files?.length ? (
                                    <div className="overflow-hidden rounded-[10px] border border-line-1 bg-sidebar shadow-xs">
                                        <div className="flex items-center gap-2 border-b border-line-2 bg-background px-3 py-2.5">
                                            <Files
                                                size={14}
                                                strokeWidth={1.7}
                                                color="#657485"
                                            />

                                            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-600">
                                                Files from this turn
                                            </span>

                                            <span className="ml-auto text-xs text-ink-500">
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
                                                    className="flex items-center gap-2.5 rounded-md px-2 py-[7px] text-left text-[13px] transition-colors duration-100 hover:bg-brand-050"
                                                >
                                                    <span
                                                        className={
                                                            'flex h-[22px] w-[22px] flex-none items-center justify-center rounded-[5px] border ' +
                                                            (f.status === 'edit'
                                                                ? 'border-review-100 bg-review-050 text-review-700'
                                                                : 'border-decided-100 bg-decided-050 text-decided-700')
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

                                                    <span className="font-mono text-[12.5px]">
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
                    <div className="flex flex-col gap-2 rounded-[10px] border border-line-2 bg-background p-3">
                        {SUGGESTIONS.map(
                            ({ label, Icon, color }) => (
                                <button
                                    key={label}
                                    onClick={() => setDraft(label)}
                                    className="flex items-center gap-2.5 rounded-lg border border-line-1 bg-sidebar px-3 py-2.5 text-[13px] transition-colors duration-100 hover:border-brand-100 hover:bg-brand-050"
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
                                        color="#8695a5"
                                    />
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </SidebarContent>

            {/* INPUT */}
            <div className="flex-none border-t border-line-2 p-3">
                <div className="overflow-hidden rounded-[10px] border border-line-1 bg-sidebar shadow-xs">
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
                        className="block max-h-[180px] min-h-[56px] w-full select-text resize-none bg-transparent p-3 text-[13.5px] leading-normal outline-none"
                    />

                    <div className="flex items-center gap-0.5 border-t border-line-2 py-2 pl-1.5 pr-2">
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

                        <button className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-[5px] text-[12.5px] text-ink-600 transition-colors duration-100 hover:bg-paper-2">
                            <span>
                                Default (CLI config)
                            </span>

                            <ChevronDown
                                size={14}
                                strokeWidth={1.7}
                                color="#8695a5"
                            />
                        </button>

                        <button
                            onClick={send}
                            title="Send"
                            className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-brand-700 text-white transition-colors duration-100 hover:bg-brand-900"
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

export function fileColor(name: string) {
    if (name.endsWith('.css')) return '#2c5a7f';
    if (name.endsWith('.js')) return '#a8710c';
    if (name.endsWith('.html')) return '#9c4221';

    return '#657485';
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