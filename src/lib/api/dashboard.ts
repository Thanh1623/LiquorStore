import api from './api-client';
import { ApiResponse } from '@/types/api';
import { DashboardSummary, RevenuePoint } from '@/types/dashboard';

export const getDashboardSummary = async () => {
  const response = await api.get<ApiResponse<DashboardSummary>>('/admin/dashboard/summary');
  return response.data;
};

export const getRevenueSeries = async () => {
  const response = await api.get<ApiResponse<RevenuePoint[]>>('/admin/dashboard/revenue');
  return response.data;
};
