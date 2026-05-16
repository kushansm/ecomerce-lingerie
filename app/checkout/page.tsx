"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useCart } from "@/lib/store/use-cart"
import { useMounted } from "@/lib/hooks/use-mounted"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/lib/actions/checkout"
import { ShieldCheck, Truck, CreditCard } from "lucide-react"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const mounted = useMounted()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!mounted) return null
  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const values = {
      address: formData.get("address"),
      city: formData.get("city"),
      phone: formData.get("phone"),
      paymentMethod: formData.get("paymentMethod"),
      total,
    }

    const result = await createOrder(values, items)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      clearCart()
      router.push(`/order/${result.orderId}`)
    }
  }

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif italic text-wine mb-4">Complete Your Order</h1>
            <p className="text-rose font-light italic">Securely provide your details to finalize your atelier selection.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-12">
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
                <h2 className="text-2xl font-serif italic text-wine mb-8 flex items-center gap-3">
                  <Truck size={24} strokeWidth={1.5} />
                  Shipping Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-rose mb-2 ml-4">Shipping Address</label>
                    <input 
                      name="address"
                      required
                      placeholder="123 Luxury Lane"
                      className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-rose mb-2 ml-4">City</label>
                      <input 
                        name="city"
                        required
                        placeholder="Paris"
                        className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-rose mb-2 ml-4">Phone Number</label>
                      <input 
                        name="phone"
                        required
                        type="tel"
                        placeholder="+33 1 23 45 67 89"
                        className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
                <h2 className="text-2xl font-serif italic text-wine mb-8 flex items-center gap-3">
                  <CreditCard size={24} strokeWidth={1.5} />
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative flex items-center p-4 border border-rose/10 rounded-2xl cursor-pointer hover:bg-wine/5 transition-colors">
                    <input type="radio" name="paymentMethod" value="CARD" defaultChecked className="w-4 h-4 text-wine focus:ring-wine border-rose/20" />
                    <span className="ml-4 font-serif italic text-charcoal">Credit / Debit Card</span>
                  </label>
                  <label className="relative flex items-center p-4 border border-rose/10 rounded-2xl cursor-pointer hover:bg-wine/5 transition-colors">
                    <input type="radio" name="paymentMethod" value="CASH" className="w-4 h-4 text-wine focus:ring-wine border-rose/20" />
                    <span className="ml-4 font-serif italic text-charcoal">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-center italic text-sm">
                  {error}
                </div>
              )}

              <button 
                disabled={loading}
                type="submit" 
                className="w-full bg-wine text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Processing Order..." : "Confirm & Place Order"}
                <ShieldCheck size={18} strokeWidth={1.5} />
              </button>
            </form>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-charcoal text-ivory rounded-[40px] p-10 sticky top-32 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-serif italic mb-8 border-b border-ivory/10 pb-6 text-wine">Your Selection</h2>
                  
                  <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wine">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img src={item.image} className="w-16 h-20 object-cover rounded-xl border border-ivory/10" />
                        <div>
                          <p className="text-xs font-serif italic line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-rose uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm font-light text-wine mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-10 border-t border-ivory/10 pt-6">
                    <div className="flex justify-between text-rose font-light text-sm">
                      <span className="italic">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-rose font-light text-sm">
                      <span className="italic">Shipping</span>
                      <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-ivory/10 pt-6">
                    <span className="text-lg font-serif italic">Total</span>
                    <span className="text-3xl font-light text-wine">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
