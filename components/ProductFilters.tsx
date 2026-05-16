"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Category } from "@prisma/client"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")

  const setCategory = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (id) {
      params.set("category", id)
    } else {
      params.delete("category")
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-12">
      <button
        onClick={() => setCategory(null)}
        className={cn(
          "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
          !activeCategory 
            ? "bg-wine text-white border-wine shadow-xl scale-105" 
            : "bg-white text-rose border-rose/20 hover:border-wine/30"
        )}
      >
        All Pieces
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setCategory(category.id)}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
            activeCategory === category.id 
              ? "bg-wine text-white border-wine shadow-xl scale-105" 
              : "bg-white text-rose border-rose/20 hover:border-wine/30"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
