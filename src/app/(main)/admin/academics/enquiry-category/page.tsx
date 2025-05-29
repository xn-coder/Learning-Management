
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3, XCircle, PlusCircle, Copy, FileText, FileSpreadsheet, Printer, Search } from "lucide-react";
import { useState, useEffect } from "react";

const mockCategories = [
  { id: "3", category: "This is for ID 3 information.", purpose: "Payment", whom: "Tutorial" },
  { id: "4", category: "This is Udemy Information", purpose: "School fees information", whom: "Just edited now" },
  { id: "6", category: "School fees issues", purpose: "For school fees", whom: "Accountant" },
  { id: "7", category: "test", purpose: "test", whom: "test" },
];

export default function EnquiryCategoryPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Category</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">ALL CATEGORIES</CardTitle>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4"/>Copy</Button>
              <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4"/>CSV</Button>
              <Button variant="outline" size="sm"><FileSpreadsheet className="mr-2 h-4 w-4"/>Excel</Button>
              <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4"/>PDF</Button>
              <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4"/>Print</Button>
            </div>
            <div className="relative ml-auto flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[200px] md:w-[250px] lg:w-[300px]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Whom</TableHead>
                  <TableHead className="text-center w-[120px]">Option</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCategories.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.purpose}</TableCell>
                    <TableCell>{item.whom}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 h-8 w-8">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing 1 to {mockCategories.length} of {mockCategories.length} entries</div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm" className="w-8 h-8 p-0">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
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

