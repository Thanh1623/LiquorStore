import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury liquor background"
          fill
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/20" />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif tracking-widest uppercase">Liquor Store</h1>
            <p className="text-sm text-neutral-500 mt-2 font-serif">Premium spirits experience</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
