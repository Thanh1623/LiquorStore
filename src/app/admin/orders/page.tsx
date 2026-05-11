"use client";
import { Sidebar } from '@/components/admin/Sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 150.00, status: 'Completed' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 85.50, status: 'Pending' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 200.00, status: 'Cancelled' },
];

export default function OrderManagement() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 tracking-wide">Order Management</h2>
        
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="font-serif text-slate-600">Order ID</TableHead>
                  <TableHead className="font-serif text-slate-600">Customer</TableHead>
                  <TableHead className="font-serif text-slate-600">Total</TableHead>
                  <TableHead className="font-serif text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{order.id}</TableCell>
                    <TableCell className="text-slate-700">{order.customer}</TableCell>
                    <TableCell className="text-slate-700">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold ${
                        order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
