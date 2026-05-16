import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Package, ChevronRight, User as UserIcon } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            
            {/* Sidebar / User Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-wine/5 mb-6 border-4 border-white shadow-xl">
                  {session.user.image ? (
                    <img src={session.user.image} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon size={40} className="text-wine" />
                  )}
                </div>
                <h2 className="text-2xl font-serif italic text-wine mb-2">{session.user.name}</h2>
                <p className="text-xs text-rose font-light italic">{session.user.email}</p>
                <div className="mt-8 pt-8 border-t border-rose/5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-wine mb-1">Membership</p>
                  <p className="text-xs text-rose font-light italic">Atelier Gold Member</p>
                </div>
              </div>

              <div className="bg-charcoal text-ivory rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
                <div className="relative z-10 space-y-6 text-sm font-light text-rose italic">
                  <p>Private styling session available</p>
                  <p>Exclusive access to Spring Collection</p>
                </div>
              </div>
            </div>

            {/* Main Content / Order History */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-serif italic text-wine mb-4">Your Journey</h1>
                <p className="text-rose font-light italic">A history of the masterpieces you've brought home.</p>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Link 
                      key={order.id} 
                      href={`/order/${order.id}`}
                      className="group block bg-white rounded-[40px] p-8 shadow-sm border border-rose/5 hover:border-wine/20 hover:shadow-xl transition-all"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="flex items-center gap-6">
                          <div className="bg-wine/5 p-4 rounded-2xl group-hover:bg-wine group-hover:text-white transition-colors">
                            <Package size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-wine mb-1">
                              Order #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-sm text-charcoal font-serif italic">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            <p className="text-lg font-light text-wine">${order.total.toFixed(2)}</p>
                            <p className="text-[10px] text-rose uppercase tracking-widest font-bold">{order.status}</p>
                          </div>
                          <ChevronRight size={20} className="text-rose/20 group-hover:text-wine group-hover:translate-x-2 transition-all" />
                        </div>
                      </div>

                      {/* Item Preview */}
                      <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {order.items.map((item) => (
                          <div key={item.id} className="relative w-16 h-20 rounded-xl overflow-hidden border border-rose/5 flex-shrink-0">
                            <img src={item.product.images[0]} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white/50 rounded-[48px] border border-dashed border-rose/20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-wine/5 mb-8">
                    <ShoppingBag size={32} className="text-rose/40" />
                  </div>
                  <h2 className="text-2xl font-serif italic text-wine mb-4">No masterpieces found.</h2>
                  <p className="text-rose font-light italic mb-10">Your journey in the atelier is just beginning.</p>
                  <Link href="/shop" className="bg-wine text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl">
                    Begin Shopping
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
