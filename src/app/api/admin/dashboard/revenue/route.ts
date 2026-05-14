import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const formatMonth = (date: Date) => date.toLocaleString('en-US', { month: 'short' });

export async function GET() {
  const supabase = await createClient();

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const { data, error } = await supabase
    .from('Order')
    .select('createdAt,totalAmount,status')
    .gte('createdAt', startDate.toISOString())
    .eq('status', 'completed')
    .order('createdAt', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const buckets = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }

  for (const order of data ?? []) {
    const d = new Date(order.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + Number(order.totalAmount ?? 0));
    }
  }

  const points = Array.from(buckets.entries()).map(([key, revenue]) => {
    const [year, month] = key.split('-').map(Number);
    return {
      month: formatMonth(new Date(year, month, 1)),
      revenue,
    };
  });

  return NextResponse.json({ data: points });
}
