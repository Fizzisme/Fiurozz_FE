'use client';

import { ArrowUpRight, Bug, Mail } from 'lucide-react';

import { CopyButton } from '@/components/animate-ui/components/buttons/copy';
import Github from '@/components/icons/github';
import { CONTACT, githubIssuesUrl } from '@/lib/contact';
import { cn } from '@/lib/utils';

const BADGE = 'flex size-9 shrink-0 items-center justify-center rounded bg-[#f5eee6] text-[#4b4540] dark:bg-muted dark:text-foreground';
const ROW_LINK =
    'group flex items-center gap-3 rounded py-3 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50';

/** Email, GitHub and any configured socials. Channels without real values don't render. */
export function ChannelList({ className }: { className?: string }) {
    return (
        <ul className={cn('divide-y divide-border border-y border-border', className)}>
            {CONTACT.email && (
                <li className="flex items-center gap-3">
                    <a href={`mailto:${CONTACT.email}`} className={cn(ROW_LINK, 'min-w-0 flex-1')}>
                        <span className={BADGE}>
                            <Mail className="size-4" />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-sm font-medium">Email</span>
                            <span className="block truncate text-xs text-muted-foreground">{CONTACT.email}</span>
                        </span>
                    </a>
                    <CopyButton content={CONTACT.email} variant="ghost" size="sm" aria-label="Copy email address" />
                </li>
            )}
            <li>
                <a href={githubIssuesUrl} target="_blank" rel="noreferrer" className={ROW_LINK}>
                    <span className={BADGE}>
                        <Bug className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">Report a bug</span>
                        <span className="block text-xs text-muted-foreground">Open an issue on GitHub</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </li>
            <li>
                <a href={CONTACT.githubRepo} target="_blank" rel="noreferrer" className={ROW_LINK}>
                    <span className={BADGE}>
                        <Github className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">Source code</span>
                        <span className="block truncate font-mono text-[11px] text-muted-foreground">Fizzisme/WebFi_FE</span>
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </li>
            {CONTACT.socials.map((social) => (
                <li key={social.href}>
                    <a href={social.href} target="_blank" rel="noreferrer" className={ROW_LINK}>
                        <span className="flex-1 text-sm font-medium">{social.label}</span>
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </li>
            ))}
        </ul>
    );
}

const initials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(-2)
        .map((part) => part[0])
        .join('');

/** The people behind Fiurozz, from CONTACT.team. Roles and links appear only when filled in. */
export function TeamList({ className, dense = false }: { className?: string; dense?: boolean }) {
    return (
        <ul className={cn('divide-y divide-border border-y border-border', className)}>
            {CONTACT.team.map((member) => (
                <li key={member.name} className={cn('flex items-center gap-3', dense ? 'py-3' : 'py-4')}>
                    <span
                        aria-hidden
                        className={cn(
                            'flex shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-1 ring-foreground/10',
                            dense ? 'size-8 text-[11px]' : 'size-10 text-xs',
                        )}
                    >
                        {initials(member.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className={cn('block font-medium', dense ? 'text-sm' : 'text-base tracking-tight')}>{member.name}</span>
                        {member.role && <span className="block text-xs text-muted-foreground">{member.role}</span>}
                    </span>
                    {member.links.length > 0 && (
                        <span className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                            {member.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-0.5 rounded text-xs text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                    {link.label}
                                    <ArrowUpRight className="size-3" />
                                </a>
                            ))}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
