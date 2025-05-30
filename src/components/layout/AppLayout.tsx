
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
// Using a simple SVG as a placeholder for the Weblabs logo
const WeblabsLogoPlaceholder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 100 100" data-ai-hint="company logo">
        <circle cx="50" cy="50" r="45" fill="hsl(var(--sidebar-primary))"/>
        <text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="40" fill="hsl(var(--sidebar-primary-foreground))" textAnchor="middle">W</text>
    </svg>
);


interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground hidden md:flex md:flex-col">
          <SidebarHeader className="p-3 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2.5 group">
              <WeblabsLogoPlaceholder />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-sidebar-primary group-hover:text-sidebar-primary transition-colors">
                  OPEN SOURCE
                </h1>
                <span className="text-xs text-muted-foreground group-hover:text-sidebar-primary transition-colors">Weblabs Technologies</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1 flex flex-col">
          <Header />
          <main className="w-full flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-background"> {/* Ensure main content area has app background */}
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
