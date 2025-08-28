"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

export function CartIcon() {
  const totalItems = useStore((state) => state.getTotalItems())

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="relative h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs font-bold">
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Button>
    </div>
  )
}
