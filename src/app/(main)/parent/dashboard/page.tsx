import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, Award, CalendarCheck2, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ParentDashboardPage() {
  // Mock data - replace with actual data fetching
  const parentName = "Mr. & Mrs. Smith";
  const childName = "Emily Smith";
  const childProgress = [
    { course: "Digital Art Fundamentals", grade: "A-", attendance: "95%" },
    { course: "Introduction to Animation", grade: "B+", attendance: "92%" },
  ];
  const recentActivity = [
    { date: "Oct 18, 2023", description: `${childName} submitted "Character Pose Study" for Digital Art.` },
    { date: "Oct 15, 2023", description: `New grade posted for ${childName}'s Animation mid-term.` },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <UsersRound className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl">Parent Dashboard</CardTitle>
          </div>
          <CardDescription>Welcome, {parentName}. Stay updated on {childName}'s progress and activities at Atelier Hub.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This space is designed to keep you informed and connected with your child's creative education.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={<Award className="h-8 w-8 text-accent" />}
          title={`${childName}'s Grades`}
          description="View current grades and academic performance."
          link="#" // Placeholder
        />
        <InfoCard
          icon={<CalendarCheck2 className="h-8 w-8 text-accent" />}
          title="Attendance Record"
          description="Check {childName}'s attendance for all courses."
          link="#" // Placeholder
        />
        <InfoCard
          icon={<Bell className="h-8 w-8 text-accent" />}
          title="School Announcements"
          description="Stay informed about important school news and events."
          link="#" // Placeholder
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{childName}'s Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {childProgress.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-lg bg-background hover:bg-muted/50">
              <h4 className="font-semibold text-lg">{item.course}</h4>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Grade: {item.grade}</span>
                <span>Attendance: {item.attendance}</span>
              </div>
            </div>
          ))}
           {childProgress.length === 0 && <p className="text-muted-foreground">{childName} is not currently enrolled in any courses.</p>}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity & Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start p-3 border rounded-lg bg-background hover:bg-muted/50">
              <div className="mr-3 pt-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
          {recentActivity.length === 0 && <p className="text-muted-foreground">No recent activity for {childName}.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function InfoCard({ icon, title, description, link }: InfoCardProps) {
  return (
    <Link href={link} className="block hover:no-underline">
      <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/50">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
          <div className="p-3 bg-primary/10 rounded-md text-primary">{icon}</div>
          <CardTitle className="text-xl">{title.replace("{childName}", "Your Child")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description.replace("{childName}", "your child")}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
