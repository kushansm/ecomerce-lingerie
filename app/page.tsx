import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { ArrowRight, Sparkles, Heart, Crown } from "lucide-react"
import Link from "next/link"

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Midnight Lace Set",
    price: 125.00,
    category: "Signature Collection",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    name: "Crimson Satin Slip",
    price: 95.00,
    category: "Romantic Wear",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    name: "Velvet Embrace Bodysuit",
    price: 145.00,
    category: "Luxury Essentials",
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "4",
    name: "Rose Dust Morning Robe",
    price: 180.00,
    category: "Lounge & Sleep",
    image: "https://images.unsplash.com/photo-1549062300-1d3ad90bb4d5?auto=format&fit=crop&q=80&w=600"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 lg:pt-56 lg:pb-40 overflow-hidden">
        {/* Abstract Emotional Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-wine/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-rose/10 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-3 bg-wine/5 px-4 py-2 rounded-full mb-8 border border-wine/10">
            <Heart className="w-4 h-4 text-wine fill-wine" />
            <span className="text-[10px] font-bold text-wine uppercase tracking-[0.3em]">The Art of Intimacy</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-serif italic font-light text-charcoal mb-8 tracking-tight">
            Embrace Your <br />
            <span className="text-wine relative inline-block">
              Sensuality
              <span className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wine/20 to-transparent" />
            </span>
          </h1>
          
          <p className="text-xl text-rose font-light max-w-2xl mx-auto mb-14 leading-relaxed italic">
            "Beauty begins the moment you decide to be yourself." <br />
            Discover a collection that speaks to the soul and celebrates the feminine spirit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/shop" className="group relative bg-wine text-white px-10 py-5 rounded-2xl font-medium overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-xs">
                Explore The Collection
              </span>
              <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link href="/categories" className="text-charcoal hover:text-wine font-serif italic text-lg flex items-center transition-all group">
              Our Story
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories - Visual Emotional Block */}
      <section className="py-24 bg-charcoal text-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-[40px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1515377662630-cd03bc627824?auto=format&fit=crop&q=80&w=800" 
                alt="Emotional Story"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-wine/20 group-hover:bg-wine/40 transition-colors duration-700" />
            </div>
            <div className="space-y-8">
              <div className="inline-block bg-rose/20 px-4 py-2 rounded-lg text-rose text-xs uppercase tracking-widest font-bold">
                Luxury Materials
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif italic leading-tight">
                Crafted with love, <br />
                worn with confidence.
              </h2>
              <p className="text-rose font-light text-lg leading-relaxed">
                Every stitch in our collection is a testament to our dedication to quality. We use only the finest Italian lace and organic silk to ensure you feel as good as you look.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-wine">
                    <Crown size={20} />
                    <span className="text-xs uppercase tracking-widest font-bold text-ivory">Exclusive</span>
                  </div>
                  <p className="text-xs text-rose/60 uppercase tracking-widest">Limited Edition Designs</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-wine">
                    <Sparkles size={20} />
                    <span className="text-xs uppercase tracking-widest font-bold text-ivory">Handmade</span>
                  </div>
                  <p className="text-xs text-rose/60 uppercase tracking-widest">Artisan Craftsmanship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif italic text-wine mb-4">Curated Selections</h2>
            <div className="w-24 h-1 bg-wine/10 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sensual CTA */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-wine rounded-[48px] overflow-hidden px-8 py-20 lg:p-24 text-center">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-serif italic text-ivory mb-8">
                Join the Circle of <br /> Sensuality
              </h2>
              <p className="text-blush text-lg mb-12 font-light italic">
                Subscribe to receive intimate updates, private sale access, and a 20% gift for your first purchase.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your intimate email" 
                  className="bg-ivory/10 backdrop-blur-md border border-ivory/20 px-8 py-5 rounded-2xl text-ivory placeholder:text-rose focus:outline-none focus:ring-2 focus:ring-rose/30 flex-grow text-center sm:text-left"
                />
                <button className="bg-ivory text-wine px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blush transition-all shadow-2xl">
                  Connect
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
