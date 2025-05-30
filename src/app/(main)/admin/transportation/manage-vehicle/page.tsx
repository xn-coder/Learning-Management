'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface Vehicle {
  id: number;
  name: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleQuantity: number;
  yearMade: string;
  driverName: string;
  driverLicense: string;
  driverContact: string;
  description: string;
  status: string;
}

const ManageVehiclePage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleQuantity: 0,
    yearMade: '',
    driverName: '',
    driverLicense: '',
    driverContact: '',
    description: '',
    status: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: parseInt(value, 10) || 0 });
  };

  const handleAddVehicle = () => {
    if (newVehicle.name && newVehicle.vehicleNumber && newVehicle.vehicleModel && newVehicle.vehicleQuantity > 0) {
      setVehicles([...vehicles, { id: Date.now(), ...newVehicle }]);
      setNewVehicle({
        name: '',
        vehicleNumber: '',
        vehicleModel: '',
        vehicleQuantity: 0,
        yearMade: '',
        driverName: '',
        driverLicense: '',
        driverContact: '',
        description: '',
        status: '',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Vehicle</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={newVehicle.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input id="vehicleNumber" name="vehicleNumber" value={newVehicle.vehicleNumber} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicleModel">Vehicle Model</Label>
                <Input id="vehicleModel" name="vehicleModel" value={newVehicle.vehicleModel} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vehicleQuantity">Vehicle Quantity</Label>
                <Input id="vehicleQuantity" name="vehicleQuantity" type="number" value={newVehicle.vehicleQuantity} onChange={handleNumberInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="yearMade">Year Made</Label>
                <Input id="yearMade" name="yearMade" value={newVehicle.yearMade} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <Input id="driverName" name="driverName" value={newVehicle.driverName} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driverLicense">Driver License</Label>
                <Input id="driverLicense" name="driverLicense" value={newVehicle.driverLicense} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driverContact">Driver Contact</Label>
                <Input id="driverContact" name="driverContact" value={newVehicle.driverContact} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={newVehicle.description} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" name="status" value={newVehicle.status} onChange={handleInputChange} />
              </div>
              <Button onClick={handleAddVehicle}>Add Vehicle</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Vehicle Model</TableHead>
                  <TableHead>Vehicle Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.vehicleNumber}</TableCell>
                    <TableCell>{vehicle.vehicleModel}</TableCell>
                    <TableCell>{vehicle.vehicleQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageVehiclePage;