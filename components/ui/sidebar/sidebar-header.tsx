import Link from 'next/link';
import Fiurozz from '@/components/icons/logo';
import { SidebarHeader as SidebarHeaderRadix, SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar';

export default function SidebarHeader() {
    return (
        <SidebarHeaderRadix className="sticky top-0 z-10 shrink-0 bg-sidebar group/logoheader flex flex-row items-center justify-between group-data-[collapsible=icon]:relative group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center">
            <Link href="/home">
                <Fiurozz className="h-8 w-8 opacity-80 transition-opacity duration-200 md:h-10 md:w-10 group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:group-hover/logoheader:opacity-0 group-data-[collapsible=icon]:my-2" />
            </Link>

            <SidebarTrigger className="group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:group-hover/logoheader:opacity-100 group-data-[collapsible=icon]:group-hover/logoheader:pointer-events-auto transition-opacity duration-200 group-data-[collapsible=icon]:my-2 group-data-[collapsible=icon]:ml-0.5 cursor-pointer" />
        </SidebarHeaderRadix>
    );
}
