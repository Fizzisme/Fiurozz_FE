import { create } from 'zustand';

export interface SocialLink {
    id: string;
    platform: string;
    title: string | null;
    url: string;
    order: number;
}

export interface UserSettings {
    isPrivate: boolean;
    showEmail: boolean;
    showBirthday: boolean;
    allowMessage: boolean;
    locale: string;
    theme: string;
}

export interface CurrentUser {
    id: string;
    username: string;
    displayName: string;
    fullName: string | null;
    avatarUrl: string | null;
    coverUrl: string | null;
    bio: string | null;
    occupation: string | null;
    company: string | null;
    location: string | null;
    birthday: string | null;
    website: string | null;
    gender: string;
    language: string;
    timezone: string;
    settings: UserSettings | null;
    links: SocialLink[];
}

interface UserState {
    user: CurrentUser | null;
    // Distinguishes "we haven't checked yet" from "checked, no user
    // logged in". Without this, the very first render (before
    // AuthProvider's effect runs) would look identical to a logged-out
    // state, which can cause a flash of the wrong UI (e.g. showing the
    // login icon for a split second even when the user IS logged in).
    isInitialized: boolean;
    setUser: (user: CurrentUser | null) => void;
    updateUser: (patch: Partial<CurrentUser>) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isInitialized: false,

    setUser: (user) => set({ user, isInitialized: true }),

    // For partial updates after a PATCH (e.g. user changes just their
    // avatar in Settings) -- merges into the existing user instead of
    // requiring the caller to pass the whole object back.
    updateUser: (patch) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...patch } : state.user,
        })),

    clearUser: () => set({ user: null, isInitialized: true }),
}));
