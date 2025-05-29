
"use client";
import Link from 'next/link';
import { 
    LayoutDashboard, Users, BookOpen, Palette, Settings, FileUp, 
    GalleryHorizontalEnd, ShieldAlert, GraduationCap, UserCheck, 
    UsersRound, LogIn, Home, CreditCard, Briefcase, BarChart3, 
    UserCog, CalendarCheck, Download, FileText, ShieldCheck, 
    ClipboardList, Banknote, BedDouble, Car, Settings2, FilePieChart, UserMinus, ChevronDown, ChevronRight,
    ListFilter, List, Users2, Send, BookCopy, CalendarPlus, Building, FilePlus2, Tag, Activity, PencilLine,
    Eye, Columns, RectangleHorizontal, SquareStack, ClipboardEdit, FileQuestion, FilePlus, UserSquare, Landmark,
    FileSpreadsheet, TrendingDown, Archive, Hotel, Building2, BedSingle, Bus, Route, Truck, SlidersHorizontal,
    MessageSquareText, Languages, Receipt, CalendarClock, Percent, UserPlus, ListChecks, User // Added User here
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
      type: 'link', 
      children: [
        { key: 'admin-enq-cat', href: '/admin/academics/enquiry-category', label: 'Enquiry Category', icon: ListFilter, type: 'link', isSubItem: true },
        { key: 'admin-list-enq', href: '/admin/academics/list-enquiries', label: 'List Enquiries', icon: List, type: 'link', isSubItem: true },
        { key: 'admin-school-clubs', href: '/admin/academics/school-clubs', label: 'School Clubs', icon: Users2, type: 'link', isSubItem: true },
        { key: 'admin-manage-circ', href: '/admin/academics/manage-circular', label: 'Manage Circular', icon: Send, type: 'link', isSubItem: true },
        { key: 'admin-syllabus', href: '/admin/academics/syllabus', label: 'Syllabus', icon: BookCopy, type: 'link', isSubItem: true },
        { key: 'admin-manage-events', href: '/admin/academics/manage-events', label: 'Manage Events', icon: CalendarPlus, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-teachers-parent', 
      label: 'Teachers', 
      icon: UserCheck, 
      type: 'link', 
      children: [
        { key: 'admin-teachers-dept', href: '/admin/teachers/department', label: 'Department', icon: Building, type: 'link', isSubItem: true },
        { key: 'admin-teachers-list', href: '/admin/teachers/list', label: 'Teachers', icon: Users, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-manage-students-parent', 
      label: 'Manage Students', 
      icon: Users, 
      type: 'link', 
      children: [
        { key: 'admin-students-admission', href: '/admin/students/admission-form', label: 'Admission Form', icon: FilePlus2, type: 'link', isSubItem: true },
        { key: 'admin-students-list', href: '/admin/students/list-students', label: 'List Students', icon: ListChecks, type: 'link', isSubItem: true },
        { key: 'admin-students-categories', href: '/admin/students/student-categories', label: 'Student Categories', icon: Tag, type: 'link', isSubItem: true },
        { key: 'admin-students-house', href: '/admin/students/student-house', label: 'Student House', icon: Home, type: 'link', isSubItem: true },
        { key: 'admin-students-activity', href: '/admin/students/student-activity', label: 'Student Activity', icon: Activity, type: 'link', isSubItem: true },
        { key: 'admin-students-social', href: '/admin/students/social-category', label: 'Social Category', icon: Users2, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-attendance-parent', 
      label: 'Attendance', 
      icon: CalendarCheck, 
      type: 'link', 
      children: [
        { key: 'admin-attendance-mark', href: '/admin/attendance/mark', label: 'Mark Attendance', icon: PencilLine, type: 'link', isSubItem: true },
        { key: 'admin-attendance-view', href: '/admin/attendance/view', label: 'View Attendance', icon: Eye, type: 'link', isSubItem: true },
        { key: 'admin-attendance-teacher', href: '/admin/attendance/teacher', label: 'Teacher Attendance', icon: UserCheck, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-download-parent', 
      label: 'Download Page', 
      icon: Download, 
      type: 'link', 
      children: [
        { key: 'admin-download-assignments', href: '/admin/download/assignments', label: 'Assignments', icon: FileText, type: 'link', isSubItem: true },
        { key: 'admin-download-materials', href: '/admin/download/study-materials', label: 'Study Materials', icon: BookOpen, type: 'link', isSubItem: true },
      ]
    },
    { key: 'admin-parents', label: 'Parents', icon: UsersRound, type: 'link', href: '/admin/users', showChevron: true }, 
    {
      key: 'admin-class-section',
      label: 'Class & Section',
      icon: Columns,
      type: 'link',
      children: [
        { key: 'admin-manage-classes', href: '/admin/class-section/manage-classes', label: 'Manage Classes', icon: RectangleHorizontal, type: 'link', isSubItem: true },
        { key: 'admin-manage-sections', href: '/admin/class-section/manage-sections', label: 'Manage Sections', icon: SquareStack, type: 'link', isSubItem: true },
      ]
    },
    { key: 'admin-subjects', href: '/admin/subjects', label: 'Subjects', icon: ListChecks, type: 'link', showChevron: true },
    {
      key: 'admin-exams',
      label: 'Exams',
      icon: ClipboardEdit,
      type: 'link',
      children: [
        { key: 'admin-question-paper', href: '/admin/exams/question-paper', label: 'Question Paper', icon: FileQuestion, type: 'link', isSubItem: true },
        { key: 'admin-add-examination', href: '/admin/exams/add-examination', label: 'Add Examination', icon: FilePlus, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-student-scores',
      label: 'Student Scores',
      icon: BarChart3,
      type: 'link',
      children: [
        { key: 'admin-scores-class-teacher', href: '/admin/student-scores/class-teacher', label: 'Class Teacher', icon: UserSquare, type: 'link', isSubItem: true },
        { key: 'admin-scores-subject-teacher', href: '/admin/student-scores/subject-teacher', label: 'Subject Teacher', icon: User, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-fee-collection',
      label: 'Fee Collection',
      icon: Banknote,
      type: 'link',
      children: [
        { key: 'admin-collect-fees', href: '/admin/fee-collection/collect-fees', label: 'Collect Fees', icon: Landmark, type: 'link', isSubItem: true },
        { key: 'admin-manage-invoice', href: '/admin/fee-collection/manage-invoice', label: 'Manage Invoice', icon: FileSpreadsheet, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-expenses',
      label: 'Expenses',
      icon: TrendingDown,
      type: 'link',
      children: [
        { key: 'admin-expense-add', href: '/admin/expenses/expense', label: 'Expense', icon: CreditCard, type: 'link', isSubItem: true },
        { key: 'admin-expense-category', href: '/admin/expenses/expense-category', label: 'Expense Category', icon: Archive, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-hostel',
      label: 'Hostel',
      icon: BedDouble,
      type: 'link',
      children: [
        { key: 'admin-hostel-manage', href: '/admin/hostel/manage-hostel', label: 'Manage Hostel', icon: Hotel, type: 'link', isSubItem: true },
        { key: 'admin-hostel-category', href: '/admin/hostel/hostel-category', label: 'Hostel Category', icon: Building2, type: 'link', isSubItem: true },
        { key: 'admin-hostel-room', href: '/admin/hostel/hostel-room', label: 'Hostel Room', icon: BedSingle, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-transportation',
      label: 'Transportation',
      icon: Car,
      type: 'link',
      children: [
        { key: 'admin-transport-manage', href: '/admin/transportation/transport', label: 'Transport', icon: Bus, type: 'link', isSubItem: true },
        { key: 'admin-transport-route', href: '/admin/transportation/transport-route', label: 'Transport Route', icon: Route, type: 'link', isSubItem: true },
        { key: 'admin-transport-vehicle', href: '/admin/transportation/manage-vehicle', label: 'Manage Vehicle', icon: Truck, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-system-settings-parent', 
      label: 'System Settings', 
      icon: Settings2, 
      type: 'link', 
      children: [
        { key: 'admin-settings-general', href: '/admin/system-settings/general', label: 'General Settings', icon: SlidersHorizontal, type: 'link', isSubItem: true },
        { key: 'admin-settings-sms', href: '/admin/system-settings/sms-api', label: 'Manage SMS API', icon: MessageSquareText, type: 'link', isSubItem: true },
        { key: 'admin-settings-language', href: '/admin/system-settings/language', label: 'Manage Language', icon: Languages, type: 'link', isSubItem: true },
        { key: 'admin-settings-payment', href: '/admin/system-settings/payment', label: 'Payment Settings', icon: CreditCard, type: 'link', isSubItem: true },
      ]
    },
    {
      key: 'admin-reports',
      label: 'Reports',
      icon: FilePieChart,
      type: 'link',
      children: [
        { key: 'admin-reports-student-payments', href: '/admin/reports/student-payments', label: 'Student Payments', icon: Receipt, type: 'link', isSubItem: true },
        { key: 'admin-reports-attendance', href: '/admin/reports/attendance', label: 'Attendance Report', icon: CalendarClock, type: 'link', isSubItem: true },
        { key: 'admin-reports-exam-mark', href: '/admin/reports/exam-mark', label: 'Exam Mark Report', icon: Percent, type: 'link', isSubItem: true },
      ]
    },
    { 
      key: 'admin-role-mgmt-parent', 
      label: 'Role Managements', 
      icon: UserCog, 
      type: 'link', 
      children: [
        { key: 'admin-role-new-admin', href: '/admin/role-managements/new-admin', label: 'New Admin', icon: UserPlus, type: 'link', isSubItem: true },
      ]
    },
    { key: 'admin-user-profile', label: 'Profile', icon: UserCog, type: 'link', href: '#', showChevron: true },
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
      // Check if any child item is active to make the parent active
      const isAnyChildActive = item.children.some(child => child.href && pathname.startsWith(child.href));
      
      return (
        <React.Fragment key={item.key}>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => toggleExpand(item.key)}
              className="w-full justify-start text-sm h-9"
              variant={isAnyChildActive ? "default" : "ghost"} // Parent active if child is active
              asChild={false}
              aria-expanded={isExpanded}
            >
              <IconComponent className="h-5 w-5 mr-3 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden truncate flex-grow">{item.label}</span>
              {isExpanded ? <ChevronDown className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" /> : <ChevronRight className="h-4 w-4 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden" />}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {isExpanded && (
            <ul className="pl-4 list-none"> 
              {item.children.map(child => renderNavItem(child, true))}
            </ul>
          )}
        </React.Fragment>
      );
    }
    
    // Regular link item or sub-item
    const isActive = pathname === effectiveHref || (effectiveHref !== '#' && pathname.startsWith(effectiveHref));
    return (
      <SidebarMenuItem key={item.key} className={isSubmenuItem ? "ml-3" : ""}> 
        <Link href={effectiveHref} passHref legacyBehavior>
          <SidebarMenuButton 
            isActive={isActive} 
            className={`w-full justify-start text-sm h-9 ${isSubmenuItem ? 'pl-5' : ''}`} 
            variant={isActive ? "default" : "ghost"}
            asChild={false} 
          >
            <IconComponent className={`h-4 w-4 mr-3 shrink-0 ${isSubmenuItem ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} /> 
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

