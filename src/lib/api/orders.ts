import api from './api-client';
import { ApiResponse } from '@/types/api';
import { OrderDetail, OrderListResponse, OrderStatus } from '@/types/order';

export const createOrder = async (orderData: {
  fullName: string;
  address: string;
  phone: string;
  items: { productId: string; quantity: number }[];
  total: number;
}) => {
  const response = await api.post<ApiResponse<{ id: string }>>('/orders', orderData);
  return response.data;
};

export const getOrders = async (params: { page: number; pageSize: number; status?: string; search?: string }) => {
  const query = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  });
  if (params.status && params.status !== 'all') {
    query.set('status', params.status);
  }
  if (params.search?.trim()) {
    query.set('search', params.search.trim());
  }

  const response = await api.get<ApiResponse<OrderListResponse>>(`/orders?${query.toString()}`);
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get<ApiResponse<OrderDetail>>(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const response = await api.patch<ApiResponse<{ id: string; status: OrderStatus }>>(`/orders/${id}`, { status });
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await api.delete<ApiResponse<{ success: boolean }>>(`/orders/${id}`);
  return response.data;
};
