'use client';

import { FileJsonIcon, FileCodeIcon, Image as ImageIcon } from 'lucide-react';

import { Sidebar, SidebarHeader, SidebarContent, useSidebar } from '@/components/animate-ui/components/radix/sidebar';
import { PanelLeftClose } from '@/components/animate-ui/icons/panel-left-close';
import { PanelLeftOpen } from '@/components/animate-ui/icons/panel-left-open';

import {
    Files,
    SubFiles,
    FolderItem,
    FolderContent,
    FolderTrigger,
    FileItem,
} from '@/components/animate-ui/components/radix/files';

import ReactIcon from '@/components/file-icons/ReactIcon';
import TsIcon from '@/components/file-icons/TsIcon';
import JsIcon from '@/components/file-icons/JsIcon';
import GitIgnoreIcon from '@/components/file-icons/GitIgnoreIcon';
import HtmlIcon from '@/components/file-icons/HtmlIcon';
import CssIcon from '@/components/file-icons/CssIcon';
import EnvIcon from '@/components/file-icons/EnvIcon';
import ReadmeIcon from '@/components/file-icons/ReadmeIcon';

import { FILES, TREE } from '@/mock-data/files';
import Link from 'next/link';
import { Paintbrush } from '@/components/animate-ui/icons/paintbrush';

interface RawNode {
    name: string;
    type: 'file' | 'folder';
    children?: string[];
}

function getFileIcon(fileName: string) {
    const ext = fileName
        .split('.')
        .pop()
        ?.toLowerCase();

    switch (ext) {
        case 'tsx':
        case 'jsx':
            return ReactIcon;
        case 'ts':
            return TsIcon;
        case 'js':
            return JsIcon;
        case 'json':
            return FileJsonIcon;
        case 'gitignore':
            return GitIgnoreIcon;
        case 'html':
            return HtmlIcon;
        case 'css':
            return CssIcon;
        case 'env':
            return EnvIcon;
        case 'md':
            return ReadmeIcon;
        case 'svg':
        case 'webp':
            return ImageIcon;
        default:
            return FileCodeIcon;
    }
}

/* Filenames are mono (the parent SidebarContent sets font-ctr-mono) — a
   filename is exactly the kind of fact the Narrow-Mono Rule is for.
   `Files`' own highlight pill is hover-only (see FilesHighlight's default
   `hover: true`), so it never marks which file is actually open — that has
   to come from activeFile, applied per row via FileItem's `active` prop
   below (which reaches the row itself, not `className`, which only ever
   reaches the label). */
const fileTreeItemClass = 'text-ctr-ink';
const activeFileClassName = 'bg-ctr-paper-2 font-semibold';

function RenderTree({
    nodes,
    activeFile,
    onOpenFile,
}: {
    nodes: RawNode[];
    activeFile: string | null;
    onOpenFile: (name: string) => void;
}) {
    return (
        <>
            {nodes.map((node) => {
                if (node.type === 'folder') {
                    const childNodes: RawNode[] = (node.children ?? []).map((name) => ({
                        name,
                        type: 'file',
                    }));

                    return (
                        <FolderItem key={node.name} value={node.name}>
                            <FolderTrigger className={fileTreeItemClass}>{node.name}</FolderTrigger>

                            <FolderContent guideClassName="before:bg-ctr-ink-hair">
                                {/* SubFiles has no highlight pill of its own to recolour — the
                                    outer Files' single FilesHighlightPrimitive already tracks
                                    any descendant item, nested or not. */}
                                <SubFiles>
                                    <RenderTree nodes={childNodes} activeFile={activeFile} onOpenFile={onOpenFile} />
                                </SubFiles>
                            </FolderContent>
                        </FolderItem>
                    );
                }

                if (!FILES[node.name]) return null;

                const active = activeFile === node.name;

                return (
                    <FileItem
                        key={node.name}
                        icon={getFileIcon(node.name)}
                        onClick={() => onOpenFile(node.name)}
                        active={active}
                        activeClassName={activeFileClassName}
                        aria-current={active ? 'true' : undefined}
                        className={fileTreeItemClass}
                    >
                        {node.name}
                    </FileItem>
                );
            })}
        </>
    );
}

interface FileTreeProps {
    activeFile: string | null;
    onOpenFile: (name: string) => void;
}

/**
 * `SidebarTrigger`'s own icon carries a hardcoded `!text-[#52514e]
 * dark:text-[#c3c2b7]` with `!important` — no className reaches it from
 * outside, and editing the shared primitive would reach `/projects` too. A
 * local button on the same `useSidebar()` hook gets the identical behaviour
 * with the atelier's own ink instead.
 */
function TreeToggle() {
    const { open, toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            title={open ? 'Collapse explorer' : 'Open explorer'}
            className="flex size-7 flex-none cursor-pointer items-center justify-center rounded-[1px] text-ctr-ink transition-colors duration-300 [transition-timing-function:var(--ease-ctr)] hover:bg-ctr-paper-2"
        >
            {open ? (
                <PanelLeftClose size={16} strokeWidth={1.7} animateOnHover />
            ) : (
                <PanelLeftOpen size={16} strokeWidth={1.7} animateOnHover />
            )}
        </button>
    );
}

export default function FileTree({ activeFile, onOpenFile }: FileTreeProps) {
    const folderNames = (TREE as RawNode[]).filter((node) => node.type === 'folder').map((node) => node.name);

    return (
        <Sidebar side="left" collapsible="offcanvas" className="border-r border-ctr-ink-hair">
            {/* `Sidebar`'s own `className` lands on the fixed outer box; its
                child `sidebar-inner` paints its own opaque `bg-sidebar` on top
                of it regardless, so the panel's real fill has to come from a
                div inside the tree here rather than a class passed above. */}
            <div className="flex h-full w-full flex-col bg-ctr-paper">
                <SidebarHeader className="flex h-[59px] flex-none flex-row items-center justify-between gap-2 border-b border-ctr-ink-hair px-3.5">
                    {/* Fiurozz's own default className carries `text-black
                        dark:text-white dark:opacity-60` and sets it locally via
                        `currentColor`, so it has to be overridden on the icon
                        itself — the wrapping Link's colour never reaches it. */}
                    <Link
                        href="/design"
                        title="Back to Catronaut"
                        className="flex size-7 flex-none items-center justify-center opacity-70 transition-opacity duration-300 [transition-timing-function:var(--ease-ctr)] hover:opacity-100"
                    >
                        {/* Matches TreeToggle's own icon size exactly, so the two
                            header controls read as one pair, not two scales. */}
                        <Paintbrush
                            animateOnHover
                            size={16}
                            strokeWidth={1.7}
                            className="text-ctr-ink dark:text-ctr-ink dark:opacity-100"
                        />
                    </Link>
                    <TreeToggle />
                </SidebarHeader>

                <SidebarContent className="min-h-0 flex-1 overflow-y-auto px-1.5 pt-1.5 pb-6 font-ctr-mono text-[13px]">
                    <Files
                        className="w-full"
                        highlightClassName="bg-ctr-paper-2 rounded-[1px]"
                        defaultOpen={folderNames}
                    >
                        <RenderTree nodes={TREE as RawNode[]} activeFile={activeFile} onOpenFile={onOpenFile} />
                    </Files>
                </SidebarContent>
            </div>
        </Sidebar>
    );
}
