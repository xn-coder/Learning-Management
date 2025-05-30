'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Transport {
  id: string;
  name: string;
  route: string;
  vehicle: string;
  fare: string;
  description: string;
}

const initialTransports: Transport[] = [
  {
    id: '1',
    name: 'Bus 1',
    route: 'Route A',
    vehicle: 'School Bus',
    fare: '$100',
    description: 'Morning route',
  },
  {
    id: '2',
    name: 'Van 2',
    route: 'Route B',
    vehicle: 'Mini Van',
    fare: '$80',
    description: 'Afternoon route',
  },
];

const TransportsPage = () => {
  const [transports, setTransports] = useState<Transport[]>(initialTransports);
  const [formData, setFormData] = useState({
    name: '',
    route: '',
    vehicle: '',
    fare: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransport: Transport = {
      id: Date.now().toString(),
      ...formData,
    };
    setTransports([...transports, newTransport]);
    setFormData({
      name: '',
      route: '',
      vehicle: '',
      fare: '',
      description: '',
    });
  };

  const handleDelete = (id: string) => {
    setTransports(transports.filter((transport) => transport.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Card className="w-full md:w-1/3">
        <CardHeader>
          <CardTitle>Add New Transport</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="route">Transport Route</Label>
              <Input
                id="route"
                name="route"
                value={formData.route}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="fare">Route Fare</Label>
              <Input
                id="fare"
                name="fare"
                value={formData.fare}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Add Transport</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full md:w-2/3">
        <CardHeader>
          <CardTitle>Existing Transports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Routes</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Route Fare</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transports.map((transport) => (
                <TableRow key={transport.id}>
                  <TableCell>{transport.name}</TableCell>
                  <TableCell>{transport.route}</TableCell>
                  <TableCell>{transport.vehicle}</TableCell>
                  <TableCell>{transport.fare}</TableCell>
                  <TableCell>{transport.description}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(transport.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportsPage;