"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";

export function TastefullyYours() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { data: response, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const allProducts = response?.data ?? [];
  const products = allProducts.filter((p) => p.isFeatured).slice(0, 4);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewDetails = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/shop/${id}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="w-48 h-6 mx-auto mb-2" />
            <Skeleton className="w-72 h-10 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full aspect-[3/4]" />
                <Skeleton className="w-32 h-6 mx-auto" />
                <Skeleton className="w-48 h-8 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#AB4227] italic font-serif mb-2">Our Delightful offerings</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#212529]">Tastefully Yours</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium text-white ${
                    product.badge === "Sale" ? "bg-[#AB4227]" : 
                    product.badge === "Best Seller" ? "bg-[#AB4227]" : "bg-[#27AB85]"
                  }`}>
                    {product.badge}
                  </span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-white p-3 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </button>
                  <button 
                    onClick={(e) => handleViewDetails(product.id, e)}
                    className="bg-white p-3 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-2">
                <p className="text-[#AB4227] italic font-serif text-sm">{product.categoryName}</p>
                <h3 className="text-lg font-serif font-bold text-[#212529]">{product.name}</h3>
                <div className="flex justify-center gap-2 text-sm font-medium">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  )}
                  <span className="text-[#212529]">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#AB4227] font-serif font-bold text-lg hover:underline transition-all"
          >
            View all products <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
