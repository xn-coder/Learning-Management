
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  PlusSquare,
  ListChecks,
  CalendarDays,
  Plus,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useState, useEffect } from "react";

const mockExams = [
  { id: "1", title: "First Term Examination", description: "First Term", date: "2021-01-15" },
  { id: "2", title: "2020/2021 FIRST TERM EXAMINATION", description: "2020/2021 FIRST TERM EXAMINATION", date: "2020-10-20" },
];

export default function AddExaminationPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [examDate, setExamDate] = useState("29-05-2025"); // Default as per image

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create Exam</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Exam Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD EXAM
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="examTitle" className="block text-sm font-medium text-foreground mb-1">Title</label>
                <Input id="examTitle" placeholder="" />
              </div>
              <div>
                <label htmlFor="examDescription" className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea id="examDescription" placeholder="" className="min-h-[100px]" />
              </div>
              <div>
                <label htmlFor="examDate" className="block text-sm font-medium text-foreground mb-1">Date</label>
                <div className="relative">
                  <Input 
                    id="examDate" 
                    value={examDate} 
                    onChange={(e) => setExamDate(e.target.value)} 
                    placeholder="dd-mm-yyyy" 
                  />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Exam
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Exam Table */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST EXAM
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
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Title <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Description <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>{exam.id}</TableCell>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>{exam.description}</TableCell>
                        <TableCell>{new Date(exam.date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1 to {mockExams.length} of {mockExams.length} entries</div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 text-white">1</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
              <Separator className="my-2 h-1 bg-muted-foreground/20 rounded-full" />
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

