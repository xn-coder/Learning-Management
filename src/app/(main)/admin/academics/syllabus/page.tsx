
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
  Plus,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
  UploadCloud,
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for dropdowns
const mockClasses = [
  { id: "class1", name: "Nursery One" },
  { id: "class2", name: "Class A" },
  { id: "class3", name: "Class B" },
];

const mockSubjects = [
  { id: "subj1", name: "Mathematics" },
  { id: "subj2", name: "English Language" },
  { id: "subj3", name: "Basic Science" },
];


export default function SyllabusPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  const tableHeaders = ["#", "Title", "Description", "Subject", "Uploader", "Date", "File Name"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Academic Syllabus</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Syllabus Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD SYLLABUS
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="syllabusTitle" className="block text-sm font-medium text-foreground mb-1">Title</label>
                <Input id="syllabusTitle" placeholder="Enter syllabus title" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea id="description" placeholder="Enter syllabus description" className="min-h-[80px]" />
              </div>
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
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map(sub => (
                      <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="browseFile" className="block text-sm font-medium text-foreground mb-1">Browse File</label>
                <Input id="browseFile" type="file" />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Syllabus
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Syllabus Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST SYLLABUS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">Class: Nursery One</Button>
                <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">Class: Class A</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 items-center">
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

              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tableHeaders.map(header => (
                        <TableHead key={header} className="capitalize">
                          <div className="flex items-center gap-1">
                            {header}
                            {header !== "#" && <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
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
