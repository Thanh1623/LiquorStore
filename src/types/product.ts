export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
  categoryName: string;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  stockQuantity?: number;
  categoryName?: string;
}
