import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { OrderListItem } from '@/types/order';

type OrderRow = {
  id: string;
  totalAmount: number | string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  userId: string;
  User?: { email: string } | null;
  OrderItem?: { id: string }[];
};

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const page = Math.max(Number(searchParams.get('page') ?? '1'), 1);
  const pageSize = Math.min(Math.max(Number(searchParams.get('pageSize') ?? '10'), 1), 50);
  const status = (searchParams.get('status') ?? '').trim();
  const search = (searchParams.get('search') ?? '').trim().toLowerCase();

  let query = supabase
    .from('Order')
    .select('id,totalAmount,status,createdAt,userId,User(email),OrderItem(id)', { count: 'exact' })
    .order('createdAt', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let items = (data as OrderRow[]).map((row): OrderListItem => ({
    id: row.id,
    customerEmail: row.User?.email ?? 'Unknown',
    totalAmount: Number(row.totalAmount ?? 0),
    status: row.status,
    createdAt: row.createdAt,
    itemCount: row.OrderItem?.length ?? 0,
  }));

  if (search) {
    items = items.filter((item) =>
      item.id.toLowerCase().includes(search) || item.customerEmail.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    data: {
      items,
      total: count ?? items.length,
      page,
      pageSize,
    },
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { fullName, address, phone, items, total } = body;

  const { data: order, error: orderError } = await supabase
    .from('Order')
    .insert({
      userId: null, // Guest order
      totalAmount: total,
      status: 'pending',
      shippingAddress: address,
      customerName: fullName,
      customerPhone: phone,
    })
    .select('id')
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  const productIds = items.map((item: { productId: string }) => item.productId);
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('id, price')
    .in('id', productIds);

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  const orderItems = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
    }
    orderItems.push({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      priceAtTime: product.price,
    });
  }

  const { error: itemsError } = await supabase
    .from('OrderItem')
    .insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ data: { id: order.id } }, { status: 201 });
}
