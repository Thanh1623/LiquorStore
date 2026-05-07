export function Footer() {
  return (
    <footer className="bg-[#000000] py-12">
      <div className="container mx-auto px-8 text-center text-[12px] font-light font-serif text-[rgba(255,255,255,0.6)]">
        <p className="mb-4 text-lg font-semibold text-white">LIQUOR STORE</p>
        <p>© {new Date().getFullYear()} LiquorStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
