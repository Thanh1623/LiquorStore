export interface DashboardSummary {
  totalInventory: number;
  monthlyRevenue: number;
  activeOrders: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}
