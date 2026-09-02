'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parse, isValid } from 'date-fns';
import {
    Camera,
    Plus,
    Trash2,
    Loader2,
    User,
    MapPin,
    Link as LinkIcon,
    Calendar as CalendarIcon,
    Globe,
    Mars,
    Venus,
    CircleHelp,
} from 'lucide-react';

import { useUserStore, SocialLink, UserSettings } from '@/lib/store/user-store';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/global/avatar';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { Input } from '@/components/ui/global/input';
import { Label } from '@/components/ui/global/label';
import { Textarea } from '@/components/ui/global/textarea';
import { Separator } from '@/components/ui/global/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/global/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/global/popover';
import { Calendar } from '@/components/ui/global/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/global/select';
import { getInitials } from '@/lib/utils';
import { ArrowLeft } from '@/components/animate-ui/icons/arrow-left';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { useRouter } from 'next/navigation';

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const GENDER_OPTIONS = [
    { label: 'Male', value: 'male', icon: Mars },
    { label: 'Female', value: 'female', icon: Venus },
    { label: 'Prefer not to say', value: 'unspecified', icon: CircleHelp },
];

const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
];

const TIMEZONE_OPTIONS = [
    'UTC',
    'Asia/Ho_Chi_Minh',
    'Asia/Bangkok',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
];

const PLATFORM_OPTIONS = [
    { value: 'github', label: 'GitHub' },
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'website', label: 'Website / Other' },
];

const BIO_MAX_LENGTH = 220;

/* -------------------------------------------------------------------------- */
/*                              Form value type                               */
/* -------------------------------------------------------------------------- */

type EditableFields = {
    displayName: string;
    fullName: string;
    bio: string;
    occupation: string;
    company: string;
    location: string;
    website: string;
    birthday: Date | undefined;
    gender: string;
    language: string;
    timezone: string;
};

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Edit() {
    const user = useUserStore((state) => state.user);
    const updateUser = useUserStore((state) => state.updateUser);

    const [fields, setFields] = React.useState<EditableFields | null>(null);
    const [links, setLinks] = React.useState<SocialLink[]>([]);
    const [settings, setSettings] = React.useState<UserSettings | null>(null);

    const [birthdayInput, setBirthdayInput] = React.useState('');
    const [birthdayOpen, setBirthdayOpen] = React.useState(false);
    const [birthdayError, setBirthdayError] = React.useState('');

    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
    const [coverPreview, setCoverPreview] = React.useState<string | null>(null);

    const [saving, setSaving] = React.useState(false);

    const router = useRouter();

    // Hydrate local form state once the client-side store has the user.
    React.useEffect(() => {
        if (!user || fields) return;
        const birthday = user.birthday ? new Date(user.birthday) : undefined;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFields({
            displayName: user.displayName ?? '',
            fullName: user.fullName ?? '',
            bio: user.bio ?? '',
            occupation: user.occupation ?? '',
            company: user.company ?? '',
            location: user.location ?? '',
            website: user.website ?? '',
            birthday,
            gender: user.gender ?? 'unspecified',
            language: user.language ?? 'en',
            timezone: user.timezone ?? 'UTC',
        });
        setBirthdayInput(birthday ? format(birthday, 'dd/MM/yyyy') : '');
        setLinks(user.links ?? []);
        setSettings(
            user.settings ?? {
                isPrivate: false,
                showEmail: false,
                showBirthday: false,
                allowMessage: true,
                locale: user.language ?? 'en',
                theme: 'system',
            },
        );
    }, [user, fields]);

    if (!user || !fields || !settings) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
                Loading your profile…
            </div>
        );
    }

    function setField<K extends keyof EditableFields>(key: K, value: EditableFields[K]) {
        setFields((prev) => (prev ? { ...prev, [key]: value } : prev));
    }

    function handleBirthdayText(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 5) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
        } else if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }
        setBirthdayInput(value);

        if (value.length !== 10) {
            setBirthdayError('');
            return;
        }

        const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
        if (!isValid(parsedDate)) {
            setBirthdayError('Invalid date');
            return;
        }
        if (parsedDate > new Date()) {
            setBirthdayError('Birthday cannot be in the future');
            return;
        }
        setBirthdayError('');
        setField('birthday', parsedDate);
    }

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
    }

    function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverPreview(URL.createObjectURL(file));
    }

    function addLink() {
        setLinks((prev) => [
            ...prev,
            { id: `tmp_${Date.now()}`, platform: 'website', title: null, url: '', order: prev.length },
        ]);
    }

    function updateLink(id: string, patch: Partial<SocialLink>) {
        setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    }

    function removeLink(id: string) {
        setLinks((prev) => prev.filter((l) => l.id !== id).map((l, i) => ({ ...l, order: i })));
    }

    async function handleSave() {
        setSaving(true);
        try {
            // TODO: replace with real API calls, e.g.:
            // if (avatarFile) await userService.uploadAvatar(avatarFile);
            // if (coverFile) await userService.uploadCover(coverFile);
            // await userService.updateProfile({ ...fields, links, settings });

            if (!fields) {
                return;
            }

            updateUser({
                displayName: fields.displayName,
                fullName: fields.fullName || null,
                bio: fields.bio || null,
                occupation: fields.occupation || null,
                company: fields.company || null,
                location: fields.location || null,
                website: fields.website || null,
                birthday: fields.birthday ? fields.birthday.toISOString() : null,
                gender: fields.gender,
                language: fields.language,
                timezone: fields.timezone,
                links,
                settings,
                ...(avatarPreview ? { avatarUrl: avatarPreview } : {}),
                ...(coverPreview ? { coverUrl: coverPreview } : {}),
            });
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#52514e] dark:text-[#c3c2b7]">Edit profile</h1>
                <Button
                    variant="ghost"
                    asChild
                    className="cursor-pointer text-[#52514e] dark:text-[#c3c2b7]"
                    onClick={() => router.back()}
                >
                    <AnimateIcon animateOnHover className="flex gap-1 items-center justify-center">
                        <ArrowLeft />
                        Cancel
                    </AnimateIcon>
                </Button>
            </div>

            {/* Single column: Photo -> About -> Save */}
            <div className="flex flex-col gap-6">
                {/* ============================================================ */}
                {/* PHOTO                                                         */}
                {/* ============================================================ */}

                <Card className="overflow-hidden py-0">
                    <div className="group relative h-28 w-full bg-muted">
                        {(coverPreview ?? user.coverUrl) && (
                            <Image src={coverPreview ?? user.coverUrl!} alt="" fill className="object-cover" />
                        )}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 text-[#52514e] dark:text-[#c3c2b7] opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                            <Camera className="size-5" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                        </label>
                    </div>

                    <CardContent className="-mt-10 pb-6">
                        <label className="group relative block h-20 w-20 cursor-pointer">
                            <Avatar className="h-20 w-20 rounded ring-4 ring-background">
                                <AvatarImage
                                    src={avatarPreview ?? user.avatarUrl ?? undefined}
                                    alt={user.displayName}
                                />
                                <AvatarFallback className="text-xl">
                                    {getInitials(fields.fullName || fields.displayName)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="absolute inset-0 flex items-center justify-center rounded bg-black/0 text-[#52514e] dark:text-[#c3c2b7] opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                                <Camera className="size-4" />
                            </span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </label>
                        <p className="mt-2 text-xs text-muted-foreground">Hover the cover or avatar to change it.</p>
                    </CardContent>
                </Card>

                {/* ============================================================ */}
                {/* ABOUT YOU                                                     */}
                {/* ============================================================ */}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-[#52514e] dark:text-[#c3c2b7]">
                            <User className="h-5 w-5" />
                            About you
                        </CardTitle>
                        <CardDescription>This is what other people will see on your profile.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label>Display name</Label>
                                <Input
                                    value={fields.displayName}
                                    maxLength={50}
                                    onChange={(e) => setField('displayName', e.target.value)}
                                    placeholder="Fizzisme"
                                />
                            </div>

                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label>Full name</Label>
                                <Input
                                    value={fields.fullName}
                                    maxLength={80}
                                    onChange={(e) => setField('fullName', e.target.value)}
                                    placeholder="Nguyen Le Tuan Phi"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[#52514e] dark:text-[#c3c2b7]">
                                <Label>Bio / headline</Label>
                                <span className="text-xs text-muted-foreground">
                                    {fields.bio.length}/{BIO_MAX_LENGTH}
                                </span>
                            </div>
                            <Textarea
                                value={fields.bio}
                                maxLength={BIO_MAX_LENGTH}
                                rows={3}
                                placeholder="e.g. Frontend engineer building developer tools. Ex-startup, now indie."
                                onChange={(e) => setField('bio', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label>Title</Label>
                                <Input
                                    value={fields.occupation}
                                    onChange={(e) => setField('occupation', e.target.value)}
                                    placeholder="e.g. Software Engineer"
                                />
                            </div>
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label>Company</Label>
                                <Input
                                    value={fields.company}
                                    onChange={(e) => setField('company', e.target.value)}
                                    placeholder="e.g. Freelance"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" /> Location
                                </Label>
                                <Input
                                    value={fields.location}
                                    onChange={(e) => setField('location', e.target.value)}
                                    placeholder="e.g. Da Nang, Vietnam"
                                />
                            </div>
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label className="flex items-center gap-1.5">
                                    <LinkIcon className="h-3.5 w-3.5" /> Website
                                </Label>
                                <Input
                                    value={fields.website}
                                    onChange={(e) => setField('website', e.target.value)}
                                    placeholder="e.g. yourdomain.dev"
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label className="flex items-center gap-1.5">
                                    <CalendarIcon className="h-3.5 w-3.5" /> Birthday
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        value={birthdayInput}
                                        onChange={handleBirthdayText}
                                        className="pr-9"
                                    />
                                    <Popover open={birthdayOpen} onOpenChange={setBirthdayOpen}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                <CalendarIcon className="h-4 w-4 cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={fields.birthday}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        setField('birthday', date);
                                                        setBirthdayInput(format(date, 'dd/MM/yyyy'));
                                                        setBirthdayError('');
                                                    }
                                                    setBirthdayOpen(false);
                                                }}
                                                captionLayout="dropdown"
                                                startMonth={new Date(1950, 0)}
                                                endMonth={new Date()}
                                                disabled={(date) => date > new Date()}
                                                className="[--cell-size:1.75rem]"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {birthdayError && <p className="mt-1 text-xs text-destructive">{birthdayError}</p>}
                            </div>

                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5" /> Gender
                                </Label>
                                <Select value={fields.gender} onValueChange={(v) => setField('gender', v)}>
                                    <SelectTrigger className="w-full cursor-pointer">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                        {GENDER_OPTIONS.map(({ label, value, icon: Icon }) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                                className="cursor-pointer text-[#52514e] dark:text-[#c3c2b7]"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                                    {label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 text-[#52514e] dark:text-[#c3c2b7]">
                                <Label className="flex items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5" /> Language
                                </Label>
                                <Select value={fields.language} onValueChange={(v) => setField('language', v)}>
                                    <SelectTrigger className="w-full cursor-pointer">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                        {LANGUAGE_OPTIONS.map((opt) => (
                                            <SelectItem
                                                key={opt.value}
                                                value={opt.value}
                                                className="cursor-pointer text-[#52514e] dark:text-[#c3c2b7]"
                                            >
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2 md:max-w-xs text-[#52514e] dark:text-[#c3c2b7]">
                            <Label>Timezone</Label>
                            <Select value={fields.timezone} onValueChange={(v) => setField('timezone', v)}>
                                <SelectTrigger className="w-full cursor-pointer">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                    {TIMEZONE_OPTIONS.map((tz) => (
                                        <SelectItem
                                            key={tz}
                                            value={tz}
                                            className="cursor-pointer text-[#52514e] dark:text-[#c3c2b7]"
                                        >
                                            {tz}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div className="space-y-3 text-[#52514e] dark:text-[#c3c2b7]">
                            <Label>Social links</Label>
                            {links.map((link) => (
                                <div key={link.id} className="flex items-start gap-2">
                                    <Select
                                        value={link.platform}
                                        onValueChange={(v) => updateLink(link.id, { platform: v })}
                                    >
                                        <SelectTrigger className="w-36 shrink-0 cursor-pointer">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PLATFORM_OPTIONS.map((opt) => (
                                                <SelectItem
                                                    key={opt.value}
                                                    value={opt.value}
                                                    className="cursor-pointer"
                                                >
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        placeholder="https://…"
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                        className="flex-1"
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeLink(link.id)}
                                        aria-label="Remove link"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}

                            <Button type="button" variant="outline" className="w-fit cursor-pointer" onClick={addLink}>
                                <Plus className="mr-1.5 size-4" />
                                Add link
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* ============================================================ */}
                {/* SAVE                                                          */}
                {/* ============================================================ */}

                <Button variant="outline" onClick={handleSave} disabled={saving} className="w-full cursor-pointer">
                    {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Save changes
                </Button>
            </div>
        </div>
    );
}
