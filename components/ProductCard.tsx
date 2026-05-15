import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  category: string
  image: string
}

export default function ProductCard({ name, price, category, image }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
            <Heart size={18} />
          </button>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-black transition-colors shadow-lg">
            <ShoppingBag size={18} />
            <span className="font-medium">Quick Add</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">{name}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
