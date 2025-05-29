
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListChecks, ArrowUpDown, UserRound, Edit3, XCircle, Eye } from "lucide-react"; // Added Eye for view action
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for dropdowns - can be expanded or fetched
const mockClasses = [
  { id: "class1", name: "Nursery One" },
  { id: "class2", name: "Class A" },
  { id: "class3", name: "Class B" },
  // Add more classes as needed
];

const mockStudentsData = [
  // Example student data structure if needed later
  // {
  //   id: "1",
  //   imageUrl: "https://placehold.co/40x40.png",
  //   name: "John Doe",
  //   class: "Class A",
  //   sex: "Male",
  //   email: "john.doe@example.com",
  //   phone: "123-456-7890",
  //   parent: "Jane Doe",
  //   dataAiHint: "student avatar"
  // },
];


export default function ListStudentsPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [students, setStudents] = useState(mockStudentsData); // Use mockStudentsData

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  const handleGetStudents = () => {
    // In a real app, you would filter students based on selectedClass
    // For now, this button is illustrative
    console.log("Fetching students for class:", selectedClass);
    // setStudents(filteredStudents); // Update students state with fetched/filtered data
  };

  const tableHeaders = ["#", "Image", "Name", "Class", "Sex", "Email", "Phone", "Parent", "Actions"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">List Student</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 py-3 px-4 border-b">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            LIST STUDENTS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto sm:flex-grow">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGetStudents} 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Student
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select defaultValue="25">
                <SelectTrigger className="w-[70px] h-9">
                  <SelectValue placeholder="25" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">entries</span>
            </div>
            <div className="relative flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Search:</span>
              <Input
                type="search"
                className="h-9 sm:w-[200px] md:w-[250px]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHeaders.map(header => (
                    <TableHead key={header} className="capitalize">
                      <div className="flex items-center gap-1">
                        {header}
                        {header !== "#" && header !== "Image" && header !== "Actions" && <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={tableHeaders.length} className="text-center h-24 text-muted-foreground">
                      No data available in table
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={student.imageUrl} alt={student.name} data-ai-hint={student.dataAiHint} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.sex}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.parent}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="text-white bg-blue-500 hover:bg-blue-600 h-7 w-7 rounded-md p-1">
                            <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white bg-red-500 hover:bg-red-600 h-7 w-7 ml-1 rounded-md p-1">
                            <XCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white bg-yellow-500 hover:bg-yellow-600 h-7 w-7 ml-1 rounded-md p-1">
                            <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing {students.length > 0 ? `1 to ${students.length}` : '0 to 0'} of {students.length} entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled={students.length === 0}>Previous</Button>
              {/* <Button variant="default" size="sm" className="w-8 h-8 p-0">1</Button> */}
              <Button variant="outline" size="sm" disabled={students.length === 0}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
