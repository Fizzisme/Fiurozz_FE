import * as React from 'react';
import Navigate from '@/components/ui/navigate';
import Header from '@/components/ui/header';
import { FloatingMenuBubble } from '@/components/ui/floating-menu-bubble';

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
