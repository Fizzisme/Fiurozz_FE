'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, createContext, useContext } from 'react';

interface OauthPopupContextType {
    openPopup: (url: string) => void;
}

const OauthPopupContext = createContext<OauthPopupContextType | null>(null);

export function useOauthPopup() {
    const ctx = useContext(OauthPopupContext);
    if (!ctx) throw new Error('useOauthPopup must be used within OauthLoginListener');
    return ctx;
}

// Single shared listener for the whole login page, regardless of how
// many OAuth provider buttons are rendered. Without this, each button
// registering its own listener means a single postMessage gets
// handled N times in parallel -- causing router.push/refresh to race
// against each other and navigation to intermittently fail.
export function OauthLoginListener({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const popupRef = useRef<Window | null>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            if (event.data === 'oauth-success') {
                popupRef.current?.close();
                router.push('/home');
                router.refresh();
            } else if (event.data === 'oauth-failed') {
                popupRef.current?.close();
                // toast.error(...);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [router]);

    const openPopup = (url: string) => {
        popupRef.current = window.open(url, 'oauth-popup', 'width=500,height=600');
    };

    return <OauthPopupContext.Provider value={{ openPopup }}>{children}</OauthPopupContext.Provider>;
}
