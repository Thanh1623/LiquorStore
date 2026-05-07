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
      
      <div className="relative z-10 max-w-4xl px-4 md:px-8">
        <div className="relative font-serif text-white mb-12">
          {/* Artistic Text Layout */}
          <div className="relative flex flex-col items-center">
            <div className="relative flex items-center gap-4">
              <span className="text-4xl md:text-6xl text-transparent [-webkit-text-stroke:1px_white] -rotate-12">Good</span>
              <span className="text-5xl md:text-8xl font-bold">Drink</span>
            </div>
            <span className="italic text-lg md:text-2xl my-2">for</span>
            <div className="relative flex items-center gap-4">
              <span className="text-4xl md:text-6xl text-transparent [-webkit-text-stroke:1px_white] -rotate-12">Good</span>
              <span className="text-5xl md:text-8xl font-bold">Moments</span>
            </div>
          </div>
        </div>

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