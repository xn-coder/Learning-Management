
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ListChecks, PlusSquare } from "lucide-react"; // Added PlusSquare
import { useState, useEffect } from "react";

// Mock data for dropdowns - replace with actual data fetching
const mockClasses = [
  { id: "class1", name: "Nursery One" },
  { id: "class2", name: "Class A" },
  { id: "class3", name: "Class B" },
];

const mockTeachers = [
  { id: "teacher1", name: "Gosfem Teacher" },
  { id: "teacher2", name: "Anya Sharma" },
  { id: "teacher3", name: "Ben Carter" },
];

export default function ManageSubjectPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Subject</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Subject Form */}
        <Card>
          <CardHeader className="bg-muted/50 py-3 px-4 border-b">
            <CardTitle className="text-lg font-medium flex items-center">
              <PlusSquare className="mr-2 h-5 w-5" /> {/* Using PlusSquare for consistency */}
              ADD SUBJECT
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label htmlFor="subjectName" className="block text-sm font-medium text-foreground mb-1">Name</label>
              <Input id="subjectName" placeholder="Enter subject name" />
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
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Send className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </CardContent>
        </Card>

        {/* List Subject Section */}
        <Card>
          <CardHeader className="bg-muted/50 py-3 px-4 border-b">
            <CardTitle className="text-lg font-medium flex items-center">
              <ListChecks className="mr-2 h-5 w-5" />
              LIST SUBJECT
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label htmlFor="listClass" className="block text-sm font-medium text-foreground mb-1">Select Class</label>
              <Select>
                <SelectTrigger id="listClass">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Subject
            </Button>
             {/* Placeholder for table if needed later */}
             {/* 
             <div className="mt-6 border rounded-md p-4 min-h-[200px] flex items-center justify-center text-muted-foreground">
                Subject list will appear here.
             </div>
             */}
          </CardContent>
        </Card>
      </div>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
