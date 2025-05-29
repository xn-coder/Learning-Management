
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UsersRound, Briefcase, BarChartHorizontalBig } from "lucide-react"; // Added BarChartHorizontalBig for placeholder

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconBgColor: string; // Tailwind CSS class for background color
}

function StatCard({ title, value, icon: Icon, iconBgColor }: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6 flex flex-col min-h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Students" value="1" icon={Users} iconBgColor="bg-cyan-500" />
        <StatCard title="Teachers" value="1" icon={GraduationCap} iconBgColor="bg-lime-500" />
        <StatCard title="Parents" value="0" icon={UsersRound} iconBgColor="bg-blue-500" />
        <StatCard title="Attendance" value="0" icon={Briefcase} iconBgColor="bg-slate-700" />
      </div>

      <Card className="flex-grow flex items-center justify-center bg-card border shadow-sm">
        <CardContent className="text-center p-6">
           {/* Placeholder for future content or the wave graphic */}
           <svg width="80" height="20" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/50 mx-auto">
            <path d="M0 15 Q 15 30, 30 15 T 60 15 T 90 15 T 120 15" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-muted-foreground mt-4">Your academic overview will appear here.</p>
        </CardContent>
      </Card>
      
      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
