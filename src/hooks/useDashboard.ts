import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary, getRevenueSeries } from '@/lib/api/dashboard';

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
  });
};

export const useRevenueSeries = () => {
  return useQuery({
    queryKey: ['dashboard-revenue'],
    queryFn: getRevenueSeries,
  });
};
