
"use client";
import Link from 'next/link';
import { 
    LayoutDashboard, Users, BookOpen, Palette, Settings, FileUp, 
    GalleryHorizontalEnd, ShieldAlert, GraduationCap, UserCheck, 
    UsersRound, LogIn, Home, CreditCard, Briefcase, BarChart3, 
    UserCog, CalendarCheck, Download, FileText, ShieldCheck, 
    ClipboardList, Banknote, BedDouble, Car, Settings2, FilePieChart, UserMinus, ChevronDown, ChevronRight,
    ListFilter, List, Users2, Send, BookCopy, CalendarPlus // Added icons for Academics sub-menu
} from 'lucide-react'; 
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
  type?: 'link'; // Could be 'link', 'button', 'dropdownTrigger'
  isDashboard?: boolean;
  action?: () => void; 
  key: string; // Make key mandatory for all items for easier state management
  showChevron?: boolean; // For non-expandable items that still show a chevron
  children?: NavItem[]; // For expandable sub-menus
  isSubItem?: boolean; // To help with styling/indentation
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
    { key: 'std-academics', href: '#', label: 'Academics', icon: GraduationCap, type: 'link', showChevron: true }, 
    { key: 'std-invoice', href: '#', label: 'Invoice', icon: FileText, type: 'link' }, 
    { key: 'std-payment', href: '#', label: 'Payment History', icon: CreditCard, type: 'link' }, 
    { key: 'std-manage-profile', href: '#', label: 'Manage Profile', icon: UserCog, type: 'link' }, 
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
    { 
      key: 'admin-academics', 
      label: 'Academics', 
      icon: GraduationCap, 
      type: 'link', // Will act as trigger
      children: [
        { key: 'admin-enq-cat', href: '/admin/academics/enquiry-category', label: 'Enquiry Category', icon: ListFilter, type: 'link', isSubItem: true },
        { key: 'admin-list-enq', href: '/admin/academics/list-enquiries', label: 'List Enquiries', icon: List, type: 'link', isSubItem: true },
        { key: 'admin-school-clubs', href: '/admin/academics/school-clubs', label: 'School Clubs', icon: Users2, type: 'link', isSubItem: true },
        { key: 'admin-manage-circ', href: '/admin/academics/manage-circular', label: 'Manage Circular', icon: Send, type: 'link', isSubItem: true },
        { key: 'admin-syllabus', href: '/admin/academics/syllabus', label: 'Syllabus', icon: BookCopy, type: 'link', isSubItem: true },
        { key: 'admin-manage-events', href: '/admin/academics/manage-events', label: 'Manage Events', icon: CalendarPlus, type: 'link', isSubItem: true },
      ]
    },
    { key: 'admin-teachers', label: 'Teachers', icon: UserCheck, type: 'link', href: '/admin/users', showChevron: true }, 
    { key: 'admin-manage-students', label: 'Manage Students', icon: Users, type: 'link', href: '/admin/users', showChevron: true }, 
    { key: 'admin-attendance', label: 'Attendance', icon: CalendarCheck, type: 'link', href: '#', showChevron: true },
    { key: 'admin-download', label: 'Download Page', icon: Download, type: 'link', href: '#', showChevron: true },
    { key: 'admin-parents', label: 'Parents', icon: UsersRound, type: 'link', href: '/admin/users', showChevron: true }, 
    // Placeholder for Accountant dropdown - not implementing fully yet
    // { key: 'admin-accountant', label: 'Accountant', icon: Banknote, type: 'link', showChevron: true, children: [ /* ...sub-items... */ ]},
    { key: 'admin-settings', label: 'System Settings', icon: Settings2, type: 'link', href: '#', showChevron: true },
    { key: 'admin-role-mgmt', label: 'Role Managements', icon: UserCog, type: 'link', href: '#', showChevron: true }, 
    { key: 'admin-user-profile', label: 'Profile', icon: UserCog, type: 'link', href: '#', showChevron: true }, // Added Profile link
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
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const toggleExpand = (itemKey: string) => {
    setExpandedItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };
  
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

    const displayName = roleDisplayNames[activeRole];
    if (displayName) {
        localStorage.setItem('currentUserDisplayName', displayName);
    } else {
        localStorage.removeItem('currentUserDisplayName'); 
    }
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
    localStorage.removeItem('currentUserRole'); 
    localStorage.removeItem('currentUserDisplayName'); 
    window.dispatchEvent(new Event("storage")); 
    router.push('/login'); 
  };

  const renderNavItem = (item: NavItem, isSubmenuItem = false) => {
    const IconComponent = item.icon;
    const effectiveHref = item.href || '#';
    const isExpanded = !!expandedItems[item.key];

    if (item.action && item.label === 'Logout') {
      return (
        <SidebarMenuItem key={item.key}>
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

    if (item.children && item.children.length > 0) {
      return (
        <React.Fragment key={item.key}>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => toggleExpand(item.key)}
              className="w-full justify-start text-sm h-9"
              variant={pathname.startsWith(effectiveHref) && effectiveHref !== '#' ? "default" : "ghost"}
              asChild={false}
              aria-expanded={isExpanded}
            >
              <IconComponent className="h-5 w-5 mr-3 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">{item.label}</span>
              {isExpanded ? <ChevronDown className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" /> : <ChevronRight className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" />}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {isExpanded && (
            <ul className="pl-4 list-none"> {/* Using ul for sub-menu for semantics, styling will make it look like sidebar items */}
              {item.children.map(child => renderNavItem(child, true))}
            </ul>
          )}
        </React.Fragment>
      );
    }
    
    // Regular link item or sub-item
    return (
      <SidebarMenuItem key={item.key} className={isSubmenuItem ? "ml-3" : ""}> {/* Indent sub-items */}
        <Link href={effectiveHref} passHref legacyBehavior>
          <SidebarMenuButton 
            isActive={pathname === effectiveHref} 
            className={`w-full justify-start text-sm h-9 ${isSubmenuItem ? 'pl-5' : ''}`} // Add more padding for sub-items
            variant={pathname === effectiveHref ? "default" : "ghost"}
            asChild={false} 
          >
            <IconComponent className={`h-4 w-4 mr-3 shrink-0 ${isSubmenuItem ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} /> {/* Smaller icon for sub-items */}
            <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">{item.label}</span>
            {item.showChevron && !item.children && <ChevronRight className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" />}
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };


  return (
    <SidebarMenu className="p-2">
      {navItemsToDisplay.map((element, index) => {
        if (element.type === 'divider') {
          return <hr key={element.key || `divider-${index}`} className="my-2 border-sidebar-border" />;
        }
        if (element.type === 'header') {
          return (
            <SidebarGroupLabel key={element.key || `header-${index}`} className="px-2 py-1 mb-1 text-xs">
              {element.label}
            </SidebarGroupLabel>
          );
        }
        if (element.type === 'userProfile') {
          const avatarSrc = element.avatarUrl || `https://placehold.co/40x40.png?text=${element.name.charAt(0)}`;
          const avatarHint = element.dataAiHint || `${element.name.toLowerCase().replace(' ', '_')} avatar small`;
          return (
            <div key={element.key} className="px-2 py-2 flex items-center gap-3 mb-1 hover:bg-sidebar-accent rounded-md cursor-pointer group">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarSrc} alt={element.name} data-ai-hint={avatarHint} />
                <AvatarFallback>{element.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-sidebar-foreground group-hover:text-sidebar-accent-foreground">{element.name}</span>
              <ChevronRight className="h-4 w-4 ml-auto text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground" />
            </div>
          );
        }
        
        // Assuming element is NavItem from here
        return renderNavItem(element as NavItem);
      })}
    </SidebarMenu>
  );
}

