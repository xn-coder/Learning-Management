
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PlusSquare,
  ListChecks,
  CalendarDays,
  Send,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ManageEventsPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [noticeboardDate, setNoticeboardDate] = useState("29-05-2025"); 
  const [sendSms, setSendSms] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  const tableHeaders = ["#", "Title", "Location", "Content", "Date", "Options"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">School Event</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Noticeboard Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD NOTICEBOARD
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="noticeboardTitle" className="block text-sm font-medium text-foreground mb-1">Noticeboard Title</label>
                <Input id="noticeboardTitle" placeholder="Enter noticeboard title" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">Location</label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">Content</label>
                <Textarea id="content" placeholder="Enter noticeboard content" className="min-h-[100px]" />
              </div>
              <div>
                <label htmlFor="noticeboardDate" className="block text-sm font-medium text-foreground mb-1">Noticeboard Date</label>
                <div className="relative">
                  <Input 
                    id="noticeboardDate" 
                    value={noticeboardDate} 
                    onChange={(e) => setNoticeboardDate(e.target.value)} 
                    placeholder="dd-mm-yyyy" 
                  />
                  <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sendSms" checked={sendSms} onCheckedChange={setSendSms} />
                <label htmlFor="sendSms" className="text-sm font-medium text-foreground">Send SMS ?</label>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Send className="mr-2 h-4 w-4" /> Send Noticeboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Noticeboard Table */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST NOTICEBOARD
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

              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tableHeaders.map(header => (
                        <TableHead key={header} className="capitalize">
                          <div className="flex items-center gap-1">
                            {header}
                            {header !== "#" && header !== "Options" && <ArrowUpDown className="h-3 w-3 text-muted-foreground" />}
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
