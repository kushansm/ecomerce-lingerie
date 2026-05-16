"use client"

import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/store/use-cart"

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export default function ProductCard({ id, name, price, category, image }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative bg-ivory rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-rose/5">
      {/* Image Container */}
      <Link href={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden block">
        <img 
          src={image} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-5 right-5">
          <button 
            onClick={(e) => {
              e.preventDefault()
              // Toggle wishlist logic could go here
            }}
            className="bg-ivory/80 backdrop-blur-sm p-3 rounded-full text-charcoal/40 hover:text-wine transition-colors shadow-sm"
          >
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Overlay with Quick Add */}
        <div className="absolute inset-0 bg-wine/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="absolute bottom-24 left-6 right-6 p-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
        <button 
          onClick={() => addItem({ id, name, price, category, image })}
          className="w-full bg-wine text-white py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-charcoal transition-colors shadow-2xl active:scale-95"
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          <span className="font-medium uppercase tracking-widest text-xs">Add to Cart</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-rose uppercase tracking-[0.2em] mb-2 font-semibold">{category}</p>
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-serif italic text-charcoal group-hover:text-wine transition-colors mb-2">{name}</h3>
        </Link>
        <p className="text-xl font-light text-wine">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
