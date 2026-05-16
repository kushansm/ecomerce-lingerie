import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Package, LogOut, Home } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-charcoal text-ivory flex flex-col p-8 fixed h-full shadow-2xl">
        <div className="mb-12">
          <Link href="/admin" className="text-xl font-serif italic text-wine font-bold tracking-widest">
            HUB ADMIN
          </Link>
          <p className="text-[10px] text-rose/40 uppercase tracking-widest mt-2">Atelier Management</p>
        </div>

        <nav className="flex-grow space-y-6">
          <Link href="/admin" className="flex items-center gap-3 text-sm hover:text-wine transition-colors group">
            <LayoutDashboard size={18} className="text-rose group-hover:text-wine" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 text-sm hover:text-wine transition-colors group">
            <ShoppingBag size={18} className="text-rose group-hover:text-wine" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 text-sm hover:text-wine transition-colors group">
            <Package size={18} className="text-rose group-hover:text-wine" />
            Orders
          </Link>
        </nav>

        <div className="pt-8 border-t border-ivory/10 space-y-6">
          <Link href="/" className="flex items-center gap-3 text-sm hover:text-wine transition-colors group">
            <Home size={18} className="text-rose group-hover:text-wine" />
            View Store
          </Link>
          <button className="flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors group w-full text-left">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        {children}
      </main>
    </div>
  )
}
