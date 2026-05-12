import Image from "next/image";

export function Heritage() {
  return (
    <section className="py-24 bg-[#F5F4F0]">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5]">
          <Image
            src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=800&q=80"
            alt="Heritage"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-serif font-bold text-[#212529]">A Century of Craft</h2>
          <p className="text-gray-600 leading-relaxed italic">&ldquo;Tradition is not the worship of ashes, but the preservation of fire.&rdquo;</p>
          <p className="text-gray-700 leading-relaxed">
            Founded in 1905, our journey began with a simple passion for perfection. 
            Through generations, we have honored the time-tested techniques while embracing innovation to bring you the finest spirits.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every bottle tells a story of dedication, refined by time, and perfected by masters of the craft.
          </p>
        </div>
      </div>
    </section>
  );
}
