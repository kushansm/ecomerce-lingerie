import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import ProductFilters from "@/components/ProductFilters"
import SearchBar from "@/components/SearchBar"
import { getProducts, getCategories } from "@/lib/products"

interface ShopPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { search, category } = await searchParams
  const products = await getProducts(search, category)
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-ivory text-charcoal">
      <Navbar />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif italic font-light text-charcoal mb-6">
              The <span className="text-wine">Atelier</span> Shop
            </h1>
            <p className="text-rose font-light italic max-w-xl mx-auto">
              Browse our full collection of ethically crafted lingerie, designed to embrace every curve and celebrate your inner beauty.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-rose/10 pb-8 mb-12">
            <SearchBar />
            <ProductFilters categories={categories} />
          </div>

          {/* Results Info */}
          <div className="mb-8">
            <p className="text-xs text-rose uppercase tracking-widest font-bold italic">
              Showing {products.length} {products.length === 1 ? 'masterpiece' : 'masterpieces'}
              {search && <span> for "{search}"</span>}
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  name={product.name}
                  price={product.price}
                  category={product.category.name}
                  image={product.images[0]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/50 rounded-[40px] border border-dashed border-rose/20">
              <p className="text-xl font-serif italic text-rose">No pieces found matching your criteria.</p>
              <p className="text-sm text-rose/60 mt-4 italic font-light">Try exploring another category or clearing your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
