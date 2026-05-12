"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus } from "lucide-react";
import { Product } from "@/lib/mock-data";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const tabs = ["Description", "Manufacturer", "Reviews"];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-gray-50">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A]">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex text-[#AB4227]">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-sm text-gray-500">100 Rating | 500 Sold</span>
          </div>

          <p className="text-3xl font-serif text-[#1A1A1A]">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 leading-relaxed">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100"><Minus size={16} /></button>
              <span className="px-6 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100"><Plus size={16} /></button>
            </div>
            <p className="text-sm text-gray-500">80 piece available</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="bg-[#AB4227] text-white px-10 py-3 font-serif font-bold hover:bg-[#8e3620] transition-all">Add to Cart</button>
            <button className="bg-[#AB4227] text-white px-10 py-3 font-serif font-bold hover:bg-[#8e3620] transition-all">Buy now</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex gap-8 mb-8 pt-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`font-serif text-xl font-bold ${activeTab === tab.toLowerCase() ? "text-[#AB4227]" : "text-gray-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 p-8">
          <h3 className="text-xl font-serif font-bold mb-4">{product.name}</h3>
          <p className="text-gray-600 leading-relaxed">
            Detailed information about {product.name} goes here. {product.name} is meticulously crafted to ensure the highest quality experience, bringing tradition and modern refinement together in every drop.
          </p>
        </div>
      </div>
    </div>
  );
}
