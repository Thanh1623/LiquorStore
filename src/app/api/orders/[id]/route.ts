import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type OrderDetailRow = {
  id: string;
  totalAmount: number | string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  OrderItem?: {
    id: string;
    quantity: number;
    priceAtTime: number | string;
    Product?: { name: string } | null;
  }[];
};

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Order')
    .select('id,totalAmount,status,createdAt,customerName,customerPhone,shippingAddress,OrderItem(id,quantity,priceAtTime,Product(name))')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const row = data as OrderDetailRow;
  return NextResponse.json({
    data: {
      id: row.id,
      customerName: row.customerName ?? 'Unknown',
      customerPhone: row.customerPhone ?? 'N/A',
      customerAddress: row.shippingAddress ?? 'N/A',
      totalAmount: Number(row.totalAmount ?? 0),
      status: row.status,
      createdAt: row.createdAt,
      items: (row.OrderItem ?? []).map((item) => ({
        id: item.id,
        quantity: item.quantity,
        priceAtTime: Number(item.priceAtTime ?? 0),
        productName: item.Product?.name ?? 'Unknown product',
      })),
    },
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();
  const nextStatus = String(body?.status ?? '').trim() as 'pending' | 'completed' | 'cancelled';

  if (!['pending', 'completed', 'cancelled'].includes(nextStatus)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const { data: existing, error: existingError } = await supabase
    .from('Order')
    .select('id,status')
    .eq('id', id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }
  if (!existing) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('Order')
    .update({ status: nextStatus })
    .eq('id', id)
    .select('id,status')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Assuming cascading delete is configured in Supabase
  const { error } = await supabase
    .from('Order')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
