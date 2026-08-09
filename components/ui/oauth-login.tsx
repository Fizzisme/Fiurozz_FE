'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type ComponentType } from 'react';

interface OauthLoginProps {
    provider: 'facebook' | 'google' | 'github';
    label?: string;
    Icon: ComponentType;
}

export default function OauthLogin({ provider, label, Icon }: OauthLoginProps) {
    const router = useRouter();

    // Holds a reference to the popup window so it can be closed later
    // from handleMessage(), which runs in a different closure/render
    // than the one that opened it. useRef (not useState) because this
    // value doesn't need to trigger a re-render -- it's just a handle,
    // not something rendered in the UI.
    const popupRef = useRef<Window | null>(null);

    useEffect(() => {
        // Fires whenever ANY window sends a postMessage to this tab --
        // not just our OAuth popup. This is how two windows from
        // different origins (the Gateway's domain during the OAuth
        // redirect chain, then our own domain once the popup lands back
        // on it) communicate with each other; there's no other way for
        // the popup to talk back to the tab that opened it.
        const handleMessage = (event: MessageEvent) => {
            // Only trust messages sent from our own origin. Without this
            // check, any other tab/window running arbitrary JS could
            // postMessage a fake 'oauth-success' to this tab and trick it
            // into thinking login succeeded.
            if (event.origin !== window.location.origin) return;

            if (event.data === 'oauth-success') {
                popupRef.current?.close();
                router.push('/home');
                router.refresh();
            } else if (event.data === 'oauth-failed') {
                popupRef.current?.close();
                // toast.error('Đăng nhập thất bại. Vui lòng đảm bảo email GitHub của bạn đã được xác minh.');
            }
        };

        window.addEventListener('message', handleMessage);
        // Cleanup: without this, every re-render (triggered by `router`
        // changing identity) would stack another listener on top of the
        // old one instead of replacing it, so handleMessage would end up
        // firing multiple times for a single message.
        return () => window.removeEventListener('message', handleMessage);
    }, [router]);

    const handleOAuthLogin = () => {
        popupRef.current = window.open(
            `${process.env.NEXT_PUBLIC_BE_URL}/api/auth/oauth/${provider}`,
            'oauth-popup',
            'width=500,height=600',
        );
    };
    return (
        <button
            onClick={handleOAuthLogin}
            className="w-full flex items-center justify-center gap-3 rounded border p-2.5 hover:bg-muted/50 transition-colors cursor-pointer"
        >
            <Icon />
            {label && <span className="text-sm font-medium">{label}</span>}
        </button>
    );
}
