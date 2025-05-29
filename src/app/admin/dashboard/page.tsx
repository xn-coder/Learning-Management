
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, GraduationCap, BookMarked, DollarSign, UserCog, UserCheck, Briefcase, TrendingUp, TrendingDown, CalendarDays, BarChartHorizontalBig } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const mockTeachers = [
  { id: "t1", name: "Gosfem Teacher", email: "teacher@teacher.com", phone: "8033527716", avatarUrl: "https://placehold.co/40x40.png" },
  { id: "t2", name: "Dr. Anya Sharma", email: "anya.sharma@example.com", phone: "+1234567891", avatarUrl: "https://placehold.co/40x40.png" },
];

const mockStudents = [
  { id: "s1", name: "Community Student", email: "student@student.com", phone: "+912345667", avatarUrl: "https://placehold.co/40x40.png" },
  { id: "s2", name: "Alex Johnson", email: "alex.j@example.com", phone: "+1987654321", avatarUrl: "https://placehold.co/40x40.png" },
];

export default function AdminDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }); // e.g., 29 May,2025

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard title="Students" value="1" icon={Users} iconBgColor="bg-sky-500" />
        <StatCard title="Teachers" value="1" icon={GraduationCap} iconBgColor="bg-lime-500" />
        <StatCard title="Parents" value="0" icon={Users} iconBgColor="bg-blue-500" />
        <StatCard title="Assignment" value="0" icon={BookMarked} iconBgColor="bg-slate-700" />
        <StatCard title="Expense" value="INR" icon={TrendingDown} iconBgColor="bg-red-500" />
        <StatCard title="Income" value="INR" icon={TrendingUp} iconBgColor="bg-green-500" />
        <StatCard title="Admin" value="1" icon={UserCog} iconBgColor="bg-indigo-500" />
        <StatCard title="Attendance" value="0" icon={UserCheck} iconBgColor="bg-amber-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistics Overview 1</CardTitle>
            <CardDescription>Placeholder for a chart or graph.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
            <BarChartHorizontalBig className="h-16 w-16 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Statistics Overview 2</CardTitle>
            <CardDescription>Placeholder for another chart or graph.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/50 rounded-md">
            <BarChartHorizontalBig className="h-16 w-16 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={teacher.avatarUrl || `https://placehold.co/40x40.png?text=${teacher.name.charAt(0)}`} alt={teacher.name} data-ai-hint="teacher avatar" />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Added Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                       <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatarUrl || `https://placehold.co/40x40.png?text=${student.name.charAt(0)}`} alt={student.name} data-ai-hint="student avatar" />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
