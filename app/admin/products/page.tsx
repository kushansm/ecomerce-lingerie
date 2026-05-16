import prisma from "@/lib/db"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { deleteProduct } from "@/lib/actions/admin"

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif italic text-wine">Atelier Collection</h1>
          <p className="text-rose font-light italic mt-2">Manage your luxury pieces and inventory.</p>
        </div>
        <Link href="/admin/products/new" className="bg-wine text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl flex items-center gap-2">
          <Plus size={18} />
          New Masterpiece
        </Link>
      </div>

      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-rose/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-rose/5">
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Product</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Category</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Price</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40">Stock</th>
                <th className="pb-6 text-[10px] uppercase tracking-widest font-bold text-rose/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose/5">
              {products.map((product: any) => (
                <tr key={product.id} className="group hover:bg-ivory/50 transition-colors">
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <img src={product.images[0]} className="w-12 h-16 object-cover rounded-xl border border-rose/5" />
                      <div>
                        <p className="text-sm font-serif italic text-charcoal">{product.name}</p>
                        <p className="text-[10px] text-rose/40 uppercase tracking-widest mt-1">ID: #{product.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="text-xs text-rose font-light italic">{product.category.name}</span>
                  </td>
                  <td className="py-6 text-sm font-light text-wine">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-6">
                    <span className={`text-xs font-bold ${product.stock < 10 ? 'text-red-500' : 'text-rose'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/product/${product.id}`} target="_blank" className="p-2 text-rose/40 hover:text-wine transition-colors">
                        <ExternalLink size={18} strokeWidth={1.5} />
                      </Link>
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-rose/40 hover:text-wine transition-colors">
                        <Edit size={18} strokeWidth={1.5} />
                      </Link>
                      <form action={async () => {
                        "use server"
                        await deleteProduct(product.id)
                      }}>
                        <button className="p-2 text-rose/40 hover:text-red-500 transition-colors">
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </form>
                    </div>
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
