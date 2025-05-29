
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter, Search } from "lucide-react";
import { useState, useEffect } from "react";

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

const mockMonths = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const mockYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i.toString());
  }
  return years;
};

interface AttendanceKeyProps {
  label: string;
  colorClass: string;
}

const AttendanceKey = ({ label, colorClass }: AttendanceKeyProps) => (
  <div className="flex items-center gap-1.5">
    <span className={`h-3 w-3 rounded-full ${colorClass}`}></span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default function ViewAttendancePage() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [selectedYear, setSelectedYear] = useState("2019");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Attendance Report: Section</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 py-3 px-4 border-b">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ListFilter className="h-5 w-5" />
            MANAGE ATTENDANCE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <span className="text-sm font-medium mr-2">KEYS:</span>
            <AttendanceKey label="Present" colorClass="bg-green-500" />
            <AttendanceKey label="Absent" colorClass="bg-red-500" />
            <AttendanceKey label="Half Day" colorClass="bg-yellow-500" />
            <AttendanceKey label="Late" colorClass="bg-blue-500" />
            <AttendanceKey label="Undefine" colorClass="bg-black" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div>
              <label htmlFor="select-class" className="block text-sm font-medium text-foreground mb-1">Select Class</label>
              <Select>
                <SelectTrigger id="select-class">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="select-section" className="block text-sm font-medium text-foreground mb-1">Select Section</label>
              <Select>
                <SelectTrigger id="select-section">
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
              <label htmlFor="select-month" className="block text-sm font-medium text-foreground mb-1">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="select-month">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {mockMonths.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="select-year" className="block text-sm font-medium text-foreground mb-1">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="select-year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {mockYears().map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
            <Search className="mr-2 h-4 w-4" /> get attendance
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for where the attendance report/table would be displayed */}
      {/* 
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Attendance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Attendance report will be shown here after selecting filters and clicking "get attendance".</p>
        </CardContent>
      </Card> 
      */}

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
