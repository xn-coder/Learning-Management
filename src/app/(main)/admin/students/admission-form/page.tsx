
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, CalendarDays, Save } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Mock data for select options
const mockSelectOptions = (label: string) => [
  { value: "option1", label: `${label} Option 1` },
  { value: "option2", label: `${label} Option 2` },
  { value: "option3", label: `${label} Option 3` },
];

const FormInput = ({ label, id, placeholder, type = "text", value, onChange, disabled, className }: { label: string, id: string, placeholder?: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean, className?:string }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <Input id={id} placeholder={placeholder} type={type} value={value} onChange={onChange} disabled={disabled} />
  </div>
);

const FormTextarea = ({ label, id, placeholder, value, onChange, rows = 3 }: { label: string, id: string, placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <Textarea id={id} placeholder={placeholder} value={value} onChange={onChange} rows={rows} />
  </div>
);

const FormSelect = ({ label, id, placeholder, options, value, onValueChange, showPlusButton }: { label:string, id:string, placeholder:string, options: {value:string, label:string}[], value?:string, onValueChange?:(value:string)=>void, showPlusButton?:boolean }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
        </SelectContent>
      </Select>
      {showPlusButton && (
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600">
          <PlusCircle className="h-5 w-5" />
        </Button>
      )}
    </div>
  </div>
);

const FormDateInput = ({ label, id, value, onChange }: { label:string, id:string, value?:string, onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <div className="relative">
      <Input id={id} type="text" placeholder="dd-mm-yyyy" value={value} onChange={onChange} className="pr-10" />
      <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    </div>
  </div>
);


export default function AdmissionFormPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [formValues, setFormValues] = useState({
    runningSession: "2024-2025",
    birthday: "05/29/2025", // From image
    dateOfLeaving: "19-08-2011", // From image
    admissionDate: "19-08-2011", // From image
    // other fields
  });

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  // Basic handler for demo purposes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };
  const handleSelectChange = (id: string, value: string) => {
    setFormValues(prev => ({ ...prev, [id]: value }));
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Student</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Part A */}
            <section className="space-y-6">
              <div className="bg-primary text-primary-foreground p-3 rounded-t-md -mx-6 -mt-6 mb-6 lg:mx-0 lg:mt-0">
                <h2 className="text-lg font-semibold text-center">Admission Form - PART A</h2>
              </div>
              
              <div>
                <label htmlFor="studentPhoto" className="block text-sm font-medium text-foreground mb-1">Student Photo</label>
                <Input id="studentPhoto" type="file" />
                <div className="mt-2 w-32 h-32 bg-muted rounded-md flex items-center justify-center">
                  <Image src="https://placehold.co/100x100.png" alt="Student image placeholder" width={100} height={100} data-ai-hint="student placeholder" />
                </div>
              </div>

              <FormInput label="Running Session" id="runningSession" value={formValues.runningSession} onChange={handleChange} disabled />
              <FormInput label="Full Name" id="fullName" onChange={handleChange} />
              <FormSelect label="Parent" id="parent" placeholder="Select" options={mockSelectOptions("Parent")} showPlusButton onValueChange={(val) => handleSelectChange("parent", val)} />
              <FormSelect label="Class" id="class" placeholder="Select" options={mockSelectOptions("Class")} showPlusButton onValueChange={(val) => handleSelectChange("class", val)} />
              <FormSelect label="Section" id="section" placeholder="Select Class First" options={mockSelectOptions("Section")} showPlusButton onValueChange={(val) => handleSelectChange("section", val)} />
              <FormDateInput label="Birthday" id="birthday" value={formValues.birthday} onChange={handleChange} />
              <FormInput label="Age" id="age" disabled className="bg-muted/50"/>
              <FormInput label="Place Birth" id="placeBirth" onChange={handleChange} />
              <FormSelect label="Gender" id="gender" placeholder="Select" options={[{value: "male", label: "Male"}, {value:"female", label:"Female"}]} onValueChange={(val) => handleSelectChange("gender", val)} />
              <FormInput label="Mother Tongue" id="motherTongue" onChange={handleChange} />
              <FormInput label="Religion" id="religion" onChange={handleChange} />
              <FormInput label="Blood Group" id="bloodGroup" onChange={handleChange} />
              <FormTextarea label="Address" id="address" onChange={handleChange} />
              <FormInput label="City" id="city" onChange={handleChange} />
              <FormSelect label="Student House" id="studentHouse" placeholder="Select" options={mockSelectOptions("House")} showPlusButton onValueChange={(val) => handleSelectChange("studentHouse", val)} />
              <FormSelect label="Student Club" id="studentClub" placeholder="Select" options={mockSelectOptions("Club")} showPlusButton onValueChange={(val) => handleSelectChange("studentClub", val)} />
            </section>

            {/* Part B */}
            <section className="space-y-6">
              <div className="bg-primary text-primary-foreground p-3 rounded-t-md -mx-6 -mt-6 mb-6 lg:mx-0 lg:mt-0">
                <h2 className="text-lg font-semibold text-center">Admission Form - PART B</h2>
              </div>

              <FormInput label="State" id="state" onChange={handleChange} />
              <FormInput label="Nationality" id="nationality" onChange={handleChange} />
              <FormInput label="Phone" id="phone" type="tel" onChange={handleChange} />
              <FormInput label="Email" id="email" type="email" onChange={handleChange} />
              <FormInput label="Password" id="password" type="password" onChange={handleChange} />
              <FormInput label="Previous School Name" id="previousSchoolName" onChange={handleChange} />
              <FormTextarea label="The Address" id="theAddressPartB" onChange={handleChange} /> {/* Renamed id to avoid conflict */}
              <FormInput label="Purpose Of Leaving" id="purposeOfLeaving" onChange={handleChange} />
              <FormInput label="Class In Which Was Studying" id="classStudying" onChange={handleChange} />
              <FormDateInput label="Date Of Leaving" id="dateOfLeaving" value={formValues.dateOfLeaving} onChange={handleChange} />
              <FormDateInput label="Admission Date" id="admissionDate" value={formValues.admissionDate} onChange={handleChange} />
              <FormSelect label="Transfer Certificate" id="transferCert" placeholder="Select" options={mockSelectOptions("Cert")} onValueChange={(val) => handleSelectChange("transferCert", val)} />
              <FormSelect label="Birth Certificate" id="birthCert" placeholder="Select" options={mockSelectOptions("Cert")} onValueChange={(val) => handleSelectChange("birthCert", val)} />
              <FormSelect label="Any Given Marksheet" id="marksheet" placeholder="Select" options={mockSelectOptions("Sheet")} onValueChange={(val) => handleSelectChange("marksheet", val)} />
              <FormSelect label="Physical Handicap" id="physicalHandicap" placeholder="Select" options={[{value: "yes", label: "Yes"}, {value: "no", label: "No"}]} onValueChange={(val) => handleSelectChange("physicalHandicap", val)} />
              <FormSelect label="Dormitory" id="dormitory" placeholder="Select" options={mockSelectOptions("Dorm")} showPlusButton onValueChange={(val) => handleSelectChange("dormitory", val)} />
              <FormSelect label="Transport Route" id="transportRoute" placeholder="Select" options={mockSelectOptions("Route")} showPlusButton onValueChange={(val) => handleSelectChange("transportRoute", val)} />
              <FormSelect label="Student Category" id="studentCategory" placeholder="Select" options={mockSelectOptions("Category")} showPlusButton onValueChange={(val) => handleSelectChange("studentCategory", val)} />
            </section>
          </div>

          <Separator className="my-8" />

          <div className="flex justify-center">
            <Button size="lg" className="w-full max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="mr-2 h-5 w-5" /> Save Student
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}

    