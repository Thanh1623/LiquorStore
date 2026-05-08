export function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center bg-[#1a1a1a]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549725510-1c6085a21008?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Our Legacy</h1>
        <p className="text-xl text-gray-200 font-serif italic">Crafting excellence since 1905</p>
      </div>
    </section>
  );
}
