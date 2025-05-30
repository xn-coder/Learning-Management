'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TransportRoute {
  id: number;
  name: string;
  description: string;
}

export default function TransportRoutePage() {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [routeName, setRouteName] = useState('');
  const [routeDescription, setRouteDescription] = useState('');

  const handleAddRoute = () => {
    if (routeName && routeDescription) {
      setRoutes([
        ...routes,
        { id: routes.length + 1, name: routeName, description: routeDescription },
      ]);
      setRouteName('');
      setRouteDescription('');
    }
  };

  return (
    <div className="flex space-x-4 p-4">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Add Transport Route</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="routeName">Name</Label>
            <Input
              id="routeName"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter route name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="routeDescription">Description</Label>
            <Textarea
              id="routeDescription"
              value={routeDescription}
              onChange={(e) => setRouteDescription(e.target.value)}
              placeholder="Enter route description"
            />
          </div>
          <Button onClick={handleAddRoute} className="w-full">Save</Button>
        </CardContent>
      </Card>

      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Transport Route List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>{route.description}</TableCell>
                  <TableCell>
                    {/* Add action buttons here, e.g., Edit, Delete */}
                    Options
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}