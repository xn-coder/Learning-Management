
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PlusSquare,
  ListChecks,
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

// Mock data for dropdowns
const mockColours = [
  { value: "danger", label: "Danger (Red)" },
  { value: "primary", label: "Primary (Blue/Green)" },
  { value: "success", label: "Success (Green)" },
  { value: "warning", label: "Warning (Yellow)" },
  { value: "info", label: "Info (Light Blue)" },
];

const mockSocialCategories = [
  { id: "1", name: "Romance", colour: "danger", icon: "fa-male", description: "This is for romance chat room" },
  { id: "2", name: "Event", colour: "primary", icon: "fa-book", description: "This is for event chat room" },
];

export default function SocialCategoryPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Social Category</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Social Category Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" /> 
                SOCIAL CATEGORY
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-foreground mb-1">Name</label>
                <Input id="categoryName" placeholder="" />
              </div>
              <div>
                <label htmlFor="categoryColour" className="block text-sm font-medium text-foreground mb-1">Colour</label>
                <Select>
                  <SelectTrigger id="categoryColour">
                    <SelectValue placeholder="Select Colour" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockColours.map(col => (
                      <SelectItem key={col.value} value={col.value}>{col.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="iconPicker" className="block text-sm font-medium text-foreground mb-1">Icon Picker</label>
                <Input id="iconPicker" placeholder="e.g., fa-male, fa-book" />
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea id="categoryDescription" placeholder="" className="min-h-[100px]" />
              </div>
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                add
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Categories Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST
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
                      <TableHead className="w-[50px]">
                        <div className="flex items-center gap-1"># <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Colour <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Icon <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Description <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead className="text-center w-[120px]">
                         <div className="flex items-center justify-center gap-1">Action <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSocialCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.colour}</TableCell>
                        <TableCell>{category.icon}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="text-white bg-blue-500 hover:bg-blue-600 h-7 w-7 rounded-md p-1">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white bg-red-500 hover:bg-red-600 h-7 w-7 ml-1 rounded-md p-1">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1 to {mockSocialCategories.length} of {mockSocialCategories.length} entries</div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm">Previous</Button>
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
