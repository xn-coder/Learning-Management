"use client";
import Link from 'next/link';
import { Home, Users, BookOpen, Palette, Settings, FileUp, GalleryHorizontalEnd, ShieldAlert, GraduationCap, UserCheck, UsersRound, LayoutDashboard } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavItem = {
  href?: string;
  label: string;
  icon: React.ElementType;
  role?: 'admin' | 'student' | 'teacher' | 'parent' | 'guest'; // guest for public links
  type?: 'link';
  isDashboard?: boolean;
};

type NavHeader = {
  label: string;
  type: 'header';
  key: string;
};

type NavDivider = {
  type: 'divider';
  key: string;
};

type NavigationElement = NavItem | NavHeader | NavDivider;


const navConfig: { [key: string]: NavigationElement[] } = {
  guest: [
    { href: '/', label: 'Home', icon: Home, type: 'link' },
    { type: 'divider', key: 'div-guest1'},
    { href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    { href: '/ai-prompt-generator', label: 'AI Prompts', icon: Palette, type: 'link' },
  ],
  student: [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-std1'},
    { href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    { href: '/student/my-portfolio', label: 'My Portfolio', icon: GalleryHorizontalEnd, type: 'link' }, // Dynamic ID will be handled later
    { href: '/student/submit-artwork', label: 'Submit Artwork', icon: FileUp, type: 'link' },
    { href: '/ai-prompt-generator', label: 'AI Prompts', icon: Palette, type: 'link' },
  ],
  teacher: [
    { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-tch1'},
    { href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    // Teacher specific links e.g., manage submissions, gradebook
  ],
  parent: [
    { href: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-par1'},
    // Parent specific links e.g., child's progress
  ],
  admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: ShieldAlert, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-adm1'},
    { href: '/admin/users', label: 'Manage Users', icon: Users, type: 'link' },
    { href: '/admin/courses', label: 'Manage Courses', icon: Settings, type: 'link' },
    { type: 'divider', key: 'div-adm2'},
    { href: '/courses', label: 'View Catalog', icon: BookOpen, type: 'link' },
    { href: '/ai-prompt-generator', label: 'AI Prompts', icon: Palette, type: 'link' },
  ],
};


export default function SidebarNav() {
  const pathname = usePathname();
  // Mock current user role. In a real app, this would come from auth context.
  const [currentUserRole, setCurrentUserRole] = React.useState<'admin' | 'student' | 'teacher' | 'parent' | 'guest'>('guest');
  
  // Effect to simulate role change for testing - remove in real app
  React.useEffect(() => {
    const roles: Array<'admin' | 'student' | 'teacher' | 'parent' | 'guest'> = ['guest', 'student', 'admin', 'teacher', 'parent'];
    // Example: You could set this from a dropdown or localStorage for demo purposes
    // For now, defaults to guest. Set to e.g. 'student' to see student nav.
    // setCurrentUserRole('student'); 
  }, []);


  const getNavItemsForRole = (role: 'admin' | 'student' | 'teacher' | 'parent' | 'guest'): NavigationElement[] => {
    let items = navConfig[role] || navConfig.guest;
    // All roles should see the home page, unless their dashboard is the home page.
    const hasDashboardAsHome = items.some(item => item.type === 'link' && item.isDashboard && item.href === '/');
    if (role !== 'guest' && !hasDashboardAsHome && !items.find(item => item.type==='link' && item.href === '/')) {
      items = [{ href: '/', label: 'Home', icon: Home, type: 'link' }, {type: 'divider', key: 'div-home'}, ...items];
    }
    return items;
  };
  
  const navItemsToDisplay = getNavItemsForRole(currentUserRole);

  return (
    <SidebarMenu className="p-2">
      {navItemsToDisplay.map((item, index) => {
        if (item.type === 'divider') {
          return <hr key={item.key || `divider-${index}`} className="my-3 border-sidebar-border" />;
        }
        if (item.type === 'header') {
          return (
            <SidebarGroupLabel key={item.key || `header-${index}`} className="px-2 py-1 mb-1 text-xs">
              {item.label}
            </SidebarGroupLabel>
          );
        }
        // Item is a link
        const IconComponent = item.icon;
        return (
          <SidebarMenuItem key={item.href || `item-${index}`}>
            <Link href={item.href!} passHref legacyBehavior>
              <SidebarMenuButton 
                isActive={pathname === item.href} 
                className="w-full justify-start text-sm h-10"
                variant={pathname === item.href ? "default" : "ghost"} // 'default' for active has --sidebar-primary bg
                asChild={false} // Ensure it's a button
              >
                <IconComponent className="h-5 w-5 mr-3 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden truncate">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
       {/* Role switcher for demo purposes */}
       <SidebarGroup className="mt-auto pt-4 border-t border-sidebar-border">
        <SidebarGroupLabel className="px-2 py-1 mb-1 text-xs">Demo Role</SidebarGroupLabel>
        <select 
            value={currentUserRole} 
            onChange={(e) => setCurrentUserRole(e.target.value as any)}
            className="w-full p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border text-sm"
        >
            <option value="guest">Guest</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
        </select>
       </SidebarGroup>
    </SidebarMenu>
  );
}
