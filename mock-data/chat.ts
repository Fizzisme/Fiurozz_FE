export interface ChatFile {
    name: string;
    status: 'edit' | 'write';
}

export interface ChatMessage {
    role: 'ai' | 'user';
    text: string;
    bullets?: string[];
    note?: string;
    files?: ChatFile[];
}

export const INITIAL_MESSAGES: ChatMessage[] = [
    {
        role: 'ai',
        text:
            'The icon system is unified: every glyph now comes from one stroke set at 16px with a 1.6px weight, so no icon reads heavier than its neighbours.',
        bullets: [
            'Replaced four mismatched glyph sources with a single set.',
            'Normalised optical size to 16px, stroke to 1.6px.',
            'Added focus rings and a 3.1:1 minimum contrast on icon buttons.',
        ],
        note: 'Three files changed. Open index.html to see the markup that picks up the new sprite.',
        files: [
            { name: 'style.css', status: 'edit' },
            { name: 'script.js', status: 'edit' },
            { name: 'index.html', status: 'write' },
        ],
    },
];

export function mockReply(): ChatMessage {
    return {
        role: 'ai',
        text: 'Noted. Applying that to the current pass \u2014 2 files queued for edit.',
        bullets: [
            'Scoped the change to components already on screen.',
            'Kept every surface colour on the existing tokens.',
        ],
        files: [
            { name: 'style.css', status: 'edit' },
            { name: 'script.js', status: 'edit' },
        ],
    };
}
