'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

interface Administrator {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function ManageAdministrators() {
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, image: file });
  };

  const handleAddAdministrator = () => {
    // In a real application, you would send this data to your backend
    console.log('Adding administrator:', formData);
    // For now, just add to the local state with a dummy ID
    const newAdministrator: Administrator = {
      id: administrators.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    setAdministrators([...administrators, newAdministrator]);
    // Clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      image: null,
    });
  };

  const handleDeleteAdministrator = (id: number) => {
    setAdministrators(administrators.filter(admin => admin.id !== id));
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Administrators</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Administrator Form */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>+ ADD</CardTitle>
            <CardDescription>Add a new administrator.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Select Role</Label>
                <Select onValueChange={(value) => handleSelectChange('role', value)} value={formData.role}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Replace with actual roles from your system */}
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Select Image</Label>
                <Input id="image" type="file" onChange={handleFileChange} />
              </div>
              <Button onClick={handleAddAdministrator}>+ Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* List Administrators Table */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>≡ LIST</CardTitle>
            <CardDescription>List of administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <Button variant="outline" size="sm" className="mr-2">Copy</Button>
                <Button variant="outline" size="sm" className="mr-2">CSV</Button>
                <Button variant="outline" size="sm" className="mr-2">Excel</Button>
                <Button variant="outline" size="sm" className="mr-2">PDF</Button>
                <Button variant="outline" size="sm">Print</Button>
              </div>
              <div className="flex items-center">
                <Label htmlFor="search" className="mr-2">Search:</Label>
                <Input id="search" type="text" placeholder="Search..." className="w-48" />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {administrators.length > 0 ? (
                    administrators.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>{admin.id}</TableCell>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteAdministrator(admin.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No data available in table</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination Placeholder */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <div>
                Showing {administrators.length > 0 ? 1 : 0} to {administrators.length} of {administrators.length} entries
              </div>
              <div>
                <Button variant="outline" size="sm" disabled className="mr-1">Previous</Button>
                <Button variant="outline" size="sm" className="mr-1">1</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}