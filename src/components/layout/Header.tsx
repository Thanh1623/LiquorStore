"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#CCCCCC] bg-white h-[73px]">
      <div className="container mx-auto flex h-full items-center justify-between px-8">
        <Link href="/" className="text-3xl font-bold tracking-tighter text-[#212529] font-serif">
          LIQUOR STORE
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium font-serif text-[#212529]">
          <Link href="/" className="transition-colors hover:text-[#AB4227]">Home</Link>
          <Link href="/about" className="transition-colors hover:text-[#AB4227]">About</Link>
          <Link href="/products" className="transition-colors hover:text-[#AB4227]">Products</Link>
          <Link href="/blog" className="transition-colors hover:text-[#AB4227]">Blog</Link>
          <Link href="/contact" className="transition-colors hover:text-[#AB4227]">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-2 text-[16px] font-medium text-[#212529] font-serif transition-colors hover:text-[#AB4227]">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  );
}
