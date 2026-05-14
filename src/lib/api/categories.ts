import api from './api-client';
import { ApiResponse } from '@/types/api';
import { Category, CreateCategoryInput, DeleteCategoryInput, UpdateCategoryInput } from '@/types/category';

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>('/categories');
  return response.data;
};

export const createCategory = async (payload: CreateCategoryInput): Promise<ApiResponse<Category>> => {
  const response = await api.post<ApiResponse<Category>>('/categories', payload);
  return response.data;
};

export const updateCategory = async ({ id, ...payload }: UpdateCategoryInput): Promise<ApiResponse<Category>> => {
  const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, payload);
  return response.data;
};

export const deleteCategory = async ({ id, replacementCategoryId }: DeleteCategoryInput): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/categories/${id}`, {
    data: replacementCategoryId ? { replacementCategoryId } : undefined,
  });
  return response.data;
};
