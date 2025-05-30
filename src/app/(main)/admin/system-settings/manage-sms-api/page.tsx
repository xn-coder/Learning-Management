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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ManageSmsApiPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">SMS Settings</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sms-gateway">Select SMS Gateway</Label>
              <Select>
                <SelectTrigger id="sms-gateway">
                  <SelectValue placeholder="Select SMS Gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clickatell">Clickatell</SelectItem>
                  <SelectItem value="msg91">MSG91</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="clickatell" className="w-full">
              <TabsList>
                <TabsTrigger value="clickatell">Clickatell</TabsTrigger>
                <TabsTrigger value="msg91">MSG91</TabsTrigger>
              </TabsList>
              <TabsContent value="clickatell">
                <Card>
                  <CardHeader>
                    <CardTitle>Clickatell Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="clickatell-username">Username</Label>
                      <Input id="clickatell-username" placeholder="clickatell username" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="clickatell-password">Password</Label>
                      <Input id="clickatell-password" type="password" placeholder="clickatell password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="clickatell-apikey">API Key</Label>
                      <Input id="clickatell-apikey" placeholder="clickatell api" />
                    </div>
                    <Button>+ Save</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="msg91">
                <Card>
                  <CardHeader>
                    <CardTitle>MSG91 Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="msg91-authkey">Authentication Key</Label>
                      <Input id="msg91-authkey" placeholder="msg91 auth key" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="msg91-senderid">Sender ID</Label>
                      <Input id="msg91-senderid" placeholder="sender id" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="msg91-route">Route</Label>
                      <Input id="msg91-route" placeholder="route" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="msg91-country-code">Country Code</Label>
                      <Input id="msg91-country-code" placeholder="country code" />
                    </div>
                    <Button>+ Save</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}