import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();
  const name = String(body?.name ?? '').trim();

  if (name.length < 2) {
    return NextResponse.json({ error: 'Category name must be at least 2 characters' }, { status: 400 });
  }

  const { data: existed } = await supabase.from('Category').select('id').eq('name', name).neq('id', id).maybeSingle();
  if (existed?.id) {
    return NextResponse.json({ error: 'Category name already in use' }, { status: 409 });
  }

  const { data, error } = await supabase.from('Category').update({ name }).eq('id', id).select('id,name').maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json({ data: { ...data } });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from('Product')
    .select('id', { count: 'exact', head: true })
    .eq('categoryId', id);

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: 'Cannot delete category with existing products' }, { status: 409 });
  }

  const { error } = await supabase.from('Category').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: null });
}
