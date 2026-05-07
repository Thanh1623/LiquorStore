export function Categories() {
  const categories = [
    { name: "Whiskey", desc: "Aged to perfection" },
    { name: "Wine", desc: "From the best vineyards" },
    { name: "Vodka", desc: "Pure and smooth" },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <h2 className="text-[18px] font-serif text-[#212529] text-center mb-12 font-medium tracking-wide">BROWSE BY CATEGORY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-[#F5F4F0] p-8 rounded-[4px] text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-[22px] font-serif text-[#212529] font-medium">{cat.name}</h3>
              <p className="text-[16px] font-serif text-[#808080]">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}