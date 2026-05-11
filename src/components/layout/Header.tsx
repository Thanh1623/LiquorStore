"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 73);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar (Scrolls away) */}
      <div className={cn(
        "bg-[#A23F25] text-white py-2 text-[12px] font-serif hidden md:block transition-all duration-300",
        isHome && !isScrolled ? "hidden" : "block"
      )}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +00 1234 567
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              youremail@email.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <Link href="/register" className="border-l border-white/20 pl-4 hover:underline">SIGN UP</Link>
            <Link href="/login" className="hover:underline">LOG IN</Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar (Sticky) */}
      <header className={cn(
        "z-50 border-b h-[73px] transition-all duration-300 w-full",
        isHome && !isScrolled 
          ? "absolute top-6 bg-transparent border-transparent text-white" 
          : "sticky top-0 bg-white border-[#CCCCCC] text-[#212529]"
      )}>
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter font-serif">
            LIQUOR STORE
          </Link>
          
          {/* Desktop Nav */}
          <nav className={cn(
            "hidden md:flex items-center gap-8 text-[16px] font-medium font-serif",
            isHome && !isScrolled ? "text-white" : "text-[#212529]"
          )}>
            <Link href="/" className="transition-colors hover:text-[#AB4227]">HOME</Link>
            <Link href="/about" className="transition-colors hover:text-[#AB4227]">ABOUT</Link>
            <Link href="/shop" className="transition-colors hover:text-[#AB4227]">PRODUCTS</Link>
            <Link href="/blog" className="transition-colors hover:text-[#AB4227]">BLOG</Link>
            <Link href="/contact" className="transition-colors hover:text-[#AB4227]">CONTACT</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/checkout" className={cn(
              "text-[16px] font-medium font-serif transition-colors hover:text-[#AB4227]",
              isHome && !isScrolled ? "text-white" : "text-[#212529]"
            )}>
              Cart ({totalItems})
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden bg-white border-b border-[#CCCCCC] p-4 flex flex-col gap-4 text-[16px] font-medium font-serif text-[#212529]">
            <Link href="/register" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">SIGN UP</Link>
            <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">LOG IN</Link>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">HOME</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">ABOUT</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">PRODUCTS</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">BLOG</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#AB4227]">CONTACT</Link>
          </nav>
        )}
      </header>
    </>
  );
}

