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
