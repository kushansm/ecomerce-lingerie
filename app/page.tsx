import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Silk Lace Bralette",
    price: 45.00,
    category: "Lingerie",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    name: "Satin Nightgown",
    price: 65.00,
    category: "Sleepwear",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    name: "Embroidered Set",
    price: 89.00,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "4",
    name: "Velvet Bodysuit",
    price: 55.00,
    category: "Bodysuits",
    image: "https://images.unsplash.com/photo-1549062300-1d3ad90bb4d5?auto=format&fit=crop&q=80&w=600"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-purple-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-pink-100/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">New Collection 2024</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Elegance in <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                Every Detail
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover our curated collection of premium lingerie designed to empower and inspire. Experience the perfect blend of comfort and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
                Shop Collection
              </Link>
              <Link href="/categories" className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center group">
                Browse Categories
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-500">On all orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-500">Ethically sourced materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-500">Our hand-picked selection for this season.</p>
            </div>
            <Link href="/shop" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-900 rounded-[32px] overflow-hidden p-8 lg:p-16">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1571945153237-4929e783ee4a?auto=format&fit=crop&q=80&w=1200" 
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Get 20% off your <br />
                first purchase
              </h2>
              <p className="text-gray-300 text-lg mb-10">
                Join our community and be the first to know about new arrivals, sales, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow"
                />
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
