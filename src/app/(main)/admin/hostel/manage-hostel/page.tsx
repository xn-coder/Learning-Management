'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ManageHostelPage() {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Manage Dormitory
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>+ ADD</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hostel-category">Hostel Category</Label>
              <Select>
                <SelectTrigger id="hostel-category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hostel-room">Hostel Room</Label>
              <Select>
                <SelectTrigger id="hostel-room">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room1">Room One</SelectItem>
                  <SelectItem value="room2">Room Two</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" placeholder="Capacity" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Address for hostel locatoin" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Description" />
            </div>
            <Button>+ add</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>+ LIST</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-between">
              <div>
                <Button variant="outline" size="sm" className="h-8">Copy</Button>
                <Button variant="outline" size="sm" className="h-8 ml-2">CSV</Button>
                <Button variant="outline" size="sm" className="h-8 ml-2">Excel</Button>
                <Button variant="outline" size="sm" className="h-8 ml-2">PDF</Button>
                <Button variant="outline" size="sm" className="h-8 ml-2">Print</Button>
              </div>
              <div className="flex items-center">
                <Label htmlFor="search" className="mr-2">Search:</Label>
                <Input id="search" placeholder="" className="h-8" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Wiz Hostel</TableCell>
                    <TableCell>Male</TableCell>
                    <TableCell>Room One</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell>Address for hostel location</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>Showing 1 to 1 of 1 entries</div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="h-8 mr-2">Previous</Button>
                <Button variant="outline" size="sm" className="h-8">1</Button>
                <Button variant="outline" size="sm" className="h-8 ml-2">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}