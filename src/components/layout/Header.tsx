"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Globe } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="z-50 w-full">
      {/* Top Bar (Non-sticky) */}
      <div className="bg-[#A23F25] text-white py-2 text-[12px] font-serif hidden md:block">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> +00 1234 567</span>
            <span className="flex items-center gap-1"><Mail size={12} /> youremail@email.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook size={14} />
            <Twitter size={14} />
            <Instagram size={14} />
            <Globe size={14} />
            <span className="border-l border-white/20 pl-4">SIGN UP</span>
            <span>LOG IN</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar (Sticky) */}
      <div className="sticky top-0 bg-white border-b border-[#CCCCCC] h-[73px]">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-[#212529] font-serif">
            LIQUOR STORE
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium font-serif text-[#212529]">
            <Link href="/" className="transition-colors hover:text-[#AB4227]">HOME</Link>
            <Link href="/about" className="transition-colors hover:text-[#AB4227]">ABOUT</Link>
            <Link href="/products" className="transition-colors hover:text-[#AB4227]">PRODUCTS</Link>
            <Link href="/blog" className="transition-colors hover:text-[#AB4227]">BLOG</Link>
            <Link href="/contact" className="transition-colors hover:text-[#AB4227]">CONTACT</Link>
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
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-[#CCCCCC] p-4 flex flex-col gap-4 text-[16px] font-medium font-serif text-[#212529]">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">HOME</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">ABOUT</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">PRODUCTS</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">BLOG</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">CONTACT</Link>
        </nav>
      )}
    </header>
  );
}
