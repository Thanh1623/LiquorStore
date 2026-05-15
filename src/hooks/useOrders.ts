import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrder, getOrderById, getOrders, updateOrderStatus } from '@/lib/api/orders';
import { OrderStatus } from '@/types/order';

export const useOrders = (params: { page: number; pageSize: number; status?: string; search?: string }) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getOrders(params),
  });
};

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ['order-detail', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order-detail', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-revenue'] });
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
