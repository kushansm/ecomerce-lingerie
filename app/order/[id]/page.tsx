import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"
import { CheckCircle2, Package, Truck, Home, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

interface OrderPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })

  if (!order) {
    notFound()
  }

  const statusSteps = [
    { label: "Pending", status: "PENDING", icon: Calendar },
    { label: "Processing", status: "PROCESSING", icon: Package },
    { label: "Shipped", status: "SHIPPED", icon: Truck },
    { label: "Delivered", status: "DELIVERED", icon: Home },
  ]

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status)

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-8 border-4 border-white shadow-xl">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif italic text-wine mb-4">Your Masterpiece is on its Way</h1>
            <p className="text-rose font-light italic">Thank you for your order. We are preparing it with love and care.</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-wine mt-6">Order ID: #{order.id.slice(-8).toUpperCase()}</p>
          </div>

          {/* Tracking Progress */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5 mb-12">
            <h2 className="text-xl font-serif italic text-wine mb-10 text-center">Track Your Journey</h2>
            <div className="relative flex justify-between items-start">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-ivory -z-0" />
              <div 
                className="absolute top-5 left-0 h-[2px] bg-wine transition-all duration-1000 -z-0" 
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />
              
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= currentStepIndex
                return (
                  <div key={step.status} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-colors duration-500 ${isActive ? 'bg-wine text-white' : 'bg-ivory text-rose/30'}`}>
                      <Icon size={16} />
                    </div>
                    <p className={`text-[10px] uppercase tracking-widest font-bold mt-4 ${isActive ? 'text-wine' : 'text-rose/30'}`}>
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Order Items */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
              <h2 className="text-xl font-serif italic text-wine mb-8">Selected Pieces</h2>
              <div className="space-y-6">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 border-b border-rose/5 pb-6 last:border-0 last:pb-0">
                    <img src={item.product.images[0]} className="w-16 h-20 object-cover rounded-xl border border-rose/5" />
                    <div className="flex-grow">
                      <p className="text-sm font-serif italic text-charcoal">{item.product.name}</p>
                      <div className="flex justify-between items-end mt-2">
                        <p className="text-[10px] text-rose uppercase tracking-widest">Qty: {item.quantity}</p>
                        <p className="text-sm font-light text-wine">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-rose/10 flex justify-between items-end">
                <span className="text-lg font-serif italic text-charcoal">Total Value</span>
                <span className="text-2xl font-light text-wine">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-charcoal text-ivory rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
              <div className="relative z-10">
                <h2 className="text-xl font-serif italic text-wine mb-8">Delivery Destination</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-ivory/10 p-3 rounded-xl">
                      <Truck size={18} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-wine mb-1">Address</p>
                      <p className="text-sm font-light text-rose italic">{order.address}</p>
                      <p className="text-sm font-light text-rose italic">{order.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-ivory/10 p-3 rounded-xl">
                      <CreditCard size={18} className="text-wine" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-wine mb-1">Payment</p>
                      <p className="text-sm font-light text-rose italic">
                        {order.paymentMethod === 'CARD' ? 'Encrypted Card Payment' : 'Cash on Delivery'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop" className="text-wine font-serif italic hover:underline flex items-center justify-center gap-2 group">
              Continue your journey in the Atelier
              <span className="w-8 h-[1px] bg-wine/30 group-hover:w-16 transition-all duration-500" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
