import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getProduct } from "@/lib/products"
import { notFound } from "next/navigation"
import { Heart, ShieldCheck, Truck, Sparkles } from "lucide-react"
import AddToCartButton from "@/components/AddToCartButton"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-rose/5 group">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-wine text-white w-24 h-24 rounded-full flex items-center justify-center text-center p-2 shadow-2xl rotate-12 border-4 border-ivory">
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Limited Edition</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-xs text-rose uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-wine" />
                  {product.category.name}
                </p>
                <h1 className="text-5xl lg:text-6xl font-serif italic text-wine mb-6 leading-tight">
                  {product.name}
                </h1>
                <p className="text-3xl font-light text-charcoal">${product.price.toFixed(2)}</p>
              </div>

              <div className="prose prose-rose mb-12">
                <p className="text-lg text-rose font-light leading-relaxed italic">
                  "{product.description}"
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-6 mb-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <AddToCartButton 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      category: product.category.name
                    }} 
                  />
                  <button className="bg-white text-wine border border-rose/20 px-6 py-5 rounded-2xl hover:border-wine transition-all shadow-sm group">
                    <Heart size={20} strokeWidth={1.5} className="group-hover:fill-wine transition-colors" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-rose/10">
                <div className="flex items-center gap-4">
                  <div className="bg-wine/5 p-3 rounded-xl">
                    <Truck size={20} className="text-wine" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-wine">Fast Shipping</p>
                    <p className="text-xs text-rose font-light italic">Discreet luxury packaging</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-wine/5 p-3 rounded-xl">
                    <ShieldCheck size={20} className="text-wine" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-wine">Secure Checkout</p>
                    <p className="text-xs text-rose font-light italic">Your privacy is our priority</p>
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
