"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import Image from "next/image";
import { ProductDetailsSkeleton } from "@/components/shop/ProductDetailsSkeleton";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !response) return <div className="text-center py-24">Error loading product.</div>;

  const product = response.data;

  return (
    <main className="bg-[#FDFBF7] min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[2/3] w-full max-w-md mx-auto overflow-hidden bg-white border border-gray-100">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                />
            </div>
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A]">{product.name}</h1>
                <p className="text-[#AB4227] italic font-serif text-lg">{product.categoryName}</p>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-2xl font-light text-[#1A1A1A]">${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addItem(product)}
                  className="bg-[#AB4227] text-white px-8 py-3 rounded-md hover:bg-[#8e3620] transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}
