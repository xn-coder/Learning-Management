import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, Settings, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          </div>
          <CardDescription>Welcome, Administrator. Manage users, courses, and site settings from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is your central hub for overseeing all aspects of Atelier Hub.
            Utilize the tools below to ensure the smooth operation of the platform.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardActionCard
          icon={<Users className="h-8 w-8 text-accent" />}
          title="Manage Users"
          description="View, edit, and manage all user accounts including students, teachers, and parents."
          link="/admin/users"
          linkText="Go to User Management"
        />
        <DashboardActionCard
          icon={<Settings className="h-8 w-8 text-accent" />}
          title="Manage Courses"
          description="Create, update, and organize course offerings in the catalog."
          link="/admin/courses"
          linkText="Go to Course Management"
        />
        <DashboardActionCard
          icon={<BarChart3 className="h-8 w-8 text-accent" />}
          title="View Analytics"
          description="Access reports and statistics on platform usage, course enrollment, and student progress."
          link="#" // Placeholder for analytics page
          linkText="View Site Analytics"
          disabled
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem label="Total Users" value="1,250" />
          <StatItem label="Active Courses" value="48" />
          <StatItem label="New Submissions" value="15" />
          <StatItem label="Pending Approvals" value="3" />
        </CardContent>
      </Card>
    </div>
  );
}

interface DashboardActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  disabled?: boolean;
}

function DashboardActionCard({ icon, title, description, link, linkText, disabled }: DashboardActionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <div className="p-3 bg-accent/10 rounded-md">{icon}</div>
        <div>
          <CardTitle className="text-xl mb-1">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="w-full" disabled={disabled}>
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
