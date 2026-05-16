"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search as SearchIcon } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full mb-12">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your next favorite piece..."
        className="w-full bg-white border border-rose/10 rounded-2xl px-12 py-4 text-charcoal italic text-sm placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 shadow-sm"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-rose/40 w-5 h-5" />
      <button type="submit" className="hidden">Search</button>
    </form>
  )
}
