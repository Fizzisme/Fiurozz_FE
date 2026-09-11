// ============================================================
// MOCK MESSAGES
// Fixture cho dock nhắn tin khi backend chưa có endpoint. Hội thoại gắn
// vào mockMembers để avatar và tên khớp với trang /members.
// ============================================================

import { mockMembers, type Member } from '@/mock-data/members';

export interface DirectMessage {
    id: string;
    conversationId: string;
    /** 'me' = người đang đăng nhập, 'them' = member bên kia */
    from: 'me' | 'them';
    text: string;
    /** ISO date */
    sentAt: string;
}

export interface Conversation {
    /** Trùng username của member -> địa chỉ ổn định, không cần id riêng */
    id: string;
    username: string;
    name: string;
    avatar: string;
    role: string;
    lastMessage: string;
    lastAt: string;
    unread: number;
}

// ============================================================
// NGUỒN SINH DỮ LIỆU
// ============================================================

const THREADS: string[][] = [
    [
        'Hey — just read through your project listing. How long did the editor take you?',
        'About three weekends. The tree view was the part that fought back.',
        'Figured. Did you virtualise it or just cap the depth?',
    ],
    [
        'Your card layout is doing the thing I keep failing at. Any writeup?',
        'No writeup yet, but the whole thing is one grid and a lot of restraint.',
    ],
    [
        'Are you open to collaborating on something small this month?',
        'Depends on the scope — send it over and I will take a look tonight.',
        'Will do. Nothing heavy, maybe a weekend build.',
        'That I can do.',
    ],
    ['Nice work on the landing page. The scroll pinning is very clean.'],
    [
        'Quick one: which hosting are you on for the demo?',
        'Vercel free tier. It has held up fine so far.',
    ],
];

const HOURS_AGO = [1, 5, 26, 51, 120, 190];

/** Băm xác định, cùng ý đồ với mock-data/members.ts */
function hash(seed: number, salt: number): number {
    let x = Math.imul(seed + salt * 0x9e37, 0x85eb) ^ 0x27d4;
    x = Math.imul(x ^ (x >>> 15), 0xc2b2);
    x ^= x >>> 13;
    return Math.abs(x);
}

/** Mốc thời gian cố định để fixture không đổi giữa các lần render */
const EPOCH = new Date('2026-09-11T09:00:00.000Z').getTime();

function minutesBefore(minutes: number): string {
    return new Date(EPOCH - minutes * 60_000).toISOString();
}

// ============================================================
// STATE
// Giữ trong module để mock cư xử như một BE có state thật: gửi tin rồi
// mở lại dock vẫn thấy, trong vòng đời của server process.
// ============================================================

const CONVERSATION_COUNT = 6;

const messagesByConversation = new Map<string, DirectMessage[]>();
const conversations: Conversation[] = [];

function seed() {
    for (let i = 0; i < CONVERSATION_COUNT; i += 1) {
        const member = mockMembers[hash(i, 17) % mockMembers.length];
        if (conversations.some((c) => c.id === member.username)) continue;

        const thread = THREADS[i % THREADS.length];
        const startedAt = HOURS_AGO[i % HOURS_AGO.length] * 60;

        const items: DirectMessage[] = thread.map((text, index) => ({
            id: `${member.username}-${index}`,
            conversationId: member.username,
            // Tin đầu luôn từ họ; sau đó xen kẽ
            from: index % 2 === 0 ? 'them' : 'me',
            text,
            sentAt: minutesBefore(startedAt - index * 7),
        }));

        messagesByConversation.set(member.username, items);

        const last = items[items.length - 1];
        conversations.push({
            id: member.username,
            username: member.username,
            name: member.name,
            avatar: member.avatar,
            role: member.role,
            lastMessage: last.text,
            lastAt: last.sentAt,
            unread: last.from === 'them' && i % 3 === 0 ? 1 + (hash(i, 31) % 3) : 0,
        });
    }
}

seed();

function sortByRecency(list: Conversation[]): Conversation[] {
    return [...list].sort((a, b) => b.lastAt.localeCompare(a.lastAt));
}

// ============================================================
// TRUY VẤN
// ============================================================

export function getMockConversations(): Conversation[] {
    return sortByRecency(conversations);
}

export function getMockMessages(conversationId: string): DirectMessage[] {
    return messagesByConversation.get(conversationId) ?? [];
}

function memberOf(username: string): Member | undefined {
    return mockMembers.find((m) => m.username === username);
}

/**
 * Mở hội thoại với một member. Chưa từng nhắn thì tạo một hội thoại rỗng
 * thay vì trả về không có gì — dock cần một đối tượng để dựng cửa sổ.
 */
export function ensureMockConversation(username: string): Conversation | null {
    const existing = conversations.find((c) => c.id === username);
    if (existing) return existing;

    const member = memberOf(username);
    if (!member) return null;

    const created: Conversation = {
        id: member.username,
        username: member.username,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        lastMessage: '',
        lastAt: new Date(EPOCH).toISOString(),
        unread: 0,
    };

    conversations.push(created);
    messagesByConversation.set(member.username, []);
    return created;
}

export function appendMockMessage(conversationId: string, text: string): DirectMessage | null {
    const conversation = ensureMockConversation(conversationId);
    if (!conversation) return null;

    const items = messagesByConversation.get(conversationId) ?? [];
    const message: DirectMessage = {
        id: `${conversationId}-${items.length}-${Date.now()}`,
        conversationId,
        from: 'me',
        text,
        sentAt: new Date().toISOString(),
    };

    items.push(message);
    messagesByConversation.set(conversationId, items);

    conversation.lastMessage = text;
    conversation.lastAt = message.sentAt;
    conversation.unread = 0;

    return message;
}

export function markMockRead(conversationId: string): void {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) conversation.unread = 0;
}

/** Giả lập độ trễ mạng, cùng quy ước với các fixture khác */
export async function fetchMockConversations(delayMs = 400): Promise<Conversation[]> {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return getMockConversations();
}

export async function fetchMockMessages(conversationId: string, delayMs = 400): Promise<DirectMessage[]> {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return getMockMessages(conversationId);
}
