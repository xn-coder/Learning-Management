
"use client";
import Link from 'next/link';
import { 
    LayoutDashboard, Users, BookOpen, Palette, Settings, FileUp, 
    GalleryHorizontalEnd, ShieldAlert, GraduationCap, UserCheck, 
    UsersRound, LogIn, Home, CreditCard, Briefcase, BarChart3, 
    UserCog, CalendarCheck, Download, FileText, ShieldCheck, 
    ClipboardList, Banknote, BedDouble, Car, Settings2, FilePieChart, UserMinus, ChevronDown
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
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
  action?: () => void; // For logout
  key?: string; // Ensure key for map
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
    { key: 'std-dash', href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-std1'},
    { key: 'std-courses', href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    { key: 'std-portfolio', href: '/student/my-portfolio', label: 'My Portfolio', icon: GalleryHorizontalEnd, type: 'link' },
    { key: 'std-submit', href: '/student/submit-artwork', label: 'Submit Artwork', icon: FileUp, type: 'link' },
    { key: 'std-ai', href: '/ai-prompt-generator', label: 'AI Prompts', icon: Palette, type: 'link' },
    { type: 'divider', key: 'div-std-logout'},
    { key: 'std-logout', label: 'Logout', icon: UserMinus, type: 'link', action: () => { console.log("Logout student"); /* actual logout logic */ } },
  ],
  teacher: [
    { key: 'tch-dash', href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-tch1'},
    { key: 'tch-courses', href: '/courses', label: 'Course Catalog', icon: BookOpen, type: 'link' },
    { type: 'divider', key: 'div-tch-logout'},
    { key: 'tch-logout', label: 'Logout', icon: UserMinus, type: 'link', action: () => { console.log("Logout teacher"); } },
  ],
  parent: [
    { key: 'par-dash', href: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    { type: 'divider', key: 'div-par1'},
    { type: 'divider', key: 'div-par-logout'},
    { key: 'par-logout', label: 'Logout', icon: UserMinus, type: 'link', action: () => { console.log("Logout parent"); } },
  ],
  admin: [
    { type: 'userProfile', key: 'admin-profile', name: 'Administrator' },
    { type: 'divider', key: 'div-admin-profile-sep'},
    { key: 'admin-dash', href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'link', isDashboard: true },
    // { key: 'admin-academics', label: 'Academics', icon: GraduationCap, type: 'link', href: '#' }, // Example, replace # with actual links
    { key: 'admin-teachers', label: 'Teachers', icon: UserCheck, type: 'link', href: '/admin/users' }, // Assuming this maps to user management filtered for teachers
    { key: 'admin-manage-students', label: 'Manage Students', icon: Users, type: 'link', href: '/admin/users' }, // Assuming this maps to user management
    { key: 'admin-attendance', label: 'Attendance', icon: CalendarCheck, type: 'link', href: '#' },
    // { key: 'admin-download', label: 'Download Page', icon: Download, type: 'link', href: '#' },
    { key: 'admin-parents', label: 'Parents', icon: UsersRound, type: 'link', href: '/admin/users' }, // Assuming this maps to user management
    // { key: 'admin-class-section', label: 'Class & Section', icon: Briefcase, type: 'link', href: '#' },
    { key: 'admin-subjects', label: 'Subjects', icon: BookOpen, type: 'link', href: '/admin/courses' }, // Mapping to course management for now
    // { key: 'admin-exams', label: 'Exams', icon: ClipboardList, type: 'link', href: '#' },
    // { key: 'admin-student-scores', label: 'Student Scores', icon: BarChart3, type: 'link', href: '#' },
    // { key: 'admin-fee', label: 'Fee Collection', icon: Banknote, type: 'link', href: '#' },
    // { key: 'admin-expenses', label: 'Expenses', icon: CreditCard, type: 'link', href: '#' },
    // { key: 'admin-hostel', label: 'Hostel', icon: BedDouble, type: 'link', href: '#' },
    // { key: 'admin-transport', label: 'Transportation', icon: Car, type: 'link', href: '#' },
    { key: 'admin-settings', label: 'System Settings', icon: Settings2, type: 'link', href: '#' },
    // { key: 'admin-reports', label: 'Reports', icon: FilePieChart, type: 'link', href: '#' },
    { key: 'admin-role-mgmt', label: 'Role Managements', icon: UserCog, type: 'link', href: '#' }, // Or ShieldCheck
    { type: 'divider', key: 'div-admin-logout'},
    { key: 'admin-logout', label: 'Logout', icon: UserMinus, type: 'link', href: '/login', action: () => { console.log("Logout admin"); /* actual logout logic */ localStorage.removeItem('currentUserRole');} },
  ],
};


export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter(); // For navigation on logout
  const [currentUserRole, setCurrentUserRole] = React.useState<'admin' | 'student' | 'teacher' | 'parent' | 'guest'>('guest');
  
  React.useEffect(() => {
    // Try to get role from localStorage, or infer from path
    const storedRole = localStorage.getItem('currentUserRole') as typeof currentUserRole | null;
    if (storedRole && navConfig[storedRole]) {
        setCurrentUserRole(storedRole);
    } else if (pathname.startsWith('/student')) setCurrentUserRole('student');
    else if (pathname.startsWith('/admin')) setCurrentUserRole('admin');
    else if (pathname.startsWith('/teacher')) setCurrentUserRole('teacher');
    else if (pathname.startsWith('/parent')) setCurrentUserRole('parent');
    else setCurrentUserRole('guest');
  }, [pathname]);

  // Persist role on change
  React.useEffect(() => {
    if (currentUserRole !== 'guest') { // Don't persist guest role if it was inferred
      localStorage.setItem('currentUserRole', currentUserRole);
    }
  }, [currentUserRole]);


  const getNavItemsForRole = (role: 'admin' | 'student' | 'teacher' | 'parent' | 'guest'): NavigationElement[] => {
    let items = navConfig[role] || navConfig.guest;
    // For Admin, other roles might have their own landing pages not necessarily '/'
    if (role !== 'guest' && role !== 'admin' && !items.find(item => item.type === 'link' && item.href === '/')) {
      if(!items.find(i => i.type === 'link' && i.key === `${role}-home`)) {
        // items = [{ key: `${role}-home`, href: '/', label: 'Home', icon: Home, type: 'link' }, {type: 'divider', key: 'div-home'}, ...items];
      }
    }
    return items;
  };
  
  const navItemsToDisplay = getNavItemsForRole(currentUserRole);

  const handleLogout = (itemAction?: () => void) => {
    if (itemAction) itemAction();
    localStorage.removeItem('currentUserRole');
    setCurrentUserRole('guest'); // Update state
    router.push('/login'); // Navigate to login
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
          return (
            <div key={item.key} className="px-2 py-2 flex items-center gap-3 mb-1 hover:bg-sidebar-accent rounded-md cursor-pointer group">
              <Avatar className="h-9 w-9">
                <AvatarImage src={item.avatarUrl || "https://placehold.co/40x40.png"} alt={item.name} data-ai-hint="admin avatar small" />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-sidebar-foreground group-hover:text-sidebar-accent-foreground">{item.name}</span>
              <ChevronDown className="h-4 w-4 ml-auto text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground" />
            </div>
          );
        }
        
        // Item is a link
        const IconComponent = item.icon;
        const effectiveHref = item.href || '#'; // Default to '#' if href is undefined

        return (
          <SidebarMenuItem key={item.key || item.href || `item-${index}`}>
            {item.label === 'Logout' ? (
                 <SidebarMenuButton 
                    onClick={() => handleLogout(item.action)}
                    className="w-full justify-start text-sm h-9"
                    variant={"ghost"}
                    asChild={false} 
                  >
                    <IconComponent className="h-5 w-5 mr-3 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden truncate">{item.label}</span>
              </SidebarMenuButton>
            ) : (
            <Link href={effectiveHref} passHref legacyBehavior>
              <SidebarMenuButton 
                isActive={pathname === effectiveHref} 
                className="w-full justify-start text-sm h-9"
                variant={pathname === effectiveHref ? "default" : "ghost"}
                asChild={false} 
              >
                <IconComponent className="h-5 w-5 mr-3 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden truncate">{item.label}</span>
              </SidebarMenuButton>
            </Link>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
