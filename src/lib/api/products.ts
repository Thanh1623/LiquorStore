import api from "./api-client";
import { CreateProductInput, Product, UpdateProductInput } from "@/types/product";
import { ApiResponse } from "@/types/api";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>("/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
  const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: CreateProductInput): Promise<ApiResponse<Product>> => {
  const response = await api.post<ApiResponse<Product>>("/products", product);
  return response.data;
};

export const updateProduct = async ({ id, ...product }: UpdateProductInput): Promise<ApiResponse<Product>> => {
  const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/products/${id}`);
  return response.data;
};
