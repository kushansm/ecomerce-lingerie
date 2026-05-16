"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, LogOut, Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import { useCart } from "@/lib/store/use-cart"
import { useWishlist } from "@/lib/store/use-wishlist"
import { useMounted } from "@/lib/hooks/use-mounted"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const cart = useCart()
  const wishlist = useWishlist()
  const mounted = useMounted()

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-ivory/80 backdrop-blur-xl border-b border-rose/5 shadow-[0_1px_20px_rgba(74,15,31,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl lg:text-3xl font-serif font-bold tracking-[0.2em] text-wine group">
              LINGERIE <span className="group-hover:italic transition-all">HUB</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/shop" className="text-[10px] uppercase tracking-[0.4em] text-charcoal/70 hover:text-wine transition-colors font-bold">Shop</Link>
            <Link href="/categories" className="text-[10px] uppercase tracking-[0.4em] text-charcoal/70 hover:text-wine transition-colors font-bold">Atelier</Link>
            <Link href="/new-arrivals" className="text-[10px] uppercase tracking-[0.4em] text-charcoal/70 hover:text-wine transition-colors font-bold">New</Link>
            <Link href="/sale" className="text-[10px] uppercase tracking-[0.4em] text-wine font-black border-b-2 border-wine/20 pb-1">Archive</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-charcoal/70 hover:text-wine transition-colors p-2">
              <Search size={20} strokeWidth={1.2} />
            </button>
            
            <Link href="/wishlist" className="text-charcoal/70 hover:text-wine transition-colors relative p-2">
              <Heart size={20} strokeWidth={1.2} className={cn(mounted && wishlist.items.length > 0 && "fill-wine text-wine")} />
              {mounted && wishlist.items.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 bg-wine text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold"
                >
                  {wishlist.items.length}
                </motion.span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center space-x-6">
                <Link href="/profile" className="flex items-center space-x-3 text-wine font-serif italic text-sm group">
                  <div className="w-8 h-8 rounded-full bg-wine/5 flex items-center justify-center group-hover:bg-wine group-hover:text-white transition-all">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <span>{session.user?.name?.split(" ")[0]}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-rose/40 hover:text-wine transition-colors"
                >
                  <LogOut size={16} strokeWidth={1.2} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-charcoal/70 hover:text-wine transition-colors p-2">
                <User size={20} strokeWidth={1.2} />
              </Link>
            )}

            <Link href="/cart" className="bg-wine text-white p-3 rounded-2xl flex items-center gap-3 shadow-xl hover:bg-charcoal transition-all scale-105">
              <ShoppingCart size={18} strokeWidth={1.5} />
              {mounted && (
                <span className="text-[10px] font-bold tracking-widest">{cart.getItemCount()}</span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal/70 hover:text-wine transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory/95 backdrop-blur-2xl border-b border-rose/10 overflow-hidden"
          >
            <div className="px-6 pt-8 pb-12 space-y-8">
              <Link onClick={() => setIsOpen(false)} href="/shop" className="block text-xs uppercase tracking-[0.4em] text-charcoal/70">Shop Collection</Link>
              <Link onClick={() => setIsOpen(false)} href="/categories" className="block text-xs uppercase tracking-[0.4em] text-charcoal/70">Categories</Link>
              <Link onClick={() => setIsOpen(false)} href="/wishlist" className="block text-xs uppercase tracking-[0.4em] text-charcoal/70 flex items-center justify-between">
                Wishlist
                <span className="text-wine">{mounted ? wishlist.items.length : 0}</span>
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/cart" className="block text-xs uppercase tracking-[0.4em] text-wine font-black flex items-center justify-between">
                My Bag
                <span className="bg-wine text-white px-3 py-1 rounded-full text-[10px]">{mounted ? cart.getItemCount() : 0}</span>
              </Link>
              <div className="pt-8 border-t border-rose/10">
                {session ? (
                  <div className="flex flex-col space-y-6">
                    <Link onClick={() => setIsOpen(false)} href="/profile" className="text-wine font-serif italic text-lg">My Atelier Profile</Link>
                    <button 
                      onClick={() => signOut()}
                      className="text-left text-rose/40 uppercase tracking-[0.3em] text-[10px] font-bold"
                    >
                      Logout from Hub
                    </button>
                  </div>
                ) : (
                  <Link onClick={() => setIsOpen(false)} href="/login" className="block text-wine font-black uppercase tracking-[0.3em] text-[10px]">Sign In to Atelier</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
