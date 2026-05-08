import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
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
    <Link href={`/shop/${product.id}`} className="group block">
      {/* Container with subtle border */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-gray-300 transition-colors duration-500 mb-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      {/* Product Details - Minimalist */}
      <div className="space-y-1">
        <p className="text-[#AB4227] italic font-serif text-sm tracking-wide">{product.category}</p>
        <h3 className="text-xl font-serif font-semibold text-[#1A1A1A] group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <p className="text-[#1A1A1A] font-light tracking-wider">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
