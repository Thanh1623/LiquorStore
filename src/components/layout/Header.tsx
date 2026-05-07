"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#CCCCCC] bg-white h-[73px]">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-[#212529] font-serif">
          LIQUOR STORE
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium font-serif text-[#212529]">
          <Link href="/" className="transition-colors hover:text-[#AB4227]">Home</Link>
          <Link href="/products" className="transition-colors hover:text-[#AB4227]">Products</Link>
          <Link href="/login" className="transition-colors hover:text-[#AB4227]">Login</Link>
          <Link href="/admin" className="transition-colors hover:text-[#AB4227]">Admin</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/checkout" className="text-[16px] font-medium text-[#212529] font-serif transition-colors hover:text-[#AB4227]">
            Cart ({totalItems})
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-[#CCCCCC] p-4 flex flex-col gap-4 text-[16px] font-medium font-serif text-[#212529]">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">Products</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">Login</Link>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">Admin</Link>
        </nav>
      )}
    </header>
  );
}
