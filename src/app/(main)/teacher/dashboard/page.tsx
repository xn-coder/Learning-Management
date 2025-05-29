
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Briefcase, CalendarCheck, UserCog } from "lucide-react"; // Using UserCog for Parent-like icon, Briefcase for Attendance wallet icon

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

// Mock data, similar to Admin dashboard
const mockTeachers = [
  { id: "t1", name: "Gosfem Teacher", email: "teacher@teacher.com", phone: "8033527716", avatarUrl: "https://placehold.co/40x40.png?text=W", dataAiHint: "teacher weblabs logo" },
];

const mockStudents = [
  { id: "s1", name: "Community Student", email: "student@student.com", phone: "+912345667", avatarUrl: "https://placehold.co/40x40.png", dataAiHint: "student community" },
];


export default function TeacherDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Student" value="1" icon={Users} iconBgColor="bg-cyan-500" />
        <StatCard title="Parent" value="0" icon={UserCog} iconBgColor="bg-lime-500" /> {/* UserCog for parent-like icon */}
        <StatCard title="All Teachers" value="1" icon={Users} iconBgColor="bg-blue-500" />
        <StatCard title="Attendance" value="0" icon={Briefcase} iconBgColor="bg-slate-700" /> {/* Briefcase for wallet-like icon */}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>RECENTLY ADDED TEACHERS</CardTitle>
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
                        <AvatarImage src={teacher.avatarUrl} alt={teacher.name} data-ai-hint={teacher.dataAiHint} />
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
            <CardTitle>RECENTLY ADDED STUDENTS</CardTitle>
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
                        <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.dataAiHint} />
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
