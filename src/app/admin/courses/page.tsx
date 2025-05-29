import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, BookUp, Search, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { courses as mockCoursesData } from '@/data/courses'; // Using existing mock courses

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Course Management
          </h1>
          <p className="text-muted-foreground">Create, edit, and manage all courses offered on Atelier Hub.</p>
        </div>
        <Button>
          <BookUp className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>A list of all courses currently in the system.</CardDescription>
           <div className="pt-4 flex gap-4">
            <div className="relative flex-grow">
              <Input placeholder="Search courses by title or instructor..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/> Filters</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCoursesData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell><Badge variant="secondary">{course.category}</Badge></TableCell>
                  <TableCell><Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'outline' : 'destructive'}>{course.level}</Badge></TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-accent/30">
        <CardHeader>
          <CardTitle className="text-accent">Admin Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-accent/80">
            This section allows administrators to manage the course catalog. Functionalities would include
            adding new courses, editing existing details (content, instructor, schedule), and publishing or unpublishing courses.
            Currently, this is a visual representation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
