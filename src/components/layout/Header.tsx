
"use client";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserCircle, Sun, Moon, Menu, Palette, Settings, Search as SearchIcon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/components/ui/sheet';
import SidebarNav from './SidebarNav'; // For mobile sidebar content
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setCurrentTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  if (!mounted) {
    return ( // Render a placeholder or null during SSR/hydration mismatch phase
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-card border-b">
        <div className="flex items-center gap-2 md:hidden">
           <Button variant="ghost" size="icon" className="h-9 w-9 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="hidden md:flex items-center gap-2">
           {/* Placeholder for desktop search or logo */}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-muted rounded-full animate-pulse" /> 
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse" /> 
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-card border-b shadow-sm">
      <div className="flex items-center gap-2">
        <div className="md:hidden"> {/* Mobile menu trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-sidebar text-sidebar-foreground">
              <SheetHeader className="p-4 border-b border-sidebar-border">
                 {/* Mobile Sidebar Header Content matches main sidebar header */}
                 <Link href="/" className="flex items-center gap-2 text-sidebar-primary" onClick={() => setIsSheetOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100" data-ai-hint="company logo">
                        <circle cx="50" cy="50" r="45" fill="hsl(var(--primary))"/>
                        <text x="50" y="60" fontFamily="Arial, sans-serif" fontSize="40" fill="white" textAnchor="middle">W</text>
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">OPEN SOURCE</span>
                        <span className="text-xs text-muted-foreground group-hover:text-sidebar-primary transition-colors">Weblabs Technologies</span>
                    </div>
                </Link>
              </SheetHeader>
              <div className="p-2" onClick={(e) => {
                  // Close sheet if a link or button inside SidebarNav is clicked
                  if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
                    setIsSheetOpen(false);
                  }
                }}>
                 <SidebarNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Search bar - more prominent on desktop, could be icon only on mobile */}
        <div className="relative flex-1 max-w-xs ml-2 md:ml-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10 h-9 text-sm" />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change language">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>English (EN)</DropdownMenuItem>
                <DropdownMenuItem disabled>Français (FR)</DropdownMenuItem>
                 <DropdownMenuItem disabled>Español (ES)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {currentTheme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="admin avatar" />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">Administrator</span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
