import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import { SideBar } from '@/components/ui/sidebar'


export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider>
        <SideBar user={user} projectCategories={projectCategories} />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
  );
};