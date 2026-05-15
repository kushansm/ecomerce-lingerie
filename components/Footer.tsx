import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ELMALI
            </Link>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Premium lingerie and fashion for the modern woman. Elevating your everyday confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-500 hover:text-purple-600 transition-colors">All Products</Link></li>
              <li><Link href="/new" className="text-gray-500 hover:text-purple-600 transition-colors">New Arrivals</Link></li>
              <li><Link href="/sale" className="text-gray-500 hover:text-purple-600 transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-500 hover:text-purple-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-500 hover:text-purple-600 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="text-gray-500 hover:text-purple-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-500 mb-4">Subscribe to get special offers and updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border border-gray-200 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-600 w-full"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ELMALI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
