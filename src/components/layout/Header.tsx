import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          LiquorStore
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-sm">Cart (0)</Link>
        </div>
      </div>
    </header>
  );
}
