export interface Category {
  id: string;
  name: string;
  imageUrl?: string | null;
  productCount?: number;
}

export interface CreateCategoryInput {
  name: string;
  imageUrl?: string | null;
}

export interface UpdateCategoryInput {
  id: string;
  name: string;
  imageUrl?: string | null;
}

export interface DeleteCategoryInput {
  id: string;
  replacementCategoryId?: string;
}
