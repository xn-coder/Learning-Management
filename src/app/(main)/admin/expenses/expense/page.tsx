"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function ExpensePage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">NEW EXPENSE</h3>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                ADD NEW EXPENSE HERE
              </Button>
            </div>
            <Separator />
            {/* Add form elements for new expense here */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>LIST EXPENSES</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline">Copy</Button>
                <Button variant="outline">CSV</Button>
                <Button variant="outline">Excel</Button>
                <Button variant="outline">PDF</Button>
                <Button variant="outline">Print</Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Search:</span>
                <Input className="w-40" />
              </div>
            </div>
            <Separator />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Example Row - Replace with dynamic data */}
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No data available in table
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Showing 0 to 0 of 0 entries</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}