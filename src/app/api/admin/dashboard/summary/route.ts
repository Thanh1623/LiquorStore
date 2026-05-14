import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [{ count: inventoryCount, error: inventoryError }, { data: monthlyOrders, error: monthlyError }, { count: activeOrders, error: activeError }] = await Promise.all([
    supabase.from('Product').select('id', { count: 'exact', head: true }),
    supabase.from('Order').select('totalAmount').gte('createdAt', monthStart).eq('status', 'completed'),
    supabase.from('Order').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  if (inventoryError || monthlyError || activeError) {
    return NextResponse.json({ error: inventoryError?.message ?? monthlyError?.message ?? activeError?.message }, { status: 500 });
  }

  const monthlyRevenue = (monthlyOrders ?? []).reduce((sum, order) => sum + Number(order.totalAmount ?? 0), 0);

  return NextResponse.json({
    data: {
      totalInventory: inventoryCount ?? 0,
      monthlyRevenue,
      activeOrders: activeOrders ?? 0,
    },
  });
}
