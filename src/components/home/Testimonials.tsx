"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonialSlides = [
  [
    { id: 1, name: "Roger Scott", role: "Marketing Manager", quote: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jessica Doe", role: "Creative Director", quote: "A small river named Duden flows by their place and supplies it with the necessary regelialia.", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "John Smith", role: "UI Designer", quote: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.", avatar: "https://i.pravatar.cc/150?u=3" },
  ],
  [
    { id: 4, name: "Emily White", role: "CEO", quote: "The copy warned the Little Blind Text, that where it came from it would have been rewritten.", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Michael Brown", role: "Developer", quote: "One day however a small line of blind text by the name of Lorem Ipsum decided to leave.", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Sarah Connor", role: "Product Owner", quote: "It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", avatar: "https://i.pravatar.cc/150?u=6" },
  ]
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 bg-[#1a1a1a] text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#AB4227] italic font-serif mb-2">Testimonial</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Happy Clients</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonialSlides[currentIndex].map((item) => (
              <div key={item.id} className="border border-white/20 p-8 text-center space-y-6">
                <Quote className="text-[#AB4227] mx-auto" size={40} />
                <p className="italic text-gray-300 leading-relaxed">{item.quote}</p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-[#AB4227]">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <h4 className="font-serif font-bold text-lg">{item.name}</h4>
                  <p className="text-[#AB4227] text-sm">{item.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonialSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-[#AB4227]" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
