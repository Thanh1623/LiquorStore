"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, Eye } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Bacardi 151",
    category: "Brandy",
    image: "https://images.unsplash.com/photo-1549725510-1c6085a21008?auto=format&fit=crop&w=400&h=500&q=80",
    price: 49.00,
    oldPrice: 69.00,
    badge: "Sale"
  },
  {
    id: 2,
    name: "Jim Beam Kentucky Straight",
    category: "Gin",
    image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=400&h=500&q=80",
    price: 69.00,
    badge: "Best Seller"
  },
  {
    id: 3,
    name: "Citadelle",
    category: "Rum",
    image: "https://images.unsplash.com/photo-1614362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&h=500&q=80",
    price: 69.00,
    badge: "New Arrival"
  },
  {
    id: 4,
    name: "The Glenlivet",
    category: "Rum",
    image: "https://images.unsplash.com/photo-1527281400688-1961e5f171d2?auto=format&fit=crop&w=400&h=500&q=80",
    price: 69.00,
  },
];

export function TastefullyYours() {
  return (
    <section className="py-24 bg-white">
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
                  src={product.image}
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
                  {[ShoppingBag, Heart, Eye].map((Icon, idx) => (
                    <button key={idx} className="bg-white p-3 rounded-full hover:bg-[#AB4227] hover:text-white transition-colors">
                      <Icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-2">
                <p className="text-[#AB4227] italic font-serif text-sm">{product.category}</p>
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
      </div>
    </section>
  );
}
