
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for dropdowns
const mockExams = [
  { id: "exam1", name: "Mid-Term Exam" },
  { id: "exam2", name: "Final Exam" },
  { id: "exam3", name: "Unit Test 1" },
];

const mockClasses = [
  { id: "class1", name: "Nursery One" },
  { id: "class2", name: "Class A" },
  { id: "class3", name: "Class B" },
];

const mockSubjects = [
  { id: "subject1", name: "Mathematics" },
  { id: "subject2", name: "English Language" },
  { id: "subject3", name: "Basic Science" },
  { id: "subject4", name: "Social Studies" },
];

export default function SubjectTeacherScoresPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Student Marks</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/50 py-3 px-4 border-b">
          <CardTitle className="text-lg font-medium">
            + ENTER STUDENT SCORE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="exam-select" className="block text-sm font-medium text-foreground mb-1">Exam</label>
              <Select>
                <SelectTrigger id="exam-select">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {mockExams.map(exam => (
                    <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="class-select" className="block text-sm font-medium text-foreground mb-1">Class</label>
              <Select>
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
            <div>
              <label htmlFor="subject-select" className="block text-sm font-medium text-foreground mb-1">Subject</label>
              <Select>
                <SelectTrigger id="subject-select">
                  <SelectValue placeholder="Select Class First" />
                </SelectTrigger>
                <SelectContent>
                  {/* In a real app, subjects would be filtered based on selected class */}
                  {mockSubjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <Search className="mr-2 h-4 w-4" /> Get Details
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for where student scores would be displayed/entered */}
      {/* 
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Score Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Student score details and entry form will appear here after selection.</p>
        </CardContent>
      </Card> 
      */}

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
