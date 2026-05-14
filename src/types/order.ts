export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface OrderListItem {
  id: string;
  customerEmail: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  itemCount: number;
}

export interface OrderItemDetail {
  id: string;
  quantity: number;
  priceAtTime: number;
  productName: string;
}

export interface OrderDetail {
  id: string;
  customerEmail: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemDetail[];
}

export interface OrderListResponse {
  items: OrderListItem[];
  total: number;
  page: number;
  pageSize: number;
}
