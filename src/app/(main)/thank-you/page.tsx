"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-[64px] font-serif font-bold text-[#AB4227] tracking-tight">
          Merci!
        </h1>
        <p className="text-[24px] font-serif text-[#212529]">
          Your order has been placed with the utmost care.
        </p>
        <p className="text-[#666666] font-serif text-lg">
          We are preparing your selection, and it will be dispatched shortly. A confirmation has been sent to your email.
        </p>
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block bg-[#AB4227] text-white px-12 py-4 font-serif font-bold uppercase tracking-widest hover:bg-[#8e3620] transition-all rounded-sm"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
