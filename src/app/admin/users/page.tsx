import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock user data
const mockUsers = [
  { id: "usr001", name: "Alice Wonderland", email: "alice@example.com", role: "Student", status: "Active", joined: "2023-01-15" },
  { id: "usr002", name: "Bob The Builder", email: "bob@example.com", role: "Student", status: "Active", joined: "2023-02-01" },
  { id: "usr003", name: "Dr. Anya Sharma", email: "anya.sharma@example.com", role: "Teacher", status: "Active", joined: "2022-08-10" },
  { id: "usr004", name: "Mr. Smith", email: "smith.fam@example.com", role: "Parent", status: "Inactive", joined: "2023-03-20" },
  { id: "usr005", name: "Admin User", email: "admin@atelierhub.com", role: "Admin", status: "Active", joined: "2022-05-01" },
];


export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">View, add, edit, and manage all users of Atelier Hub.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all registered users in the system.</CardDescription>
          <div className="pt-4">
            <div className="relative">
              <Input placeholder="Search users by name, email, or role..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === "Admin" ? "destructive" :
                      user.role === "Teacher" ? "secondary" :
                      "default"
                    }>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "outline"} className={user.status === "Active" ? "bg-green-500/20 text-green-700 border-green-400" : ""}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-accent/10 border-accent/30">
        <CardHeader>
            <CardTitle className="text-accent">Admin Note</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-accent/80">
            This section is for administrative purposes. User management functionalities such as adding, editing roles,
            and deactivating accounts would be implemented here. For now, this is a visual representation.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
