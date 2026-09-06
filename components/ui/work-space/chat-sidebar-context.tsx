'use client';

import {
    createContext,
    useContext,
    type ReactNode,
} from 'react';

interface ChatSidebarContextValue {
    open: boolean;
    toggle: () => void;
}

const ChatSidebarContext =
    createContext<ChatSidebarContextValue | null>(null);

export function ChatSidebarProvider({
                                        open,
                                        toggle,
                                        children,
                                    }: {
    open: boolean;
    toggle: () => void;
    children: ReactNode;
}) {
    return (
        <ChatSidebarContext.Provider value={{ open, toggle }}>
            {children}
        </ChatSidebarContext.Provider>
    );
}

export function useChatSidebar() {
    const context = useContext(ChatSidebarContext);

    if (!context) {
        throw new Error(
            'useChatSidebar must be used within ChatSidebarProvider',
        );
    }

    return context;
}