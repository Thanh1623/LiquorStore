import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-[#212529]">
      {/* Background image */}
      <Image
        src="https://vintagewine.vn/wp-content/uploads/2021/12/111-scaled.jpg"
        alt="Premium Spirits"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative z-10 space-y-6 md:space-y-8 max-w-4xl px-4 md:px-8">
        <h1 className="text-[40px] md:text-[80px] font-serif text-white leading-[45px] md:leading-[88px] font-bold italic">
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