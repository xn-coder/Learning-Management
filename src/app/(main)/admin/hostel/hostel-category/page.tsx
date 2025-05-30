import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Archive, Minus, PlusCircle, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HostelCategoryPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Hostel Category</h1>
        <Badge variant="outline">Weblabs | ©. All Right Reserved | 29/May/2025</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PlusCircle size={20} />
              ADD HOSTEL CATEGORY
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="category-name">Name</label>
              <Input id="category-name" placeholder="Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category-description">Description</label>
              <textarea
                id="category-description"
                placeholder="Description"
                className="border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md min-h-[80px]"
              />
            </div>
            <Button className="w-fit">
              <PlusCircle size={20} className="mr-2" /> add
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Archive size={20} />
              HOSTEL CATEGORIES
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline">Copy</Button>
                <Button variant="outline">CSV</Button>
                <Button variant="outline">Excel</Button>
                <Button variant="outline">PDF</Button>
                <Button variant="outline">Print</Button>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="search">Search:</label>
                <div className="relative">
                  <Input id="search" placeholder="Search..." className="pl-8" />
                  <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Hostel Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Female</TableCell>
                  <TableCell>This is for female only.</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Male</TableCell>
                  <TableCell>This is for male only. Female are not allowed.</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-between items-center">
              <div>Showing 1 to 2 of 2 entries</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostelCategoryPage;