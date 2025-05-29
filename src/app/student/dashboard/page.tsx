import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, FileUp, GalleryHorizontalEnd, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function StudentDashboardPage() {
  // Mock data - replace with actual data fetching
  const studentName = "Alex Johnson";
  const enrolledCourses = [
    { id: "1", name: "Introduction to Digital Painting", progress: 75, nextLesson: "Color Theory Basics" },
    { id: "2", name: "Character Design Fundamentals", progress: 40, nextLesson: "Anatomy for Artists" },
  ];
  const recentSubmissions = [
    { id: "art001", title: "Sunset Landscape", status: "Reviewed", grade: "A" },
    { id: "art002", title: "Cyberpunk Alley", status: "Pending Review" },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl">Student Dashboard</CardTitle>
          </div>
          <CardDescription>Welcome back, {studentName}! Here's an overview of your artistic journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Continue your learning, submit new artwork, and manage your portfolio.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardLinkCard
          icon={<BookOpen className="h-8 w-8 text-accent" />}
          title="My Courses"
          description="Access your enrolled courses, track progress, and continue learning."
          link="/courses" // Should link to a "My Courses" page
        />
        <DashboardLinkCard
          icon={<FileUp className="h-8 w-8 text-accent" />}
          title="Submit Artwork"
          description="Share your latest creations for feedback and portfolio display."
          link="/student/submit-artwork"
        />
        <DashboardLinkCard
          icon={<GalleryHorizontalEnd className="h-8 w-8 text-accent" />}
          title="My Portfolio"
          description="View and manage your personal artwork gallery."
          link="/student/my-portfolio" // Dynamic ID will be handled later
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map(course => (
              <div key={course.id} className="p-3 border rounded-lg bg-background hover:bg-muted/50">
                <h4 className="font-semibold">{course.name}</h4>
                <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-xs text-right mt-1">{course.progress}% complete</p>
              </div>
            ))}
             {enrolledCourses.length === 0 && <p className="text-muted-foreground">No courses enrolled yet. <Link href="/courses" className="text-primary hover:underline">Explore courses</Link>.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSubmissions.map(submission => (
              <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-muted/50">
                <div>
                  <h4 className="font-semibold">{submission.title}</h4>
                  <p className={`text-sm ${submission.status === "Reviewed" ? "text-green-600" : "text-orange-500"}`}>
                    Status: {submission.status} {submission.grade && `(Grade: ${submission.grade})`}
                  </p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
            {recentSubmissions.length === 0 && <p className="text-muted-foreground">No submissions yet. <Link href="/student/submit-artwork" className="text-primary hover:underline">Submit your first piece</Link>.</p>}
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-accent/10 border-accent">
        <CardHeader className="flex flex-row items-center gap-4">
          <LightbulbIcon className="h-8 w-8 text-accent" />
          <div>
            <CardTitle className="text-accent">Feeling Uninspired?</CardTitle>
            <CardDescription className="text-accent/80">
              Try our AI Prompt Generator to spark your next creative project!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/ai-prompt-generator">Generate a Prompt</Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}

interface DashboardLinkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function DashboardLinkCard({ icon, title, description, link }: DashboardLinkCardProps) {
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

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}
