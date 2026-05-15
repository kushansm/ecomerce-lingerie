import { Heart, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  category: string
  image: string
}

export default function ProductCard({ name, price, category, image }: ProductCardProps) {
  return (
    <div className="group relative bg-ivory rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-rose/5">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-5 right-5">
          <button className="bg-ivory/80 backdrop-blur-sm p-3 rounded-full text-charcoal/40 hover:text-wine transition-colors shadow-sm">
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Overlay with Quick Add */}
        <div className="absolute inset-0 bg-wine/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button className="w-full bg-wine text-white py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-charcoal transition-colors shadow-2xl">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="font-medium uppercase tracking-widest text-xs">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <p className="text-[10px] text-rose uppercase tracking-[0.2em] mb-2 font-semibold">{category}</p>
        <h3 className="text-lg font-serif italic text-charcoal group-hover:text-wine transition-colors mb-2">{name}</h3>
        <p className="text-xl font-light text-wine">${price.toFixed(2)}</p>
      </div>
    </div>
  )
}
