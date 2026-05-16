import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleItem: (item: WishlistItem) => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().isInWishlist(item.id)) {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
      toggleItem: (item) => {
        if (get().isInWishlist(item.id)) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },
    }),
    {
      name: "lingerie-hub-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
