import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-[#212529]">
      {/* Background image */}
      <Image
        src="https://chuyenruouvangnhapkhau.com/upload/default/images/R%C6%B0%E1%BB%A3u%20Vang%20%C3%9D%20Con%20C%C3%B4ng%20Vindoro%2024%20Karat%20Gold%202019%208.jpg"
        alt="Premium Spirits"
        fill
        className="object-cover"
        priority
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#000000] opacity-60"></div>
      
      <div className="relative z-10 space-y-6 md:space-y-8 max-w-4xl px-4 md:px-8">
        <h1 className="text-[40px] md:text-[80px] font-serif text-white leading-[45px] md:leading-[88px] font-bold">
          Good Drink for Good Moments
        </h1>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/shop" 
            className="bg-[#AB4227] text-white font-serif px-6 py-2 rounded-[3px] font-medium hover:bg-[#B7472A] transition-all"
          >
            Shop Now
          </Link>
          <Link 
            href="/about" 
            className="border border-white text-white font-serif px-6 py-2 rounded-[3px] font-medium hover:bg-white hover:text-black transition-all"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}