"use client";
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 tracking-wide">Settings</h2>
        
        <div className="grid gap-6 max-w-2xl">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Store Information</CardTitle>
              <CardDescription className="font-light">Update your store details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="font-serif">Store Name</Label>
                  <Input id="storeName" defaultValue="Liquor Store" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-serif">Support Email</Label>
                  <Input id="email" defaultValue="support@liquorstore.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="font-serif">Address</Label>
                <Input id="address" defaultValue="123 Luxury Avenue, City Center" />
              </div>
              <Button className="bg-slate-950 text-white hover:bg-slate-800 font-light tracking-wide">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Security</CardTitle>
              <CardDescription className="font-light">Manage your admin account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="font-serif">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="font-serif">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <Button variant="outline" className="font-light tracking-wide">Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
