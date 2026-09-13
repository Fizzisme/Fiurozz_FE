'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bug, Hand, Handshake, Lightbulb, type LucideIcon } from 'lucide-react';

import { buttonVariants } from '@/components/animate-ui/components/buttons/button';
import { ChannelList, TeamList } from '@/components/ui/contact/contact-channels';
import { ComposerForm, useContactComposer } from '@/components/ui/contact/contact-form';
import { revealGroup, revealPiece } from '@/components/ui/contact/reveal';
import CatronautHappy from '@/components/ui/catronaut/happy';
import Github from '@/components/icons/github';
import { githubIssuesUrl } from '@/lib/contact';

type IntentId = 'bug' | 'idea' | 'work' | 'hello';

type Intent = {
    id: IntentId;
    title: string;
    detail: string;
    heading: string;
    subject: string;
    icon: LucideIcon;
};

const INTENTS: Intent[] = [
    { id: 'bug', title: 'Something’s broken', detail: 'Goes to GitHub issues', heading: 'Report it by email', subject: 'Bug: ', icon: Bug },
    { id: 'idea', title: 'An idea for Fiurozz', detail: 'Features, feedback, wishes', heading: 'Tell us the idea', subject: 'Idea: ', icon: Lightbulb },
    { id: 'work', title: 'Work with us', detail: 'Build something together', heading: 'What would we build?', subject: 'Working together: ', icon: Handshake },
    { id: 'hello', title: 'Just saying hello', detail: 'No reason needed', heading: 'Say hello', subject: 'Hello from a Fiurozz visitor', icon: Hand },
];

const PREFIXES = INTENTS.map((intent) => intent.subject.trim());
const EASE = [0.16, 1, 0.3, 1] as const;

const BUG_REPORT_CHECKLIST = [
    'What you did, step by step',
    'What you expected, and what happened instead',
    'Your browser and device — a screenshot helps',
];

export default function Contact() {
    const reduceMotion = useReducedMotion();
    const composer = useContactComposer();
    const [intentId, setIntentId] = useState<IntentId | null>(null);
    const [emailBug, setEmailBug] = useState(false);

    const intent = INTENTS.find((item) => item.id === intentId) ?? null;
    const showIssuePanel = intentId === 'bug' && !emailBug;

    const choose = (next: Intent) => {
        setIntentId(next.id);
        setEmailBug(false);
        // Only overwrite a subject the visitor hasn't written themselves.
        const current = composer.data.subject.trim();
        if (current === '' || PREFIXES.includes(current)) composer.update('subject', next.subject);
    };

    const swap = {
        initial: reduceMotion ? false : { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: EASE },
    } as const;

    return (
        <main className="bg-background px-4 pt-20 pb-24 md:px-8 md:pt-28">
            <motion.div
                variants={revealGroup}
                initial={reduceMotion ? false : 'hidden'}
                animate="shown"
                className="mx-auto w-full max-w-6xl"
            >
                <motion.header variants={revealPiece} className="flex items-end justify-between gap-8">
                    <div>
                        <h1 className="max-w-[18ch] text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance md:text-[3.5rem]">
                            What are you writing <span className="text-primary">about</span>?
                        </h1>
                        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                            Pick one and we’ll point you to the right place — GitHub for anything broken, email for
                            everything else.
                        </p>
                    </div>
                    <div aria-hidden className="hidden shrink-0 sm:block">
                        <CatronautHappy scale={0.9} />
                    </div>
                </motion.header>

                <motion.fieldset
                    variants={revealPiece}
                    className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded bg-border ring-1 ring-foreground/10 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <legend className="sr-only">Reason for contacting us</legend>
                    {INTENTS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <label
                                key={item.id}
                                className="group relative flex cursor-pointer items-start gap-3 bg-card p-5 transition-colors hover:bg-[#f5f2ed] has-[:checked]:bg-primary/10 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-inset dark:hover:bg-input/30 dark:has-[:checked]:bg-primary/15"
                            >
                                <input
                                    type="radio"
                                    name="intent"
                                    value={item.id}
                                    checked={intentId === item.id}
                                    onChange={() => choose(item)}
                                    className="sr-only"
                                />
                                <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors group-has-[:checked]:text-primary" />
                                <span className="pr-4">
                                    <span className="block text-sm font-medium">{item.title}</span>
                                    <span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span>
                                </span>
                                <span
                                    aria-hidden
                                    className="absolute top-5 right-5 size-2 scale-50 rounded-full bg-primary opacity-0 transition duration-200 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100"
                                />
                            </label>
                        );
                    })}
                </motion.fieldset>

                <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
                    <motion.section variants={revealPiece} className="min-w-0">
                        <AnimatePresence mode="wait" initial={false}>
                            {showIssuePanel ? (
                                <motion.div key="issue" {...swap} className="rounded bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
                                    <h2 className="text-xl font-semibold tracking-tight">Report it where we track it</h2>
                                    <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                                        Bugs live as GitHub issues, so the fix is linked to your report and you can follow
                                        it.
                                    </p>
                                    <p className="mt-6 text-sm font-medium">A useful report has</p>
                                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                        {BUG_REPORT_CHECKLIST.map((line) => (
                                            <li key={line} className="flex items-baseline gap-3">
                                                <span aria-hidden className="size-1.5 shrink-0 -translate-y-0.5 rotate-45 bg-primary" />
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        <a href={githubIssuesUrl} target="_blank" rel="noreferrer" className={buttonVariants()}>
                                            <Github className="size-4" />
                                            Open an issue on GitHub
                                            <ArrowUpRight />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setEmailBug(true)}
                                            className="rounded text-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                        >
                                            No GitHub account? Email it instead
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="compose" {...swap}>
                                    <h2 className="text-xl font-semibold tracking-tight">{intent?.heading ?? 'Write to us'}</h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Your mail app opens a draft addressed to the team.
                                    </p>
                                    <ComposerForm composer={composer} idPrefix="switch" className="mt-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    <motion.aside variants={revealPiece} className="flex min-w-0 flex-col gap-10">
                        <div>
                            <h2 className="text-sm font-semibold">Other ways in</h2>
                            <ChannelList className="mt-3" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold">The team</h2>
                            <TeamList dense className="mt-3" />
                        </div>
                    </motion.aside>
                </div>
            </motion.div>
        </main>
    );
}
