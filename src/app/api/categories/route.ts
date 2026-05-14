import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type CategoryRow = {
  id: string;
  name: string;
  imageUrl?: string | null;
  Product?: { id: string }[];
};

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Category')
    .select('id,name,imageUrl,Product(id)')
    .order('name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const categories = (data as CategoryRow[]).map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    productCount: item.Product?.length ?? 0,
  }));

  return NextResponse.json({ data: categories });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const name = String(body?.name ?? '').trim();
  const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : null;

  if (name.length < 2) {
    return NextResponse.json({ error: 'Category name must be at least 2 characters' }, { status: 400 });
  }

  const { data: existed } = await supabase.from('Category').select('id').eq('name', name).maybeSingle();
  if (existed?.id) {
    return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
  }

  const { data, error } = await supabase.from('Category').insert({ name, imageUrl }).select('id,name,imageUrl').single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create category' }, { status: 500 });
  }

  return NextResponse.json({ data: { ...data, productCount: 0 } }, { status: 201 });
}
