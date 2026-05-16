import prisma from "@/lib/db"
import { Eye, ChevronDown } from "lucide-react"
import Link from "next/link"
import { updateOrderStatus } from "@/lib/actions/admin"
import { OrderStatus } from "@prisma/client"

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" }
  })

  const statuses = Object.values(OrderStatus)

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif italic text-wine">Atelier Orders</h1>
          <p className="text-rose font-light italic mt-2">Manage customer journeys and fulfillment.</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-rose/5">
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Order ID</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Customer</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Total</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Status</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose/5">
              {orders.map((order: any) => (
                <tr key={order.id} className="group hover:bg-ivory/50 transition-colors">
                  <td className="py-6">
                    <p className="text-xs font-bold text-wine tracking-widest">#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-[10px] text-rose font-light italic mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="py-6">
                    <p className="text-sm font-serif italic text-charcoal">{order.user.name}</p>
                    <p className="text-[10px] text-rose/40 uppercase tracking-widest mt-1">{order.user.email}</p>
                  </td>
                  <td className="py-6 text-sm font-light text-charcoal">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-6">
                    <form action={async (formData: FormData) => {
                      "use server"
                      const newStatus = formData.get("status") as OrderStatus
                      await updateOrderStatus(order.id, newStatus)
                    }} className="relative group/select">
                      <select 
                        name="status"
                        defaultValue={order.status}
                        onChange={(e) => e.target.form?.requestSubmit()}
                        className="appearance-none bg-ivory border border-rose/10 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-wine focus:outline-none focus:ring-1 focus:ring-wine/20 cursor-pointer pr-10"
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-wine pointer-events-none" />
                    </form>
                  </td>
                  <td className="py-6 text-right">
                    <Link href={`/order/${order.id}`} target="_blank" className="inline-flex items-center gap-2 p-2 text-rose/40 hover:text-wine transition-colors">
                      <Eye size={18} strokeWidth={1.5} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Details</span>
                    </Link>
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
