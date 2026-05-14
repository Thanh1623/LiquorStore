import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();
  const name = String(body?.name ?? '').trim();
  const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : null;

  if (name.length < 2) {
    return NextResponse.json({ error: 'Category name must be at least 2 characters' }, { status: 400 });
  }

  const { data: existed } = await supabase.from('Category').select('id').eq('name', name).neq('id', id).maybeSingle();
  if (existed?.id) {
    return NextResponse.json({ error: 'Category name already in use' }, { status: 409 });
  }

  const { data, error } = await supabase
    .from('Category')
    .update({ name, imageUrl })
    .eq('id', id)
    .select('id,name,imageUrl')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json({ data: { ...data } });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  let replacementCategoryId = '';

  try {
    const body = await request.json();
    replacementCategoryId = String(body?.replacementCategoryId ?? '').trim();
  } catch {
    replacementCategoryId = '';
  }

  const { count, error: countError } = await supabase
    .from('Product')
    .select('id', { count: 'exact', head: true })
    .eq('categoryId', id);

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) > 0) {
    if (!replacementCategoryId) {
      return NextResponse.json({ error: 'REASSIGN_REQUIRED' }, { status: 409 });
    }

    if (replacementCategoryId === id) {
      return NextResponse.json({ error: 'Replacement category must be different' }, { status: 400 });
    }

    const { data: replacementCategory, error: replacementCategoryError } = await supabase
      .from('Category')
      .select('id')
      .eq('id', replacementCategoryId)
      .maybeSingle();

    if (replacementCategoryError) {
      return NextResponse.json({ error: replacementCategoryError.message }, { status: 500 });
    }

    if (!replacementCategory?.id) {
      return NextResponse.json({ error: 'Replacement category not found' }, { status: 404 });
    }

    const { error: migrateError } = await supabase
      .from('Product')
      .update({ categoryId: replacementCategoryId })
      .eq('categoryId', id);

    if (migrateError) {
      return NextResponse.json({ error: migrateError.message }, { status: 500 });
    }
  }

  const { error } = await supabase.from('Category').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: null });
}
