"use client";
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/lib/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4000 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 7000 },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-serif font-bold text-slate-950 mb-10 tracking-tight">Executive Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            { title: 'Total Inventory', value: `${products.length}`, desc: 'Active products in catalog' },
            { title: 'Monthly Revenue', value: '$24,000', desc: '+12% from last month' },
            { title: 'Active Orders', value: '42', desc: 'Pending fulfillment' },
          ].map((stat, i) => (
            <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-sm text-slate-500 uppercase tracking-widest">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-slate-950 mb-1">{stat.value}</div>
                <p className="text-xs text-slate-500 font-light">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
                <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ca8a04" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#ca8a04' }} 
                    activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
