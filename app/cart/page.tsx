"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/lib/store/use-cart"
import { useMounted } from "@/lib/hooks/use-mounted"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart()
  const mounted = useMounted()

  if (!mounted) return null

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-serif italic text-wine mb-4">Your Atelier Bag</h1>
            <p className="text-rose font-light italic">The pieces you've chosen to celebrate yourself.</p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center border border-rose/5 shadow-sm hover:shadow-md transition-all">
                    <div className="w-32 h-40 rounded-2xl overflow-hidden flex-shrink-0 border border-rose/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <p className="text-[10px] text-rose uppercase tracking-widest font-bold mb-2">{item.category}</p>
                      <h3 className="text-xl font-serif italic text-charcoal mb-4">{item.name}</h3>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-6">
                        <div className="flex items-center bg-ivory rounded-xl p-1 border border-rose/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:text-wine transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:text-wine transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-rose/40 hover:text-wine transition-colors p-2"
                        >
                          <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <div className="text-center sm:text-right flex-shrink-0">
                      <p className="text-xl font-light text-wine">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-rose font-light italic mt-1">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-charcoal text-ivory rounded-[40px] p-10 sticky top-32 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-serif italic mb-8 border-b border-ivory/10 pb-6 text-wine">Summary</h2>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-rose font-light">
                        <span className="italic">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-rose font-light">
                        <span className="italic">Shipping</span>
                        <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-10 border-t border-ivory/10 pt-6">
                      <span className="text-lg font-serif italic">Total</span>
                      <span className="text-3xl font-light text-wine">${total.toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-wine text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-ivory hover:text-wine transition-all shadow-xl flex items-center justify-center gap-3 group">
                      Checkout
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <p className="text-[10px] text-rose/40 text-center mt-6 uppercase tracking-widest leading-relaxed">
                      Secure payment processed through <br /> encrypted atelier systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-40 bg-white/50 rounded-[48px] border border-dashed border-rose/20 shadow-inner">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-wine/5 mb-8">
                <ShoppingBag size={32} className="text-rose/40" />
              </div>
              <h2 className="text-3xl font-serif italic text-wine mb-4">Your bag is currently empty.</h2>
              <p className="text-rose font-light italic mb-12">Every masterpiece is waiting for its muse.</p>
              <Link href="/shop" className="bg-wine text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl">
                Explore the Atelier
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
