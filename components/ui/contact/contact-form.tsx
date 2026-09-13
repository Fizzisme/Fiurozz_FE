'use client';

import * as React from 'react';
import { useState } from 'react';
import { z } from 'zod';

import { Send } from 'lucide-react';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { Input } from '@/components/ui/global/input';
import { Label } from '@/components/ui/global/label';
import { Textarea } from '@/components/ui/global/textarea';
import { CONTACT } from '@/lib/contact';
import { cn } from '@/lib/utils';

/** mailto links are handed to the OS as a URL; long bodies get cut by some mail apps. */
export const MESSAGE_MAX = 1500;

export const contactSchema = z.object({
    name: z.string().trim().min(1, { message: 'Tell us who is writing' }).max(80),
    email: z.email({ message: 'Enter an email we can reply to' }),
    subject: z.string().trim().min(3, { message: 'Add a short subject' }).max(120),
    message: z
        .string()
        .trim()
        .min(10, { message: 'Write at least a sentence (10 characters)' })
        .max(MESSAGE_MAX, { message: `Keep it under ${MESSAGE_MAX.toLocaleString('en-US')} characters` }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactFormData, string>>;
export type ComposerStatus = 'idle' | 'opening' | 'opened';

const EMPTY: ContactFormData = { name: '', email: '', subject: '', message: '' };

/**
 * The page never sends anything itself: a valid form becomes a mailto draft
 * that the visitor's own mail app opens, addressed to CONTACT.email.
 */
export function useContactComposer() {
    const [data, setData] = useState<ContactFormData>(EMPTY);
    const [errors, setErrors] = useState<ContactErrors>({});
    const [status, setStatus] = useState<ComposerStatus>('idle');

    const canSend = CONTACT.email !== null;

    const update = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
        setData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        if (status === 'opened') setStatus('idle');
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const parsed = contactSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors: ContactErrors = {};
            parsed.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof ContactFormData;
                if (!fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        if (!CONTACT.email) return;

        const { name, email, subject, message } = parsed.data;
        const body = `${message}\n\n— ${name} <${email}>`;
        setStatus('opening');
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // The OS takes over from here; there is no callback to wait on.
        window.setTimeout(() => setStatus('opened'), 700);
    };

    return { data, errors, status, canSend, update, submit };
}

export function submitLabel(status: ComposerStatus, canSend: boolean) {
    if (!canSend) return 'Email not set up yet';
    return status === 'opening' ? 'Opening your mail app…' : 'Open in mail app';
}

type FieldProps = {
    id: string;
    label: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
};

/** Label + control + error. The control must carry `aria-describedby={`${id}-error`}` itself. */
export function Field({ id, label, error, className, children }: FieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error && (
                <p id={`${id}-error`} className="text-xs text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

export function ComposerNote({ status, canSend, className }: { status: ComposerStatus; canSend: boolean; className?: string }) {
    let text = 'Nothing is sent from this page — your mail app opens with the message ready.';
    if (!canSend) text = 'The team inbox hasn’t been set up yet, so this form can’t open a draft.';
    else if (status === 'opened') text = 'Your mail app should be open with the message filled in. It isn’t sent until you press Send there.';

    return (
        <p role="status" aria-live="polite" className={cn('text-xs leading-relaxed text-muted-foreground', className)}>
            {text}
        </p>
    );
}

type ComposerFormProps = {
    composer: ReturnType<typeof useContactComposer>;
    /** Keeps ids unique when more than one form could share a document. */
    idPrefix: string;
    className?: string;
};

/** The standard stacked composer: name + email row, subject, message, then note and submit. */
export function ComposerForm({ composer, idPrefix, className }: ComposerFormProps) {
    const { data, errors, status, canSend, update, submit } = composer;
    const id = (field: keyof ContactFormData) => `${idPrefix}-${field}`;
    const describedBy = (field: keyof ContactFormData) => (errors[field] ? `${id(field)}-error` : undefined);

    return (
        <form onSubmit={submit} noValidate className={cn('space-y-4', className)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id={id('name')} label="Your name" error={errors.name}>
                    <Input
                        id={id('name')}
                        name="name"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Ada Nguyen"
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy('name')}
                    />
                </Field>
                <Field id={id('email')} label="Email to reply to" error={errors.email}>
                    <Input
                        id={id('email')}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy('email')}
                    />
                </Field>
            </div>

            <Field id={id('subject')} label="Subject" error={errors.subject}>
                <Input
                    id={id('subject')}
                    name="subject"
                    value={data.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    placeholder="What’s this about?"
                    aria-invalid={!!errors.subject}
                    aria-describedby={describedBy('subject')}
                />
            </Field>

            <Field id={id('message')} label="Message" error={errors.message}>
                <Textarea
                    id={id('message')}
                    name="message"
                    rows={6}
                    value={data.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="A few lines is plenty."
                    className="min-h-40 resize-y rounded"
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy('message')}
                />
            </Field>

            <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <ComposerNote status={status} canSend={canSend} className="max-w-[44ch]" />
                <Button type="submit" disabled={!canSend || status === 'opening'} className="shrink-0">
                    <Send />
                    {submitLabel(status, canSend)}
                </Button>
            </div>
        </form>
    );
}
