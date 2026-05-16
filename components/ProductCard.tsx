"use client"

import { Heart, ShoppingBag, Eye } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/store/use-cart"
import { useWishlist } from "@/lib/store/use-wishlist"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export default function ProductCard({ id, name, price, category, image }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(id)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000 border border-rose/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden block">
        <Link href={`/product/${id}`}>
          <motion.img 
            src={image} 
            alt={name}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="object-cover w-full h-full"
          />
        </Link>
        
        {/* Wishlist Button */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => toggleItem({ id, name, price, category, image })}
            className={cn(
              "bg-white/90 backdrop-blur-md p-4 rounded-full transition-all duration-500 shadow-xl hover:scale-110",
              isWishlisted ? "text-wine fill-wine" : "text-charcoal/40 hover:text-wine"
            )}
          >
            <Heart size={20} strokeWidth={isWishlisted ? 2 : 1.5} />
          </button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-wine/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-full translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
            <Eye className="text-wine" size={24} />
          </div>
        </div>
      </div>

      {/* Quick Add Button */}
      <div className="absolute bottom-32 left-8 right-8 z-20 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
        <button 
          onClick={() => addItem({ id, name, price, category, image })}
          className="w-full bg-wine text-white py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-charcoal transition-all shadow-2xl"
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Add to Atelier Bag</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-10 text-center">
        <p className="text-[10px] text-rose uppercase tracking-[0.3em] mb-3 font-bold">{category}</p>
        <Link href={`/product/${id}`}>
          <h3 className="text-xl font-serif italic text-charcoal group-hover:text-wine transition-colors mb-2 line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-light text-wine">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  )
}
