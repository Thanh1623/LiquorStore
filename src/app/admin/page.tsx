"use client";

import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardSummary, useRevenueSeries } from '@/hooks/useDashboard';

const currency = (value: number) => `$${value.toLocaleString()}`;

export default function AdminDashboard() {
  const { data: summaryResponse, isLoading: summaryLoading } = useDashboardSummary();
  const { data: revenueResponse, isLoading: revenueLoading } = useRevenueSeries();

  const summary = summaryResponse?.data;
  const revenue = revenueResponse?.data ?? [];

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,#fef7e7_0%,#f5efe2_35%,#ece5d7_100%)] font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="mb-10 text-4xl font-bold tracking-tight text-slate-950">Executive Dashboard</h1>

        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Total Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-4xl font-bold text-slate-950">{summaryLoading ? '...' : summary?.totalInventory ?? 0}</div>
              <p className="text-xs font-light text-slate-500">Active products in catalog</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-4xl font-bold text-slate-950">{summaryLoading ? '...' : currency(summary?.monthlyRevenue ?? 0)}</div>
              <p className="text-xs font-light text-slate-500">Completed orders this month</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 text-4xl font-bold text-slate-950">{summaryLoading ? '...' : summary?.activeOrders ?? 0}</div>
              <p className="text-xs font-light text-slate-500">Pending fulfillment</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Revenue Overview (6 months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {revenueLoading ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#ca8a04" strokeWidth={3} dot={{ r: 4, fill: '#ca8a04' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
