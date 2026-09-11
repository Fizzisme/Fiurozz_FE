import { create } from 'zustand';

/** Số cửa sổ mở cùng lúc trên desktop; mở thêm thì cửa sổ cũ nhất đóng lại. */
export const MAX_WINDOWS = 3;

interface MessageDockState {
    /** Bảng danh sách hội thoại đang mở hay không */
    isListOpen: boolean;
    /** username của các hội thoại đang mở, mới nhất đứng đầu */
    openWindows: string[];
    /** username -> đang thu gọn thành thanh tiêu đề */
    minimized: Record<string, boolean>;

    toggleList: () => void;
    openConversation: (username: string) => void;
    closeConversation: (username: string) => void;
    toggleMinimize: (username: string) => void;
}

export const useMessageDockStore = create<MessageDockState>((set) => ({
    isListOpen: false,
    openWindows: [],
    minimized: {},

    toggleList: () => set((state) => ({ isListOpen: !state.isListOpen })),

    openConversation: (username) =>
        set((state) => {
            // Đã mở thì chỉ bung lại, không nhân bản cửa sổ
            if (state.openWindows.includes(username)) {
                return { minimized: { ...state.minimized, [username]: false } };
            }

            const next = [username, ...state.openWindows].slice(0, MAX_WINDOWS);
            const dropped = state.openWindows.filter((u) => !next.includes(u));

            const minimized = { ...state.minimized, [username]: false };
            dropped.forEach((u) => delete minimized[u]);

            return { openWindows: next, minimized };
        }),

    closeConversation: (username) =>
        set((state) => {
            const minimized = { ...state.minimized };
            delete minimized[username];
            return { openWindows: state.openWindows.filter((u) => u !== username), minimized };
        }),

    toggleMinimize: (username) =>
        set((state) => ({
            minimized: { ...state.minimized, [username]: !state.minimized[username] },
        })),
}));
