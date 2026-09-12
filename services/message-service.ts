import type { Conversation, DirectMessage } from '@/mock-data/messages';
import {
    getConversationsAction,
    getMessagesAction,
    markConversationReadAction,
    openConversationAction,
    sendMessageAction,
} from '@/actions/messages-action';

export const messageService = {

    async getConversations(): Promise<Conversation[]> {
        return getConversationsAction();
    },

    async getMessages(conversationId: string): Promise<DirectMessage[]> {
        return getMessagesAction(conversationId);
    },

    async openConversation(username: string): Promise<Conversation | null> {
        return openConversationAction(username);
    },

    async send(conversationId: string, text: string): Promise<DirectMessage | null> {
        return sendMessageAction(conversationId, text);
    },

    async markRead(conversationId: string): Promise<void> {
        return markConversationReadAction(conversationId);
    },
};
