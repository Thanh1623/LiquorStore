"use client";
import { products } from "@/lib/mock-data";
import { useCartStore } from "@/store/cartStore";

export function ProductList() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="border border-[#CCCCCC] p-4 hover:shadow-lg transition-all">
          <div className="h-48 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
            <img src={product.image} alt={product.name} className="h-full object-cover" />
          </div>
          <h3 className="text-[18px] font-serif font-medium">{product.name}</h3>
          <p className="text-[#AB4227] font-serif">${product.price}</p>
          <button 
            onClick={() => addItem(product)}
            className="mt-4 w-full bg-[#212529] text-white py-2 font-serif text-[14px] hover:bg-[#333]"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
