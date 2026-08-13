'use client';

import type { ComponentType } from 'react';
import { useOauthPopup } from '@/components/oauth-login-listener';

interface OauthLoginProps {
    provider: 'facebook' | 'google' | 'github';
    label?: string;
    Icon: ComponentType;
}

export default function OauthLogin({ provider, label, Icon }: OauthLoginProps) {
    const { openPopup } = useOauthPopup();

    const handleOAuthLogin = () => {
        openPopup(`${process.env.NEXT_PUBLIC_BE_URL}/api/auth/oauth/${provider}`);
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