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

const fileTreeItemClass = 'text-[#52514e] dark:text-[#c3c2b7]';

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

                            <FolderContent>
                                <SubFiles>
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
        <Sidebar side="left" collapsible="offcanvas" className="border-r border-line-1 bg-sidebar">
            <SidebarHeader className="flex h-[59px] flex-none flex-row items-center gap-2 border-b border-line-1 px-3.5 justify-between">
                <Link href="/home">
                    <Fiurozz className="h-8 w-8 opacity-80 transition-opacity duration-200 md:h-10 md:w-10 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:group-hover/logoheader:opacity-0 group-data-[collapsible=icon]:my-2" />
                </Link>
                <SidebarTrigger className="cursor-pointer" />
            </SidebarHeader>

            <SidebarContent className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-6 pt-1.5">
                <Files className="w-full" defaultOpen={folderNames}>
                    <RenderTree nodes={TREE as RawNode[]} activeFile={activeFile} onOpenFile={onOpenFile} />
                </Files>
            </SidebarContent>
        </Sidebar>
    );
}
