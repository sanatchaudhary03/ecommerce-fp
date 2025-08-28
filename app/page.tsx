import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ShoppingCart } from "@/components/shopping-cart"
import { ProductDetailsModal } from "@/components/product-details-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <ProductGrid />
      </main>
      <ShoppingCart />
      <ProductDetailsModal />
    </div>
  )
}
