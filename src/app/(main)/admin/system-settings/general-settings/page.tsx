'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function GeneralSettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    systemName: '',
    systemTitle: '',
    systemAddress: '',
    systemPhone: '',
    paypalEmail: '',
    currency: '',
    systemEmail: '',
    textAlignment: '',
    language: '',
    runningSession: '',
    systemFooter: '',
  });

  const [systemLogo, setSystemLogo] = useState<File | null>(null);
  const [themeColor, setThemeColor] = useState('');

  const handleSystemSettingsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSystemSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSystemLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSystemLogo(e.target.files[0]);
    }
  };

  const handleThemeColorChange = (value: string) => {
    setThemeColor(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('System Settings:', systemSettings);
    console.log('System Logo:', systemLogo);
    console.log('Theme Color:', themeColor);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">General Settings</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                name="systemName"
                value={systemSettings.systemName}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="systemTitle">System Title</Label>
              <Input
                id="systemTitle"
                name="systemTitle"
                value={systemSettings.systemTitle}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="systemAddress">System Address</Label>
              <Textarea
                id="systemAddress"
                name="systemAddress"
                value={systemSettings.systemAddress}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="systemPhone">System Phone</Label>
              <Input
                id="systemPhone"
                name="systemPhone"
                value={systemSettings.systemPhone}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="paypalEmail">Paypal Email</Label>
              <Input
                id="paypalEmail"
                name="paypalEmail"
                type="email"
                value={systemSettings.paypalEmail}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                value={systemSettings.currency}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="systemEmail">System Email</Label>
              <Input
                id="systemEmail"
                name="systemEmail"
                type="email"
                value={systemSettings.systemEmail}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="textAlignment">Text Alignment</Label>
              <Select
                value={systemSettings.textAlignment}
                onValueChange={(value) =>
                  handleSystemSettingsChange({
                    target: { name: 'textAlignment', value },
                  } as any)
                }
              >
                <SelectTrigger id="textAlignment">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={systemSettings.language}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="runningSession">Running Session</Label>
              <Input
                id="runningSession"
                name="runningSession"
                value={systemSettings.runningSession}
                onChange={handleSystemSettingsChange}
              />
            </div>
            <div>
              <Label htmlFor="systemFooter">System Footer</Label>
              <Input
                id="systemFooter"
                name="systemFooter"
                value={systemSettings.systemFooter}
                onChange={handleSystemSettingsChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Logo & Theme</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="systemLogo">System Logo</Label>
              <Input
                id="systemLogo"
                name="systemLogo"
                type="file"
                onChange={handleSystemLogoChange}
              />
              {systemLogo && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected file: {systemLogo.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="themeColor">Theme Color</Label>
              <Input
                id="themeColor"
                name="themeColor"
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}