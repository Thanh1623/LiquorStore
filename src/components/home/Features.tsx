import { Phone, RotateCcw, Truck } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Phone,
      title: "ONLINE SUPPORT 24/7",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      icon: RotateCcw,
      title: "MONEY BACK GUARANTEE",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      icon: Truck,
      title: "FREE SHIPPING & RETURN",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    }
  ];

  return (
    <section className="bg-[#AB4227] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <feature.icon className="w-12 h-12 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg">{feature.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
