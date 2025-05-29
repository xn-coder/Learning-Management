
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CalendarCheck, // Using CalendarCheck for + ATTENDANCE icon
  CalendarDays,
  Search,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  ArrowUpDown,
  Save,
  CheckCircle, // For the green banner icon
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for dropdowns
const mockClasses = [
  { id: "class1", name: "Nursery One" },
  { id: "class2", name: "Class A" },
  { id: "class3", name: "Class B" },
];

const mockSections = [
  { id: "secA", name: "Section A" },
  { id: "secB", name: "Section B" },
];

export default function MarkAttendancePage() {
  const [currentDate, setCurrentDate] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(""); // For the input
  const [displayAttendanceDate, setDisplayAttendanceDate] = useState("29 MAY 2025"); // For the display section

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  const tableHeaders = ["#", "Image", "Name", "Sex", "Roll", "Status"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Attendance</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 py-3 px-4 border-b">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CalendarCheck className="h-5 w-5" />
            + ATTENDANCE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-foreground mb-1">Class</label>
              <Select>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-foreground mb-1">Section</label>
              <Select>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select Class First" />
                </SelectTrigger>
                <SelectContent>
                  {mockSections.map(sec => (
                    <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="attendanceDate" className="block text-sm font-medium text-foreground mb-1">Date</label>
              <div className="relative">
                <Input
                  id="attendanceDate"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="pr-10"
                />
                <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
          <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
            <Search className="mr-2 h-4 w-4" /> Get Student
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-muted/30 py-3 px-4 border-b">
          <CardTitle className="text-base font-medium">
            ATTENDANCE FOR: <span className="font-normal">SECTION: </span> <span className="font-bold">{displayAttendanceDate}</span>
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
                  {tableHeaders.map(header => (
                    <TableHead key={header} className="capitalize">
                      <div className="flex items-center gap-1">
                        {header}
                        <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} className="text-center h-24 text-muted-foreground">
                    No data available in table
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing 0 to 0 of 0 entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-4">
             <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white self-center">
                <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="default" className="w-full bg-green-500 hover:bg-green-600 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Clickatell SMS Gateway Selected
            </Button>
          </div>

        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
