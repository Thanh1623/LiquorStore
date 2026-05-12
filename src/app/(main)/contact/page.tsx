export default function ContactPage() {
  return (
    <div className="container mx-auto px-8 py-24">
      <h1 className="text-[40px] md:text-[60px] font-serif font-bold text-[#212529] mb-12 text-center italic">
        Get in Touch
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8 font-serif">
          <div className="space-y-4">
            <h2 className="text-[22px] font-medium text-[#212529]">Visit Us</h2>
            <p className="text-[16px] text-[#808080] leading-relaxed">
              123 Distiller Way, Spirit City<br />
              Open daily: 10:00 AM - 10:00 PM
            </p>
          </div>
          <div className="space-y-4">
             <h2 className="text-[22px] font-medium text-[#212529]">Let&apos;s Talk</h2>
            <p className="text-[16px] text-[#808080] leading-relaxed">
              Phone: +00 1234 567<br />
              Email: hello@liquorstore.com
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-4 border border-[#CCCCCC] rounded-[4px] font-serif focus:border-[#AB4227] focus:outline-none focus:ring-1 focus:ring-[#AB4227]"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 border border-[#CCCCCC] rounded-[4px] font-serif focus:border-[#AB4227] focus:outline-none focus:ring-1 focus:ring-[#AB4227]"
          />
          <textarea 
            placeholder="Your Message" 
            rows={5}
            className="w-full p-4 border border-[#CCCCCC] rounded-[4px] font-serif focus:border-[#AB4227] focus:outline-none focus:ring-1 focus:ring-[#AB4227]"
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-[#AB4227] text-white py-4 font-serif text-[15px] font-medium rounded-[3px] hover:bg-[#B7472A] transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}