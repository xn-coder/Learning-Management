
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PlusSquare,
  ListChecks,
  CalendarDays,
  Plus,
  PlusCircle,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for dropdowns
const mockColours = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];

const mockStudentClubs = [
  { id: "club1", name: "Science Club" },
  { id: "club2", name: "Art Club" },
  { id: "club3", name: "Debate Club" },
];

export default function StudentActivityPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [activityDate, setActivityDate] = useState("29-05-2025");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  const tableHeaders = ["#", "Name", "Colour", "Icon", "Club", "Description", "Date", "Action"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Activity Category</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Activity Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="activityName" className="block text-sm font-medium text-foreground mb-1">Name</label>
                <Input id="activityName" placeholder="" />
              </div>
              <div>
                <label htmlFor="activityColour" className="block text-sm font-medium text-foreground mb-1">Colour</label>
                <Select>
                  <SelectTrigger id="activityColour">
                    <SelectValue placeholder="Select Colour" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockColours.map(col => (
                      <SelectItem key={col.value} value={col.value}>{col.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="iconPicker" className="block text-sm font-medium text-foreground mb-1">Icon Picker</label>
                <Input id="iconPicker" placeholder="" />
              </div>
              <div>
                <label htmlFor="studentClub" className="block text-sm font-medium text-foreground mb-1">Student Club</label>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger id="studentClub">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudentClubs.map(club => (
                        <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div>
                <label htmlFor="activityDescription" className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea id="activityDescription" placeholder="" className="min-h-[80px]" />
              </div>
              <div>
                <label htmlFor="activityDate" className="block text-sm font-medium text-foreground mb-1">Date</label>
                <div className="relative">
                  <Input 
                    id="activityDate" 
                    value={activityDate} 
                    onChange={(e) => setActivityDate(e.target.value)} 
                    placeholder="dd-mm-yyyy" 
                  />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                add
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Activities Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST
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
                            {header !== "#" && header !== "Action" && <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
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
