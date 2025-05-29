
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  ListChecks,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
  DownloadCloud,
  Edit3,
  File as FileIcon, // Generic file icon for DOC placeholder
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";

const mockQuestionPaper = [
  {
    id: "1",
    fileType: "DOC",
    title: "question for economics",
    class: "Nursery One",
    subject: "Economics",
    teacher: "Gosfem Teacher",
    description: "some info here",
    status: "Approved",
  },
];

export default function ExamQuestionPaperPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Exam Question</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/50 p-4 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">EXAM QUESTION PAPER</CardTitle>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" />
            ADD NEW QUESTION PAPER
            <Minus className="ml-2 h-4 w-4 text-blue-300" /> {/* For the blue line effect */}
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center p-3 bg-muted/20 rounded-md border-b mb-4">
            <ListChecks className="h-5 w-5 mr-2 text-foreground" />
            <h3 className="text-md font-semibold text-foreground">LIST</h3>
          </div>
          
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
                    <div className="flex items-center gap-1">File Type <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Title <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Class <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Subject <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Teacher <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Description <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Status <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead className="text-center w-[120px]">Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQuestionPaper.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 p-1 border border-muted-foreground/30 rounded-md w-fit bg-muted/20">
                        <FileIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">{item.fileType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="text-white bg-blue-500 hover:bg-blue-600 h-7 w-7 rounded-full p-1">
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white bg-green-500 hover:bg-green-600 h-7 w-7 ml-1 rounded-full p-1">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing 1 to {mockQuestionPaper.length} of {mockQuestionPaper.length} entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 text-white">1</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
          <Separator className="my-2 h-1 bg-muted-foreground/20 rounded-full" />
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
