"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/store"
import { useStore } from "@/lib/store"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const addToCart = useStore((state) => state.addToCart)
  const setSelectedProduct = useStore((state) => state.setSelectedProduct)
  const setModalOpen = useStore((state) => state.setModalOpen)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking add to cart
    addToCart(product)
  }

  const handleCardClick = () => {
    setSelectedProduct(product.id)
    setModalOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const truncateTitle = (title: string, maxLength = 50) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title
  }

  return (
    <Card
      className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className={`object-contain p-4 transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setImageLoading(false)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">{product.category}</Badge>
      </div>

      <CardContent className="flex-1 p-4 space-y-3">
        <h3 className="font-semibold text-card-foreground leading-tight text-balance">
          {truncateTitle(product.title)}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">{product.rating.rate}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
        </div>

        <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
