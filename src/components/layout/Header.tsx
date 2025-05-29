
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

const roleSpecificAvatars: Record<string, string | undefined> = {
    admin: "https://placehold.co/40x40.png?text=A",
    teacher: "https://placehold.co/40x40.png?text=W", // Weblabs logo like in image
    student: "https://placehold.co/40x40.png?text=S",
    parent: "https://placehold.co/40x40.png?text=P",
};
const roleSpecificAvatarHints: Record<string, string | undefined> = {
    admin: "admin avatar",
    teacher: "teacher weblabs logo",
    student: "student avatar",
    parent: "parent avatar",
};


export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [userDisplayName, setUserDisplayName] = useState("Guest");
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

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

    const role = localStorage.getItem('currentUserRole');
    setCurrentUserRole(role);
    const name = localStorage.getItem('currentUserDisplayName');
    if (name) {
        setUserDisplayName(name);
    } else if (role) {
        // Fallback if displayName isn't set but role is (e.g. direct navigation)
        const displayNames: Record<string, string> = {
            admin: "Administrator",
            teacher: "Gosfem Teacher",
            student: "Student",
            parent: "Parent",
        };
        setUserDisplayName(displayNames[role] || "User");
    } else {
        setUserDisplayName("Guest");
    }

    // Listen for changes in localStorage for role (e.g., after login/logout)
    const handleStorageChange = () => {
        const updatedRole = localStorage.getItem('currentUserRole');
        const updatedName = localStorage.getItem('currentUserDisplayName');
        setCurrentUserRole(updatedRole);
        if (updatedName) {
            setUserDisplayName(updatedName);
        } else if (updatedRole) {
             const displayNames: Record<string, string> = {
                admin: "Administrator",
                teacher: "Gosfem Teacher",
                student: "Student",
                parent: "Parent",
            };
            setUserDisplayName(displayNames[updatedRole] || "User");
        }
         else {
            setUserDisplayName("Guest");
        }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also call it once to set initial state from SidebarNav if it runs first
    handleStorageChange(); 


    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };

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
    return ( 
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-card border-b">
        <div className="flex items-center gap-2 md:hidden">
           <Button variant="ghost" size="icon" className="h-9 w-9 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="hidden md:flex items-center gap-2">
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-muted rounded-full animate-pulse" /> 
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse" /> 
        </div>
      </header>
    );
  }

  const avatarSrc = currentUserRole ? roleSpecificAvatars[currentUserRole] : "https://placehold.co/40x40.png";
  const avatarHint = currentUserRole ? roleSpecificAvatarHints[currentUserRole] : "user avatar";
  const avatarFallback = userDisplayName.charAt(0).toUpperCase();


  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-4 md:px-6 bg-card border-b shadow-sm">
      {/* Left Group: Mobile Menu + Search */}
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
                  if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
                    setIsSheetOpen(false);
                  }
                }}>
                 <SidebarNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Search bar: removed flex-1 */}
        <div className="relative max-w-xs ml-2 md:ml-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10 h-9 text-sm" />
        </div>
      </div>
      
      {/* Right Group: Icons - Added flex-1 and justify-end */}
      <div className="flex flex-1 items-center justify-end gap-3">
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
                <AvatarImage src={avatarSrc} alt={userDisplayName} data-ai-hint={avatarHint} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">{userDisplayName}</span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
