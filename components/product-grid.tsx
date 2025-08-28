"use client"

import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { fetchProducts } from "@/lib/api"
import { useStore } from "@/lib/store"
import { ProductCard } from "./product-card"
import { ProductGridSkeleton } from "./product-grid-skeleton"
import { SearchAndFilter } from "./search-and-filter"

export function ProductGrid() {
  const searchQuery = useStore((state) => state.searchQuery)
  const selectedCategory = useStore((state) => state.selectedCategory)

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products.filter((product) => {
      const matchesSearch = searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true

      const matchesCategory = selectedCategory ? product.category === selectedCategory : true

      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SearchAndFilter />
        <ProductGridSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <SearchAndFilter />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="space-y-8">
        <SearchAndFilter />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground">Check back later for new products.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <SearchAndFilter />

      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {searchQuery || selectedCategory ? "Filtered Products" : "Featured Products"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {filteredProducts.length === products.length
            ? "Discover our curated collection of high-quality products at unbeatable prices"
            : `Showing ${filteredProducts.length} of ${products.length} products`}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">No products match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
