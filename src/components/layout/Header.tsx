"use client";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserCircle, Sun, Moon, Menu, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/components/ui/sheet';
import SidebarNav from './SidebarNav'; // For mobile sidebar content

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from localStorage if implemented
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  
  // This ensures that the theme is correctly applied after hydration
  const currentTheme = mounted && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-card border-b">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-sidebar text-sidebar-foreground">
              <SheetHeader className="p-4 border-b border-sidebar-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                  <Palette className="h-7 w-7 text-sidebar-primary" />
                  <h1 className="text-xl font-bold text-sidebar-primary">
                    Atelier Hub
                  </h1>
                </Link>
              </SheetHeader>
              <div className="p-2" onClick={() => setIsSheetOpen(false)}> {/* Close sheet on nav item click */}
                 <SidebarNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link href="/" className="md:hidden flex items-center gap-2 ml-2">
            <Palette className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Atelier Hub</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {mounted ? (
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {currentTheme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        ) : (
          <div className="h-9 w-9 bg-muted rounded-full animate-pulse" /> 
        )}
        <UserCircle className="h-8 w-8 text-muted-foreground cursor-pointer" />
      </div>
    </header>
  );
}
