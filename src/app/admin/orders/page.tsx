"use client";

import { useMemo, useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useOrderDetail, useOrders, useUpdateOrderStatus, useDeleteOrder } from '@/hooks/useOrders';
import { OrderStatus } from '@/types/order';
import { AdminErrorState, AdminLoadingState } from '@/components/admin/AdminDataState';

const statusStyle: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border border-rose-200',
};

export default function OrderManagement() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: ordersResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useOrders({ page, pageSize, status, search: debouncedSearch });
  const {
    data: detailResponse,
    isLoading: isDetailLoading,
    isError: isDetailError,
    error: detailError,
    refetch: refetchDetail,
  } = useOrderDetail(selectedOrderId);
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const orderData = ordersResponse?.data;
  const items = orderData?.items ?? [];
  const totalPages = Math.max(Math.ceil((orderData?.total ?? 0) / pageSize), 1);

  const title = useMemo(() => {
    if (status === 'all') {
      return 'All Orders';
    }
    return `${status[0].toUpperCase()}${status.slice(1)} Orders`;
  }, [status]);

  const handleStatusUpdate = async (id: string, nextStatus: OrderStatus) => {
    await updateStatus.mutateAsync({ id, status: nextStatus });
  };

  const handleDeleteOrder = async (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      await deleteOrder.mutateAsync(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,#fef7e7_0%,#f5efe2_35%,#ece5d7_100%)] font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-6 shadow-[0_10px_30px_rgba(120,53,15,0.12)]">
          <h2 className="text-3xl font-bold tracking-wide text-amber-950">Order Management</h2>
          <p className="mt-2 text-sm text-amber-800">Monitor order lifecycle and update statuses with confidence.</p>
        </div>

        <Card className="border-amber-200/70 bg-white/95 shadow-[0_15px_45px_rgba(120,53,15,0.12)] backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-xl text-amber-950">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order/customer"
                className="w-60"
              />
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
              >
                <option value="all">All status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <AdminLoadingState label="Loading orders..." />
            ) : isError ? (
              <AdminErrorState
                title="Failed to load orders"
                message={error instanceof Error ? error.message : 'Please try again.'}
                onRetry={() => {
                  void refetch();
                }}
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-xs text-slate-500">{order.customerPhone}</div>
                          <div className="text-xs text-slate-400">{order.customerAddress}</div>
                        </TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>{order.itemCount}</TableCell>
                        <TableCell>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold ${statusStyle[order.status]}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedOrderId(order.id)}>Detail</Button>
                          <Button variant="ghost" size="sm" className="text-rose-600" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-slate-600">Page {page} / {totalPages}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Dialog open={Boolean(selectedOrderId)} onOpenChange={(open) => { if (!open) setSelectedOrderId(''); }}>
          <DialogContent className="sm:max-w-[680px]">
            <DialogHeader>
              <DialogTitle>Order Detail</DialogTitle>
            </DialogHeader>
            {isDetailLoading ? (
              <AdminLoadingState label="Loading order detail..." />
            ) : isDetailError ? (
              <AdminErrorState
                title="Failed to load order detail"
                message={detailError instanceof Error ? detailError.message : 'Please try again.'}
                onRetry={() => {
                  void refetchDetail();
                }}
              />
            ) : detailResponse?.data ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="font-semibold">Order:</span> {detailResponse.data.id}</p>
                  <p><span className="font-semibold">Name:</span> {detailResponse.data.customerName}</p>
                  <p><span className="font-semibold">Phone:</span> {detailResponse.data.customerPhone}</p>
                  <p><span className="font-semibold">Address:</span> {detailResponse.data.customerAddress}</p>
                  <p><span className="font-semibold">Status:</span> {detailResponse.data.status}</p>
                  <p><span className="font-semibold">Total:</span> ${detailResponse.data.totalAmount.toFixed(2)}</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailResponse.data.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.priceAtTime.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p>Unable to load order detail.</p>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
