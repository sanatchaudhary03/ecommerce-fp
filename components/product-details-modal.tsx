"use client"

import { useQuery } from "@tanstack/react-query"
import { X, Star, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchProduct } from "@/lib/api"
import { useStore } from "@/lib/store"

export function ProductDetailsModal() {
  const [quantity, setQuantity] = useState(1)
  const [imageLoading, setImageLoading] = useState(true)

  const selectedProductId = useStore((state) => state.selectedProductId)
  const isModalOpen = useStore((state) => state.isModalOpen)
  const setModalOpen = useStore((state) => state.setModalOpen)
  const setSelectedProduct = useStore((state) => state.setSelectedProduct)
  const addToCart = useStore((state) => state.addToCart)

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", selectedProductId],
    queryFn: () => fetchProduct(selectedProductId!),
    enabled: !!selectedProductId,
  })

  const handleClose = () => {
    setModalOpen(false)
    setSelectedProduct(null)
    setQuantity(1)
    setImageLoading(true)
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      handleClose()
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        {isLoading || !product ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className={`object-contain p-8 transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setImageLoading(false)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge className="bg-secondary text-secondary-foreground">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground text-balance">{product.title}</h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">{product.rating.rate}</span>
                </div>
                <span className="text-muted-foreground">({product.rating.count} reviews)</span>
              </div>

              <div className="text-4xl font-bold text-primary">{formatPrice(product.price)}</div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add {quantity} to Cart - {formatPrice(product.price * quantity)}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
