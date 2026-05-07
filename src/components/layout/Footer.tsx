export function Footer() {
  return (
    <footer className="bg-[#000000] py-12">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-serif text-[12px] font-light text-[rgba(255,255,255,0.6)]">
        {/* Brand */}
        <div className="space-y-4">
          <p className="text-lg font-semibold text-white tracking-widest">LIQUOR STORE</p>
          <p className="leading-relaxed">
            Crafting memorable moments with premium spirits since 1905. Experience the art of tradition and quality in every bottle.
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <p className="text-[14px] font-semibold text-white">CONTACT US</p>
          <ul className="space-y-2">
            <li>123 Distiller Way, Spirit City</li>
            <li>Phone: +00 1234 567</li>
            <li>Email: hello@liquorstore.com</li>
          </ul>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <p className="text-[14px] font-semibold text-white">USEFUL LINKS</p>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/products" className="hover:text-white transition-colors">Premium Collection</a></li>
            <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
            <li><a href="/checkout" className="hover:text-white transition-colors">Checkout</a></li>
          </ul>
        </div>

        {/* Newsletter / Socials */}
        <div className="space-y-4">
          <p className="text-[14px] font-semibold text-white">STAY CONNECTED</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
          {/* Copyright moved here and smaller */}
          <p className="pt-4 text-[10px] text-[rgba(255,255,255,0.3)]">
            © {new Date().getFullYear()} LiquorStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
