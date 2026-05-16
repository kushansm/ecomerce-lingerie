"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/store/use-cart"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    category: string
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <button 
      onClick={() => addItem(product)}
      className="flex-grow bg-wine text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      Add to Atelier Bag
    </button>
  )
}
