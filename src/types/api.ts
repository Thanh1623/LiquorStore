export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface GetProductsParams {
  category?: string;
  search?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}
