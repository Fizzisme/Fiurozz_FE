import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar';

import * as React from 'react';

import { Sidebar } from '@/components/ui/sidebar/sidebar';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset className="bg-background">{children}</SidebarInset>
        </SidebarProvider>
    );
}
