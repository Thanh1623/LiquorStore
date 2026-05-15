export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
  isFeatured: boolean;
  badge?: string | null;
  oldPrice?: number | null;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: string;
  isFeatured?: boolean;
  badge?: string | null;
  oldPrice?: number | null;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  stockQuantity?: number;
  categoryId?: string;
  isFeatured?: boolean;
  badge?: string | null;
  oldPrice?: number | null;
}
