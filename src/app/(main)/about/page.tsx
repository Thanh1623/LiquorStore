import { AboutHero } from "@/components/about/AboutHero";
import { Heritage } from "@/components/about/Heritage";
import { Craft } from "@/components/about/Craft";
import { Team } from "@/components/about/Team";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <AboutHero />
      <Heritage />
      <Craft />
      <Team />
    </main>
  );
}
