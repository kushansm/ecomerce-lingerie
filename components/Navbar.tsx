"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ELMALI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-600 hover:text-purple-600 transition-colors">Shop</Link>
            <Link href="/categories" className="text-gray-600 hover:text-purple-600 transition-colors">Categories</Link>
            <Link href="/new-arrivals" className="text-gray-600 hover:text-purple-600 transition-colors">New Arrivals</Link>
            <Link href="/sale" className="text-pink-600 font-medium">Sale</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <User size={20} />
            </button>
            <button className="text-gray-600 hover:text-purple-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-64" : "max-h-0")}>
        <div className="px-4 pt-2 pb-6 space-y-4">
          <Link href="/shop" className="block text-gray-600 hover:text-purple-600">Shop</Link>
          <Link href="/categories" className="block text-gray-600 hover:text-purple-600">Categories</Link>
          <Link href="/new-arrivals" className="block text-gray-600 hover:text-purple-600">New Arrivals</Link>
          <Link href="/sale" className="block text-pink-600 font-medium">Sale</Link>
        </div>
      </div>
    </nav>
  )
}
