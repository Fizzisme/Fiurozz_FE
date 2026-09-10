'use client';

import { FileJsonIcon, FileCodeIcon, Image as ImageIcon } from 'lucide-react';

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarTrigger,
} from '@/components/animate-ui/components/radix/sidebar';

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
import Fiurozz from '@/components/icons/logo';

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
   filename is exactly the kind of fact the Narrow-Mono Rule is for. */
const fileTreeItemClass = 'text-ctr-ink';

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
                                <SubFiles highlightClassName="bg-ctr-paper-2 rounded-[1px]">
                                    <RenderTree nodes={childNodes} activeFile={activeFile} onOpenFile={onOpenFile} />
                                </SubFiles>
                            </FolderContent>
                        </FolderItem>
                    );
                }

                if (!FILES[node.name]) return null;

                return (
                    <FileItem
                        key={node.name}
                        icon={getFileIcon(node.name)}
                        onClick={() => onOpenFile(node.name)}
                        aria-current={activeFile === node.name ? 'true' : undefined}
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

export default function FileTree({ activeFile, onOpenFile }: FileTreeProps) {
    const folderNames = (TREE as RawNode[]).filter((node) => node.type === 'folder').map((node) => node.name);

    return (
        <Sidebar side="left" collapsible="offcanvas" className="border-r border-ctr-ink-hair bg-ctr-paper">
            <SidebarHeader className="flex h-[59px] flex-none flex-row items-center justify-between gap-2 border-b border-ctr-ink-hair px-3.5">
                <Link href="/home" title="Back to Fiurozz" className="text-ctr-ink opacity-70 transition-opacity duration-300 [transition-timing-function:var(--ease-ctr)] hover:opacity-100">
                    <Fiurozz className="h-7 w-7 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:my-2 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
                </Link>
                <SidebarTrigger className="cursor-pointer text-ctr-ink" />
            </SidebarHeader>

            <SidebarContent className="min-h-0 flex-1 overflow-y-auto px-1.5 pt-1.5 pb-6 font-ctr-mono text-[13px]">
                <Files className="w-full" highlightClassName="bg-ctr-paper-2 rounded-[1px]" defaultOpen={folderNames}>
                    <RenderTree nodes={TREE as RawNode[]} activeFile={activeFile} onOpenFile={onOpenFile} />
                </Files>
            </SidebarContent>
        </Sidebar>
    );
}
