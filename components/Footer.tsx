import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-ivory border-t border-rose/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6 text-center md:text-left">
            <Link href="/" className="text-3xl font-serif font-bold tracking-widest text-wine">
              LINGERIE HUB
            </Link>
            <p className="text-rose font-light italic leading-relaxed">
              Empowering the feminine spirit through luxury, intimacy, and the art of self-love.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-wine mb-6">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-charcoal/70 hover:text-wine transition-colors font-light text-sm italic">The Signature Line</Link></li>
              <li><Link href="/new" className="text-charcoal/70 hover:text-wine transition-colors font-light text-sm italic">New Arrivals</Link></li>
              <li><Link href="/sale" className="text-wine hover:text-charcoal transition-colors font-medium text-sm italic">Private Sale</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-wine mb-6">Experience</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-charcoal/70 hover:text-wine transition-colors font-light text-sm italic">Bespoke Fitting</Link></li>
              <li><Link href="/shipping" className="text-charcoal/70 hover:text-wine transition-colors font-light text-sm italic">Care Guide</Link></li>
              <li><Link href="/faq" className="text-charcoal/70 hover:text-wine transition-colors font-light text-sm italic">Intimate Support</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-wine mb-6">The Atelier</h3>
            <p className="text-rose font-light text-sm italic mb-6">Join our intimate community for private updates.</p>
            <div className="flex border-b border-wine/20 pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent px-0 py-2 text-sm italic text-charcoal placeholder:text-rose/50 focus:outline-none w-full"
              />
              <button className="text-wine text-xs uppercase tracking-widest font-bold hover:text-charcoal transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-rose/10 pt-12 text-center text-rose/50 text-[10px] uppercase tracking-[0.3em] font-bold">
          <p>© {new Date().getFullYear()} LINGERIE HUB ATELIER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
