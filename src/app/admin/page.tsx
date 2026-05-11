"use client";
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/lib/mock-data';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-[32px] font-serif font-bold mb-8 text-[#212529]">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle>Total Products</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{products.length}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">0</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">$0</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
