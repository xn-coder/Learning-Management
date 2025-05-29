
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PlusSquare,
  ListChecks,
  Plus,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
  Edit3,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for dropdowns
const mockTeachers = [
  { id: "teacher1", name: "Gosfem Teacher" },
  { id: "teacher2", name: "Anya Sharma" },
  { id: "teacher3", name: "Ben Carter" },
];

const mockClassesData = [
  { id: "1", className: "Nursery One", numericName: "Nursery 1", teacher: "" },
  { id: "2", className: "Class A", numericName: "Class A", teacher: "Gosfem Teacher" },
];

export default function ManageClassesPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Class</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Class Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD CLASS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="className" className="block text-sm font-medium text-foreground mb-1">Name</label>
                <Input id="className" placeholder="" />
              </div>
              <div>
                <label htmlFor="nameNumeric" className="block text-sm font-medium text-foreground mb-1">Name Numeric</label>
                <Input id="nameNumeric" placeholder="" />
              </div>
              <div>
                <label htmlFor="teacher" className="block text-sm font-medium text-foreground mb-1">Teacher</label>
                <Select>
                  <SelectTrigger id="teacher">
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Class
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Class Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="mr-2 h-5 w-5" />
                LIST CLASS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" />Copy</Button>
                  <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" />CSV</Button>
                  <Button variant="outline" size="sm"><FileSpreadsheet className="mr-2 h-4 w-4" />Excel</Button>
                  <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" />PDF</Button>
                  <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" />Print</Button>
                </div>
                <div className="relative ml-auto flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <Input
                    type="search"
                    className="h-9 sm:w-[150px] md:w-[200px]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                         <div className="flex items-center gap-1"># <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Class Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Numeric Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Teacher <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead className="text-center w-[120px]">
                        <div className="flex items-center justify-center gap-1">Options <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClassesData.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell>{cls.id}</TableCell>
                        <TableCell className="font-medium">{cls.className}</TableCell>
                        <TableCell>{cls.numericName}</TableCell>
                        <TableCell>{cls.teacher}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="text-white bg-blue-500 hover:bg-blue-600 h-7 w-7 rounded-md p-1">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white bg-red-500 hover:bg-red-600 h-7 w-7 ml-1 rounded-md p-1">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1 to {mockClassesData.length} of {mockClassesData.length} entries</div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 text-white">1</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
