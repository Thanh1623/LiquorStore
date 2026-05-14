import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type ProductRow = {
  id: string;
  name: string;
  price: number | string;
  description: string | null;
  imageUrl: string | null;
  stockQuantity: number | null;
  categoryId: string;
};

type CategoryRow = {
  id: string;
  name: string;
};

const toProductDto = (row: ProductRow, categoryName?: string) => ({
  id: row.id,
  name: row.name,
  price: Number(row.price ?? 0),
  description: row.description ?? '',
  imageUrl: row.imageUrl ?? '',
  stockQuantity: Number(row.stockQuantity ?? 0),
  categoryId: row.categoryId,
  categoryName: categoryName ?? '',
});

export async function GET() {
  const supabase = await createClient();

  const { data: products, error: productsError } = await supabase
    .from('Product')
    .select('id,name,price,description,imageUrl,stockQuantity,categoryId')
    .order('name', { ascending: true });

  if (productsError) {
    return NextResponse.json({ error: productsError.message }, { status: 500 });
  }

  const categoryIds = Array.from(new Set((products ?? []).map((p) => p.categoryId)));
  let categoryMap = new Map<string, string>();

  if (categoryIds.length > 0) {
    const { data: categories, error: categoriesError } = await supabase
      .from('Category')
      .select('id,name')
      .in('id', categoryIds);

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 500 });
    }

    categoryMap = new Map((categories as CategoryRow[]).map((c) => [c.id, c.name]));
  }

  const data = (products as ProductRow[]).map((p) => toProductDto(p, categoryMap.get(p.categoryId)));
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const name = String(body?.name ?? '').trim();
  const categoryId = String(body?.categoryId ?? '').trim();
  const price = Number(body?.price ?? 0);
  const description = String(body?.description ?? '').trim();
  const imageUrl = String(body?.imageUrl ?? '').trim();
  const stockQuantity = Number(body?.stockQuantity ?? 0);

  if (!name || !categoryId || Number.isNaN(price) || price < 0 || Number.isNaN(stockQuantity) || stockQuantity < 0) {
    return NextResponse.json({ error: 'Invalid product payload' }, { status: 400 });
  }

  const { data: existingCategory, error: existingCategoryError } = await supabase
    .from('Category')
    .select('id,name')
    .eq('id', categoryId)
    .maybeSingle();

  if (existingCategoryError) {
    return NextResponse.json({ error: existingCategoryError.message }, { status: 500 });
  }

  if (!existingCategory) {
    return NextResponse.json({ error: 'Category not found' }, { status: 400 });
  }

  const { data: createdProduct, error: createProductError } = await supabase
    .from('Product')
    .insert({
      name,
      price,
      description: description || null,
      imageUrl: imageUrl || null,
      stockQuantity,
      categoryId,
    })
    .select('id,name,price,description,imageUrl,stockQuantity,categoryId')
    .single();

  if (createProductError || !createdProduct) {
    return NextResponse.json(
      { error: createProductError?.message ?? 'Failed to create product' },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: toProductDto(createdProduct as ProductRow, existingCategory.name) }, { status: 201 });
}
