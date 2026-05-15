"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function SpiritCategories() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = response?.data ?? [];

  if (isLoading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={2}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !mt-12', // Tăng margin top cho dấu chấm
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          className="!pb-16" // Tăng padding bottom để chứa dấu chấm
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#AB4227] overflow-hidden relative cursor-pointer"
                >
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                      No image
                    </div>
                  )}
                </motion.div>
                <h3 className="text-xl font-serif text-[#212529] font-medium text-center">
                  {category.name}
                </h3>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
