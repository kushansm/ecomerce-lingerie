"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { useWishlist } from "@/lib/store/use-wishlist"
import { useMounted } from "@/lib/hooks/use-mounted"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function WishlistPage() {
  const { items } = useWishlist()
  const mounted = useMounted()

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-wine/5 mb-8"
            >
              <Heart size={32} className="text-wine fill-wine" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-serif italic text-wine mb-4">Your Private Gallery</h1>
            <p className="text-rose font-light italic">The pieces that have captured your heart.</p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
              {items.map((item) => (
                <ProductCard 
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-white/50 rounded-[60px] border border-dashed border-rose/20 shadow-inner max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif italic text-wine mb-6">Your gallery is currently empty.</h2>
              <p className="text-rose font-light italic mb-12">The atelier is full of masterpieces waiting to be discovered.</p>
              <Link href="/shop" className="group inline-flex items-center gap-4 bg-wine text-white px-12 py-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-charcoal transition-all shadow-2xl">
                Explore The Boutique
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
