import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group block">
      {/* Container with subtle border */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 mb-6">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button className="bg-white p-2 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors">
            <ShoppingBag size={20} />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors">
            <Heart size={20} />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors">
            <Eye size={20} />
          </button>
        </div>
      </div>
      
      {/* Product Details - Minimalist */}
      <Link href={`/shop/${product.id}`} className="space-y-1 block">
        <p className="text-[#AB4227] italic font-serif text-sm tracking-wide text-center">{product.category}</p>
        <h3 className="text-xl font-serif font-semibold text-[#1A1A1A] group-hover:underline underline-offset-4 text-center">
          {product.name}
        </h3>
        <p className="text-[#1A1A1A] font-light tracking-wider text-center">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
}
