
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListChecks, Copy, FileText, FileSpreadsheet, Printer, Search, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function ListEnquiriesPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')); // e.g., 29 May 2025
  }, []);

  const tableHeaders = [
    "category", "mobile", "purpose", "name", "who to see", "content", "email", "date submitted", "option"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Enquiries</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 py-3 px-4 border-b">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            LIST ENQUIRY
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4"/>Copy</Button>
              <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4"/>CSV</Button>
              <Button variant="outline" size="sm"><FileSpreadsheet className="mr-2 h-4 w-4"/>Excel</Button>
              <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4"/>PDF</Button>
              <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4"/>Print</Button>
            </div>
            <div className="relative ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Search:</span>
              <Input
                type="search"
                className="h-9 sm:w-[200px] md:w-[250px] lg:w-[250px]"
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
                        <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
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
              {/* <Button variant="default" size="sm" className="w-8 h-8 p-0">1</Button> */}
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
