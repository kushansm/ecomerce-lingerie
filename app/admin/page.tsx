import { getAnalytics } from "@/lib/actions/admin"
import { DollarSign, ShoppingBag, Users, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const stats = await getAnalytics()

  const cardStats = [
    { label: "Total Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "text-wine" },
    { label: "Customers", value: stats.users, icon: Users, color: "text-blue-500" },
    { label: "Products", value: stats.products, icon: Package, color: "text-rose" },
  ]

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif italic text-wine">Atelier Overview</h1>
          <p className="text-rose font-light italic mt-2">How your boutique is performing today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-[32px] p-8 shadow-sm border border-rose/5 flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-ivory ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-rose/40">{stat.label}</p>
                <p className="text-2xl font-light text-charcoal mt-1">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif italic text-wine">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs uppercase tracking-widest font-bold text-rose hover:text-wine flex items-center gap-2 group">
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-rose/5">
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Customer</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Status</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Date</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose/5">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-ivory/50 transition-colors">
                  <td className="py-6">
                    <p className="text-sm font-serif italic text-charcoal">{order.user.name}</p>
                    <p className="text-[10px] text-rose/40 uppercase tracking-widest mt-1">{order.user.email}</p>
                  </td>
                  <td className="py-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-wine/5 text-wine">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-sm text-rose font-light italic">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-6 text-right font-light text-charcoal">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
