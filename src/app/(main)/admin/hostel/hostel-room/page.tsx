import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HostelRoomPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Add Hostel Room Section */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>ADD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter room name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room-type">Room Type</Label>
                <Input id="room-type" placeholder="Enter room type" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="num-of-bed">Num Of Bed</Label>
                <Input id="num-of-bed" type="number" placeholder="Enter number of beds" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cost-bed">Cost Bed</Label>
                <Input id="cost-bed" type="number" placeholder="Enter cost per bed" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" />
              </div>
              <Button className="w-full">Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* List Hostel Rooms Section */}
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>LIST</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <Button variant="outline" size="sm" className="h-7 gap-1">Copy</Button>
                <Button variant="outline" size="sm" className="h-7 gap-1 ml-2">CSV</Button>
                <Button variant="outline" size="sm" className="h-7 gap-1 ml-2">Excel</Button>
                <Button variant="outline" size="sm" className="h-7 gap-1 ml-2">PDF</Button>
                <Button variant="outline" size="sm" className="h-7 gap-1 ml-2">Print</Button>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="search">Search:</Label>
                <Input id="search" type="text" placeholder="Search..." className="h-7" />
              </div>
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Num Of Bed</TableHead>
                    <TableHead>Cost Bed</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Room One</TableCell>
                    <TableCell>Single</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>5000</TableCell>
                    <TableCell>This is for the bed</TableCell>
                    <TableCell>
                      {/* Add action buttons here */}
                    </TableCell>
                  </TableRow>
                  {/* More rows can be added here */}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to 1 of 1 entries
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}