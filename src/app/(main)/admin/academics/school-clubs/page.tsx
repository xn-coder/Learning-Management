
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Edit3,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

const mockClubs = [
  { id: "1", clubName: "Jet club", description: "This is for those who love science.", date: "2019-08-25" },
];

export default function SchoolClubsPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Club</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Club Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD CLUB
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="clubName" className="block text-sm font-medium text-foreground mb-1">Club Name</label>
                <Input id="clubName" placeholder="Enter club name" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea id="description" placeholder="Enter club description" className="min-h-[80px]" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Date</label>
                <div className="relative">
                  <Input id="date" placeholder="dd-mm-yyyy" />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Club
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Club Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST CLUB
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
                        <div className="flex items-center gap-1">Club Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Description <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead className="text-center w-[120px]">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClubs.map((club) => (
                      <TableRow key={club.id}>
                        <TableCell>{club.id}</TableCell>
                        <TableCell className="font-medium">{club.clubName}</TableCell>
                        <TableCell>{club.description}</TableCell>
                        <TableCell>{club.date}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 h-8 w-8 bg-blue-100 hover:bg-blue-200 rounded-full p-1">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 h-8 w-8 ml-1 bg-red-100 hover:bg-red-200 rounded-full p-1">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1 to {mockClubs.length} of {mockClubs.length} entries</div>
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
