import * as React from 'react';
import Navigate from '@/components/ui/global/navigate';
import Header from '@/components/ui/global/header';
import { FloatingMenuBubble } from '@/components/ui/global/floating-menu-bubble';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navigate />
            <Header />
            <FloatingMenuBubble />
            {children}
        </>
    );
}
