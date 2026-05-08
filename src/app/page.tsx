import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { AboutUs } from "@/components/home/AboutUs";
import { SpiritCategories } from "@/components/home/SpiritCategories";
import { Intro } from "@/components/home/Intro";
import { Categories } from "@/components/home/Categories";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Features />
      <AboutUs />
      <SpiritCategories />
      <Intro />
      <Categories />
    </div>
  );
}
