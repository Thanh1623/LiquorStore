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
  isFeatured: boolean;
  badge: string | null;
  oldPrice: number | string | null;
};

const toProductDto = (row: ProductRow, category: string) => ({
  id: row.id,
  name: row.name,
  price: Number(row.price ?? 0),
  description: row.description ?? '',
  imageUrl: row.imageUrl ?? '',
  stockQuantity: Number(row.stockQuantity ?? 0),
  categoryId: row.categoryId,
  categoryName: category,
  isFeatured: row.isFeatured,
  badge: row.badge,
  oldPrice: row.oldPrice ? Number(row.oldPrice) : null,
});

async function resolveCategoryName(categoryId: string) {
  const supabase = await createClient();

  const { data: existingCategory, error: existingCategoryError } = await supabase
    .from('Category')
    .select('id,name')
    .eq('id', categoryId)
    .maybeSingle();

  if (existingCategoryError) {
    return { categoryId: null, error: existingCategoryError.message };
  }

  if (!existingCategory?.id) {
    return { categoryName: null, error: 'Category not found' };
  }

  return { categoryName: existingCategory.name, error: null };
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from('Product')
    .select('id,name,price,description,imageUrl,stockQuantity,categoryId,isFeatured,badge,oldPrice')
    .eq('id', id)
    .maybeSingle();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const { data: category } = await supabase
    .from('Category')
    .select('id,name')
    .eq('id', product.categoryId)
    .maybeSingle();

  return NextResponse.json({ data: toProductDto(product as ProductRow, category?.name ?? '') });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const updates: Record<string, unknown> = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    updates.name = name;
  }

  if (body.price !== undefined) {
    const price = Number(body.price);
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    }
    updates.price = price;
  }

  if (body.description !== undefined) {
    const description = String(body.description).trim();
    updates.description = description || null;
  }

  if (body.imageUrl !== undefined) {
    const imageUrl = String(body.imageUrl).trim();
    updates.imageUrl = imageUrl || null;
  }

  if (body.stockQuantity !== undefined) {
    const stockQuantity = Number(body.stockQuantity);
    if (Number.isNaN(stockQuantity) || stockQuantity < 0) {
      return NextResponse.json({ error: 'Invalid stock quantity' }, { status: 400 });
    }
    updates.stockQuantity = stockQuantity;
  }

  if (body.categoryId !== undefined) {
    const categoryId = String(body.categoryId).trim();
    if (!categoryId) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const { categoryName, error } = await resolveCategoryName(categoryId);
    if (error || !categoryName) {
      return NextResponse.json({ error: error ?? 'Failed to resolve category' }, { status: 400 });
    }
    updates.categoryId = categoryId;
  }
  
  if (body.isFeatured !== undefined) {
    updates.isFeatured = Boolean(body.isFeatured);
  }
  
  if (body.badge !== undefined) {
    updates.badge = body.badge ? String(body.badge).trim() : null;
  }
  
  if (body.oldPrice !== undefined) {
    updates.oldPrice = body.oldPrice ? Number(body.oldPrice) : null;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
  }

  const { data: updatedProduct, error: updateError } = await supabase
    .from('Product')
    .update(updates)
    .eq('id', id)
    .select('id,name,price,description,imageUrl,stockQuantity,categoryId,isFeatured,badge,oldPrice')
    .maybeSingle();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (!updatedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const { data: category } = await supabase
    .from('Category')
    .select('id,name')
    .eq('id', updatedProduct.categoryId)
    .maybeSingle();

  return NextResponse.json({ data: toProductDto(updatedProduct as ProductRow, category?.name ?? '') });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from('Product').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: null });
}
