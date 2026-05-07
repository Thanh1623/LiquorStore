import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-[#212529]">
      {/* Background image */}
      <Image
        src="https://chuyenruouvangnhapkhau.com/upload/default/images/R%C6%B0%E1%BB%A3u%20Vang%20%C3%9D%20Con%20C%C3%B4ng%20Vindoro%2024%20Karat%20Gold%202019%208.jpg"
        alt="Premium Spirits"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative z-10 space-y-6 md:space-y-8 max-w-4xl px-4 md:px-8">
        <h1 className="text-[50px] md:text-[90px] font-serif leading-[1.1] font-bold text-center">
          <span className="inline-block -rotate-6 [-webkit-text-stroke:1px_white] text-transparent">Good</span>{" "}
          <span className="inline-block text-white">Drink</span>{" "}
          <span className="inline-block -rotate-6 [-webkit-text-stroke:1px_white] text-transparent">for Good</span>{" "}
          <span className="inline-block text-white">Moments</span>
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