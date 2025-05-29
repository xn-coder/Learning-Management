import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, BookOpenText, Edit3, CalendarDays, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TeacherDashboardPage() {
  const teacherName = "Dr. Evelyn Reed";
  const assignedCourses = [
    { id: "1", name: "Advanced Digital Illustration", studentCount: 25, newSubmissions: 5 },
    { id: "3", name: "History of Art: Renaissance to Modern", studentCount: 18, newSubmissions: 2 },
  ];
  const upcomingEvents = [
    { id: "evt1", title: "Guest Lecture: AI in Art", date: "Oct 25, 2023", time: "2:00 PM" },
    { id: "evt2", title: "Mid-term Critiques (ADI)", date: "Nov 2, 2023", time: "All Day" },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <UserCheck className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl">Teacher Dashboard</CardTitle>
          </div>
          <CardDescription>Welcome back, {teacherName}. Manage your courses, students, and academic activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Here you can find quick access to your teaching responsibilities and tools.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardActionLink
          icon={<BookOpenText className="h-8 w-8 text-accent" />}
          title="My Courses"
          description="Access course materials, student lists, and manage assignments."
          link="#" // Placeholder for My Courses page
        />
        <DashboardActionLink
          icon={<Edit3 className="h-8 w-8 text-accent" />}
          title="Grade Submissions"
          description="Review and grade student artwork and assignments."
          link="#" // Placeholder for Grading page
        />
        <DashboardActionLink
          icon={<CalendarDays className="h-8 w-8 text-accent" />}
          title="My Schedule"
          description="View your teaching schedule, office hours, and important dates."
          link="#" // Placeholder for Schedule page
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assigned Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignedCourses.map(course => (
              <div key={course.id} className="p-4 border rounded-lg bg-background hover:bg-muted/50">
                <h4 className="font-semibold text-lg">{course.name}</h4>
                <p className="text-sm text-muted-foreground">{course.studentCount} Students</p>
                {course.newSubmissions > 0 && (
                  <p className="text-sm text-primary mt-1">{course.newSubmissions} New Submissions</p>
                )}
                <Button variant="outline" size="sm" className="mt-2">Manage Course</Button>
              </div>
            ))}
             {assignedCourses.length === 0 && <p className="text-muted-foreground">No courses assigned yet.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events & Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start justify-between p-3 border rounded-lg bg-background hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.date} - {event.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">Details</Button>
              </div>
            ))}
            {upcomingEvents.length === 0 && <p className="text-muted-foreground">No upcoming events.</p>}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

interface DashboardActionLinkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function DashboardActionLink({ icon, title, description, link }: DashboardActionLinkProps) {
  return (
    <Link href={link} className="block hover:no-underline">
      <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/50">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
          <div className="p-3 bg-primary/10 rounded-md text-primary">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
