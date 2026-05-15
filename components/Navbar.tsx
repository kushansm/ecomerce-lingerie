"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-ivory/80 backdrop-blur-md border-b border-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-wine">
              LINGERIE HUB
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/shop" className="text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine transition-colors font-medium">Shop</Link>
            <Link href="/categories" className="text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine transition-colors font-medium">Categories</Link>
            <Link href="/new-arrivals" className="text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine transition-colors font-medium">New Arrivals</Link>
            <Link href="/sale" className="text-sm uppercase tracking-widest text-wine font-bold border-b border-wine/30">Sale</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-charcoal/70 hover:text-wine transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-charcoal/70 hover:text-wine transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="text-charcoal/70 hover:text-wine transition-colors relative">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-wine text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal/70 hover:text-wine transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden bg-ivory border-b border-rose/10 overflow-hidden transition-all duration-500 ease-in-out", isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className="px-4 pt-4 pb-8 space-y-6">
          <Link href="/shop" className="block text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine">Shop</Link>
          <Link href="/categories" className="block text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine">Categories</Link>
          <Link href="/new-arrivals" className="block text-sm uppercase tracking-widest text-charcoal/70 hover:text-wine">New Arrivals</Link>
          <Link href="/sale" className="block text-sm uppercase tracking-widest text-wine font-bold">Sale</Link>
        </div>
      </div>
    </nav>
  )
}
