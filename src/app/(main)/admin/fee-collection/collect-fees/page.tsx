
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for select options
const mockClasses = [
  { value: "class1", label: "Nursery One" },
  { value: "class2", label: "Class A" },
  { value: "class3", label: "Class B" },
];

const mockStudents = [
  { value: "student1", label: "Alice Wonderland" },
  { value: "student2", label: "Bob The Builder" },
  { value: "student3", label: "Charlie Brown" },
];

const mockPaymentStatus = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "unpaid", label: "Unpaid" },
];

const mockPaymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
];


const InvoiceForm = ({ title, invoiceNumber, includeStudentField }: { title: string, invoiceNumber: string, includeStudentField?: boolean }) => {
  const [selectedDate, setSelectedDate] = useState("29-05-2025");

  return (
    <Card className="flex-1">
      <CardHeader className="bg-muted/50 py-3 px-4 border-b">
        <CardTitle className="text-md font-semibold flex items-center">
          <PlusCircle className="mr-2 h-5 w-5 text-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label htmlFor={`invoiceNumber-${title}`} className="block text-sm font-medium text-foreground mb-1">Invoice Number</label>
          <Input id={`invoiceNumber-${title}`} defaultValue={invoiceNumber} />
        </div>
        <div>
          <label htmlFor={`paymentTitle-${title}`} className="block text-sm font-medium text-foreground mb-1">Payment Title</label>
          <Input id={`paymentTitle-${title}`} />
        </div>
        <div>
          <label htmlFor={`class-${title}`} className="block text-sm font-medium text-foreground mb-1">Class</label>
          <Select>
            <SelectTrigger id={`class-${title}`}>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {mockClasses.map(cls => <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {includeStudentField && (
          <div>
            <label htmlFor={`student-${title}`} className="block text-sm font-medium text-foreground mb-1">Student</label>
            <Select>
              <SelectTrigger id={`student-${title}`}>
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                {mockStudents.map(std => <SelectItem key={std.value} value={std.value}>{std.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <label htmlFor={`selectDate-${title}`} className="block text-sm font-medium text-foreground mb-1">Select Date</label>
          <div className="relative">
            <Input
              id={`selectDate-${title}`}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="pr-10"
            />
            <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label htmlFor={`paymentAmount-${title}`} className="block text-sm font-medium text-foreground mb-1">Payment Amount</label>
          <Input id={`paymentAmount-${title}`} />
        </div>
        <div>
          <label htmlFor={`paymentDiscount-${title}`} className="block text-sm font-medium text-foreground mb-1">Payment Discount %</label>
          <Input id={`paymentDiscount-${title}`} defaultValue="0" />
        </div>
        <div>
          <label htmlFor={`amountPaid-${title}`} className="block text-sm font-medium text-foreground mb-1">Amount Paid</label>
          <Input id={`amountPaid-${title}`} defaultValue="0" />
        </div>
        <div>
          <label htmlFor={`paymentStatus-${title}`} className="block text-sm font-medium text-foreground mb-1">Payment Status</label>
          <Select>
            <SelectTrigger id={`paymentStatus-${title}`}>
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              {mockPaymentStatus.map(status => <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor={`paymentMethod-${title}`} className="block text-sm font-medium text-foreground mb-1">Payment Method</label>
          <Select>
            <SelectTrigger id={`paymentMethod-${title}`}>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {mockPaymentMethods.map(method => <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor={`description-${title}`} className="block text-sm font-medium text-foreground mb-1">Description</label>
          <Textarea id={`description-${title}`} className="min-h-[80px]" />
        </div>
        <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </CardContent>
    </Card>
  );
};

export default function CollectFeesPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Student Payment</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <InvoiceForm title="CREATE SINGLE INVOICE" invoiceNumber="695887INV2025" includeStudentField />
        <InvoiceForm title="CREATE MASS INVOICE" invoiceNumber="824194INV2025" />
      </div>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}

