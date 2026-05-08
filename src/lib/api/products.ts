import { apiClient } from "./client";
import { Product } from "../mock-data";
import { ApiResponse } from "@/types/api";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  return apiClient<ApiResponse<Product[]>>("/products");
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
  return apiClient<ApiResponse<Product>>(`/products/${id}`);
};
