"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  { name: "Brandy", image: "https://images.unsplash.com/photo-1549725510-1c6085a21008?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Gin", image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Rum", image: "https://images.unsplash.com/photo-1614362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Tequila", image: "https://images.unsplash.com/photo-1516537596096-735399587a8b?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Vodka", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Whiskey", image: "https://images.unsplash.com/photo-1527281400688-1961e5f171d2?auto=format&fit=crop&w=300&h=300&q=80" },
];

export function SpiritCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#AB4227] overflow-hidden relative cursor-pointer"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <h3 className="text-xl font-serif text-[#212529] font-medium">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
