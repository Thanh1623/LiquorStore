import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const router = useRouter();

  return (
    <div className="group block">
      {/* Container with subtle border */}
      <div className="relative aspect-[2/3] w-2/3 mx-auto overflow-hidden bg-white border border-gray-100 mb-6">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Badge Placeholder */}
        {product.badge && (
          <div className="absolute bottom-2 left-2 bg-[#AB4227] text-white text-[10px] px-2 py-1 uppercase tracking-wider">{product.badge}</div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button 
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} added to cart!`);
            }}
            className="bg-white p-2 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
          <button 
            onClick={() => router.push(`/shop/${product.id}`)}
            className="bg-white p-2 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>
      
      {/* Product Details - Minimalist */}
      <Link href={`/shop/${product.id}`} className="space-y-1 block">
        <p className="text-[#AB4227] italic font-serif text-sm tracking-wide text-center">{product.categoryName}</p>
        <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] group-hover:underline underline-offset-4 text-center">
          {product.name}
        </h3>
        <p className="text-[#1A1A1A] font-light tracking-wider text-center text-sm">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
}
