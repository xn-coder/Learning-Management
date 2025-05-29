import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import Header from './Header';
import SidebarNav from './SidebarNav';
import Link from 'next/link';
import { Palette } from 'lucide-react'; // Icon for logo

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground hidden md:flex md:flex-col"> {/* Hidden on mobile, handled by Header trigger */}
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-sidebar-primary" />
              <h1 className="text-2xl font-bold text-sidebar-primary">
                Atelier Hub
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        {/* Mobile Sidebar (via Sheet in Header) */}
        <SidebarInset className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
