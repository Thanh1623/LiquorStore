export interface Category {
  id: string;
  name: string;
  productCount?: number;
}

export interface CreateCategoryInput {
  name: string;
}

export interface UpdateCategoryInput {
  id: string;
  name: string;
}

export interface DeleteCategoryInput {
  id: string;
  replacementCategoryId?: string;
}
