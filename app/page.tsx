"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { ArrowRight, Heart, Crown, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => {
    // We'll use a client-side fetch for the home page to keep animations smooth
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)))
  }, [])

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[10%] left-[20%] w-[800px] h-[800px] bg-wine/5 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-rose/10 rounded-full blur-[130px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-3 bg-wine/5 px-6 py-3 rounded-full mb-12 border border-wine/10 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-wine fill-wine" />
            <span className="text-[10px] font-bold text-wine uppercase tracking-[0.5em]">The Spring Atelier 2026</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-serif italic font-light text-charcoal mb-10 tracking-tighter leading-none"
          >
            Elegance <br />
            <span className="text-wine block mt-4">Redefined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-xl md:text-2xl text-rose font-light max-w-2xl mx-auto mb-16 leading-relaxed italic"
          >
            Step into a world where luxury meets intimacy. Our handcrafted collections are designed to celebrate your unique story with grace and passion.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-12"
          >
            <Link href="/shop" className="group relative bg-wine text-white px-14 py-6 rounded-2xl font-bold overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.3em] text-[10px]">
                The Collection
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-rose/40 font-bold rotate-90 origin-left">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-wine/40 to-transparent" />
        </motion.div>
      </section>

      {/* Visual Emotional Block */}
      <section className="py-40 bg-charcoal text-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[60px] overflow-hidden group shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1515377662630-cd03bc627824?auto=format&fit=crop&q=80&w=800" 
                alt="Emotional Story"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-wine/20 group-hover:bg-wine/40 transition-colors duration-700" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="inline-block bg-rose/20 px-6 py-3 rounded-full text-rose text-[10px] uppercase tracking-[0.4em] font-bold">
                Luxury Materials
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
                Crafted with love, <br />
                <span className="text-rose">worn with soul.</span>
              </h2>
              <p className="text-rose font-light text-xl leading-relaxed italic opacity-80">
                Every stitch in our collection is a testament to our dedication to quality. We use only the finest Italian lace and organic silk to ensure you feel as good as you look.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-wine">
                    <Crown size={24} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ivory">Exclusive</span>
                  </div>
                  <p className="text-xs text-rose/60 font-light italic">Limited Edition Designs</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-wine">
                    <Sparkles size={24} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ivory">Handmade</span>
                  </div>
                  <p className="text-xs text-rose/60 font-light italic">Artisan Craftsmanship</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-28">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.5em] text-wine font-bold mb-6"
            >
              Curated Selections
            </motion.p>
            <h2 className="text-5xl md:text-6xl font-serif italic text-charcoal">The Essentials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category.name}
                image={product.images[0]}
              />
            ))}
          </div>
          
          <div className="text-center mt-32">
            <Link href="/shop" className="inline-flex items-center gap-6 text-wine font-serif italic text-2xl group">
              Explore Entire Atelier
              <span className="w-16 h-[1px] bg-wine/30 group-hover:w-32 transition-all duration-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury CTA */}
      <section className="pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-wine rounded-[60px] overflow-hidden px-8 py-32 lg:p-40 text-center shadow-[0_50px_100px_-20px_rgba(74,15,31,0.3)]"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/20" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl font-serif italic text-ivory mb-10 leading-tight">
                The Inner Circle
              </h2>
              <p className="text-blush text-xl mb-16 font-light italic leading-relaxed">
                Join our curated mailing list for private atelier updates, early access to new collections, and personal styling invitations.
              </p>
              <form className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Your intimate email" 
                  className="bg-ivory/10 backdrop-blur-md border border-ivory/20 px-10 py-6 rounded-2xl text-ivory placeholder:text-rose/60 focus:outline-none focus:ring-2 focus:ring-rose/30 flex-grow text-center sm:text-left text-lg"
                />
                <button className="bg-ivory text-wine px-12 py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-blush transition-all shadow-2xl">
                  Connect
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
