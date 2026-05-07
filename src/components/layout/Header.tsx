import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="text-3xl font-bold tracking-tighter text-primary">
          LiquorStore
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary/70">Home</Link>
          <Link href="/shop" className="transition-colors hover:text-primary/70">Shop</Link>
          <Link href="/about" className="transition-colors hover:text-primary/70">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80">
            Cart <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
