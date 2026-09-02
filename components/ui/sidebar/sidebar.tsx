'use client';

import * as React from 'react';

import { Sidebar as SidebarRadix } from '@/components/animate-ui/components/radix/sidebar';

import SidebarHeader from '@/components/ui/sidebar/sidebar-header';
import SidebarFooter from '@/components/ui/sidebar/sidebar-footer';
import SidebarContent from '@/components/ui/sidebar/sidebar-content/sidebar-content';

export function Sidebar() {
    return (
        <SidebarRadix collapsible="icon" className="w-[280px]">
            {/* Header */}
            <SidebarHeader />

            {/* Content */}
            <SidebarContent />

            {/*Footer*/}
            <SidebarFooter />
        </SidebarRadix>
    );
}
