
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PlusCircle,
  ListChecks,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
  Edit3,
  XCircle,
  UserRound, // Using UserRound for the yellow profile-like button
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";

const mockTeachers = [
  {
    id: "1",
    photoUrl: "https://placehold.co/40x40.png?text=W",
    name: "Gosfem Teacher",
    role: "Class Teacher",
    email: "teacher@teacher.com",
    sex: "male",
    address: "4, Ireakari Estate, Osiele Abeokuta Ogun State.",
    dataAiHint: "teacher weblabs logo avatar"
  },
];

export default function ManageTeacherPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Teacher</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 p-4 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">NEW TEACHER</CardTitle>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            ADD NEW TEACHER HERE
            <Minus className="ml-2 h-4 w-4" /> {/* Placeholder for the blue line styling */}
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center p-3 bg-muted/20 rounded-md">
            <ListChecks className="h-5 w-5 mr-2 text-foreground" />
            <h3 className="text-md font-semibold text-foreground">LIST TEACHERS</h3>
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
                  <TableHead className="w-[80px]">
                    <div className="flex items-center gap-1">Photo <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Role <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Email <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Sex <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">Address <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                  <TableHead className="text-center w-[150px]">
                    <div className="flex items-center justify-center gap-1">Options <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={teacher.photoUrl} alt={teacher.name} data-ai-hint={teacher.dataAiHint}/>
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.role}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.sex}</TableCell>
                    <TableCell>{teacher.address}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="text-white bg-blue-500 hover:bg-blue-600 h-7 w-7 rounded-md p-1">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white bg-red-500 hover:bg-red-600 h-7 w-7 ml-1 rounded-md p-1">
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white bg-yellow-500 hover:bg-yellow-600 h-7 w-7 ml-1 rounded-md p-1">
                        <UserRound className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing 1 to {mockTeachers.length} of {mockTeachers.length} entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 text-white">1</Button>
              <Button variant="outline" size="sm">Next</Button>
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
