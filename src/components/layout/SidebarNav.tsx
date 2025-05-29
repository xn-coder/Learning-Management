
"use client";
import Link from 'next/link';
import { 
    LayoutDashboard, Users, BookOpen, Palette, Settings, FileUp, 
    GalleryHorizontalEnd, ShieldAlert, GraduationCap, UserCheck, 
    UsersRound, LogIn, Home, CreditCard, Briefcase, BarChart3, 
    UserCog, CalendarCheck, Download, FileText, ShieldCheck, 
    ClipboardList, Banknote, BedDouble, Car, Settings2, FilePieChart, UserMinus, ChevronDown, ChevronRight
} from 'lucide-react'; // Added ChevronRight
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation'; 
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type NavItem = {
  href?: string;
  label: string;
  icon: React.ElementType;
  role?: 'admin' | 'student' | 'teacher' | 'parent' | 'guest';
  type?: 'link';
  isDashboard?: boolean;
  action?: () => void; 
  key?: string;
  showChevron?: boolean;
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

type UserProfileElement = {
  type: 'userProfile';
  key: string;
  name: string;
  avatarUrl?: string;
  dataAiHint?: string;
};

type NavigationElement = NavItem | NavHeader | NavDivider | UserProfileElement;


const navConfig: { [key: string]: NavigationElement[] } = {
  guest: [
    { key: 'guest-home', href: '/', label: 'Home', icon: Home, type: 'link' },
    { type: 'divider', key: 'div-guest1'},
    { key: 'guest-courses', href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    { key: 'guest-ai', href: '/ai-prompt-generator', label: 'AI Prompts', icon: Palette, type: 'link' },
    { type: 'divider', key: 'div-guest-login'},
    { key: 'guest-login', href: '/login', label: 'Login', icon: LogIn, type: 'link' },
  ],
  student: [
    { type: 'userProfile', key: 'student-profile', name: 'Community Student', avatarUrl: 'https://placehold.co/40x40.png?text=CS', dataAiHint: "student community avatar" },
    { type: 'divider', key: 'div-student-profile-sep'},
    { key: 'std-dash', href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { key: 'std-academics', href: '#', label: 'Academics', icon: GraduationCap, type: 'link', showChevron: true }, // Placeholder link
    { key: 'std-invoice', href: '#', label: 'Invoice', icon: FileText, type: 'link' }, // Placeholder link
    { key: 'std-payment', href: '#', label: 'Payment History', icon: CreditCard, type: 'link' }, // Placeholder link
    { key: 'std-manage-profile', href: '#', label: 'Manage Profile', icon: UserCog, type: 'link' }, // Placeholder link
    { type: 'divider', key: 'div-std-logout'},
    { key: 'std-logout', label: 'Logout', icon: UserMinus, type: 'link', href: '/login', action: () => { localStorage.removeItem('currentUserRole'); localStorage.removeItem('currentUserDisplayName'); } },
  ],
  teacher: [
    { type: 'userProfile', key: 'teacher-profile', name: 'Gosfem Teacher', avatarUrl: 'https://placehold.co/40x40.png?text=W', dataAiHint: "teacher weblabs logo small" },
    { type: 'divider', key: 'div-teacher-profile-sep'},
    { key: 'tch-dash', href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { key: 'tch-download', href: '#', label: 'Download Page', icon: Download, type: 'link' },
    { key: 'tch-attendance', href: '#', label: 'Manage Attendance', icon: ClipboardList, type: 'link' },
    { key: 'tch-scores', href: '#', label: 'Student Scores', icon: BarChart3, type: 'link' },
    { key: 'tch-profile', href: '#', label: 'Manage Profile', icon: UserCog, type: 'link' },
    { type: 'divider', key: 'div-tch-logout'},
    { key: 'tch-logout', label: 'Logout', icon: UserMinus, type: 'link', href: '/login', action: () => { localStorage.removeItem('currentUserRole'); localStorage.removeItem('currentUserDisplayName'); } },
  ],
  parent: [
    { key: 'par-dash', href: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-par1'},
    { type: 'divider', key: 'div-par-logout'},
    { key: 'par-logout', label: 'Logout', icon: UserMinus, type: 'link', href: '/login', action: () => { localStorage.removeItem('currentUserRole'); localStorage.removeItem('currentUserDisplayName'); } },
  ],
  admin: [
    { type: 'userProfile', key: 'admin-profile', name: 'Administrator', dataAiHint: "admin avatar small" },
    { type: 'divider', key: 'div-admin-profile-sep'},
    { key: 'admin-dash', href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { key: 'admin-teachers', label: 'Teachers', icon: UserCheck, type: 'link', href: '/admin/users' }, 
    { key: 'admin-manage-students', label: 'Manage Students', icon: Users, type: 'link', href: '/admin/users' }, 
    { key: 'admin-attendance', label: 'Attendance', icon: CalendarCheck, type: 'link', href: '#' },
    { key: 'admin-parents', label: 'Parents', icon: UsersRound, type: 'link', href: '/admin/users' }, 
    { key: 'admin-subjects', label: 'Subjects', icon: BookOpen, type: 'link', href: '/admin/courses' }, 
    { key: 'admin-settings', label: 'System Settings', icon: Settings2, type: 'link', href: '#' },
    { key: 'admin-role-mgmt', label: 'Role Managements', icon: UserCog, type: 'link', href: '#' }, 
    { type: 'divider', key: 'div-admin-logout'},
    { key: 'admin-logout', label: 'Logout', icon: UserMinus, type: 'link', href: '/login', action: () => { localStorage.removeItem('currentUserRole'); localStorage.removeItem('currentUserDisplayName'); } },
  ],
};

const roleDisplayNames: Record<string, string | undefined> = {
    admin: "Administrator",
    teacher: "Gosfem Teacher",
    student: "Community Student", 
    parent: "Parent User",   
    guest: "Guest"
};


export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter(); 
  const [currentUserRole, setCurrentUserRole] = React.useState<'admin' | 'student' | 'teacher' | 'parent' | 'guest'>('guest');
  
  React.useEffect(() => {
    const storedRole = localStorage.getItem('currentUserRole') as typeof currentUserRole | null;
    let activeRole: typeof currentUserRole = 'guest';

    if (storedRole && navConfig[storedRole]) {
        activeRole = storedRole;
    } else if (pathname.startsWith('/student')) activeRole = 'student';
    else if (pathname.startsWith('/admin')) activeRole = 'admin';
    else if (pathname.startsWith('/teacher')) activeRole = 'teacher';
    else if (pathname.startsWith('/parent')) activeRole = 'parent';
    
    setCurrentUserRole(activeRole);

    // Update displayName in localStorage based on the determined activeRole
    const displayName = roleDisplayNames[activeRole];
    if (displayName) {
        localStorage.setItem('currentUserDisplayName', displayName);
    } else {
        localStorage.removeItem('currentUserDisplayName'); // Or set to a default like "Guest"
    }
     // Dispatch storage event to notify Header about the potential displayName change
    window.dispatchEvent(new Event("storage"));


  }, [pathname]);

  React.useEffect(() => {
    if (currentUserRole !== 'guest') { 
      localStorage.setItem('currentUserRole', currentUserRole);
      const displayName = roleDisplayNames[currentUserRole];
      if (displayName) {
          localStorage.setItem('currentUserDisplayName', displayName);
      } else {
          localStorage.removeItem('currentUserDisplayName');
      }
       // Dispatch storage event to notify Header about the potential displayName change
      window.dispatchEvent(new Event("storage"));
    }
  }, [currentUserRole]);


  const getNavItemsForRole = (role: 'admin' | 'student' | 'teacher' | 'parent' | 'guest'): NavigationElement[] => {
    return navConfig[role] || navConfig.guest;
  };
  
  const navItemsToDisplay = getNavItemsForRole(currentUserRole);

  const handleLogout = (itemAction?: () => void) => {
    if (itemAction) itemAction(); 
    setCurrentUserRole('guest'); 
    localStorage.removeItem('currentUserRole'); // Ensure role is cleared
    localStorage.removeItem('currentUserDisplayName'); // Ensure display name is cleared
    window.dispatchEvent(new Event("storage")); // Notify header
    router.push('/login'); 
  };

  return (
    <SidebarMenu className="p-2">
      {navItemsToDisplay.map((item, index) => {
        if (item.type === 'divider') {
          return <hr key={item.key || `divider-${index}`} className="my-2 border-sidebar-border" />;
        }
        if (item.type === 'header') {
          return (
            <SidebarGroupLabel key={item.key || `header-${index}`} className="px-2 py-1 mb-1 text-xs">
              {item.label}
            </SidebarGroupLabel>
          );
        }
        if (item.type === 'userProfile') {
          const avatarSrc = item.avatarUrl || `https://placehold.co/40x40.png?text=${item.name.charAt(0)}`;
          const avatarHint = item.dataAiHint || `${item.name.toLowerCase().replace(' ', '_')} avatar small`;
          return (
            <div key={item.key} className="px-2 py-2 flex items-center gap-3 mb-1 hover:bg-sidebar-accent rounded-md cursor-pointer group">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarSrc} alt={item.name} data-ai-hint={avatarHint} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-sidebar-foreground group-hover:text-sidebar-accent-foreground">{item.name}</span>
              <ChevronDown className="h-4 w-4 ml-auto text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground" />
            </div>
          );
        }
        
        const IconComponent = item.icon;
        const effectiveHref = item.href || '#'; 

        if (item.action && item.label === 'Logout') {
            return (
                <SidebarMenuItem key={item.key || item.href || `item-${index}`}>
                    <SidebarMenuButton 
                        onClick={() => handleLogout(item.action)}
                        className="w-full justify-start text-sm h-9"
                        variant={"ghost"}
                        asChild={false} 
                    >
                        <IconComponent className="h-5 w-5 mr-3 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden truncate">{item.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        }

        return (
          <SidebarMenuItem key={item.key || item.href || `item-${index}`}>
            <Link href={effectiveHref} passHref legacyBehavior>
              <SidebarMenuButton 
                isActive={pathname === effectiveHref} 
                className="w-full justify-start text-sm h-9"
                variant={pathname === effectiveHref ? "default" : "ghost"}
                asChild={false} 
              >
                <IconComponent className="h-5 w-5 mr-3 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">{item.label}</span>
                {item.showChevron && <ChevronRight className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" />}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
