import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Categories } from "@/components/home/Categories";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Intro />
      <Categories />
    </div>
  );
}
