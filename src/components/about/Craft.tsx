export function Craft() {
  const steps = [
    { title: "Select Ingredients", desc: "Sourcing the finest grains and botanicals." },
    { title: "Distillation", desc: "Precision-controlled, small-batch distillation." },
    { title: "Maturation", desc: "Aging in premium, charred oak barrels." },
    { title: "Bottling", desc: "Hand-finished, quality-checked final product." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-[#212529] mb-16">The Art of Craft</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="p-6 border border-gray-200 hover:border-[#AB4227] transition-all">
              <div className="w-12 h-12 bg-[#AB4227] text-white flex items-center justify-center rounded-full mx-auto mb-6 font-serif text-xl">{i+1}</div>
              <h3 className="text-lg font-serif font-bold text-[#212529] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
