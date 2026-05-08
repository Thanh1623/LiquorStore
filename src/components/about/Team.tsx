import Image from "next/image";

export function Team() {
  const members = [
    { name: "John Distiller", role: "Master Distiller", img: "https://i.pravatar.cc/300?u=10" },
    { name: "Sarah Expert", role: "Lead Blender", img: "https://i.pravatar.cc/300?u=11" },
  ];

  return (
    <section className="py-24 bg-[#F5F4F0]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-[#212529] mb-16">Meet Our Masters</h2>
        <div className="flex justify-center gap-12">
          {members.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 relative">
                <Image src={m.img} alt={m.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#212529]">{m.name}</h3>
              <p className="text-[#AB4227] font-serif italic">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
