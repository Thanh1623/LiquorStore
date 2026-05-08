import Image from "next/image";

export function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[500px]">
          <Image
            src="https://swirlwinegroup.com/wp-content/uploads/2021/11/pr4.jpeg"
            alt="About us"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <p className="text-[#AB4227] italic font-serif">Since 1905</p>
          <h2 className="text-4xl font-serif font-bold text-black">Desire Meets A New Taste</h2>
          <p className="text-gray-600 leading-relaxed">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
          <p className="text-gray-600 leading-relaxed">
            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
          </p>
          <p className="text-3xl font-serif text-black font-bold">115 <span className="text-xl font-normal">Years of Experience In Business</span></p>
        </div>
      </div>
    </section>
  );
}
