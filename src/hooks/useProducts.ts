import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string | null;
  description: string | null;
  stock_quantity: number;
}

export function useProducts() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Product')
        .select('*');

      if (error) throw error;
      
      return (data as any[]).map(p => ({
        ...p,
        image: p.image_url,
        price: Number(p.price)
      })) as Product[];
    },
  });

  // Global Error Logging/Handling can be added here
  if (query.error) {
    console.error('Error fetching products:', query.error);
  }

  return query;
}
