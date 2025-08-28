"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useStore } from "@/lib/store"

export function ShoppingCart() {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const cartItems = useStore((state) => state.cartItems)
  const totalItems = useStore((state) => state.getTotalItems())
  const totalPrice = useStore((state) => state.getTotalPrice())
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const clearCart = useStore((state) => state.clearCart)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    setCheckoutSuccess(false)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Mock checkout:", { items: cartItems, total: totalPrice })

    setIsCheckingOut(false)
    setCheckoutSuccess(true)

    // Clear cart and reset success message after delay
    setTimeout(() => {
      clearCart()
      setCheckoutSuccess(false)
    }, 3000)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Trash2 className="h-5 w-5 sm:h-6 sm:w-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs font-bold">
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold text-foreground">
              <Trash2 className="h-5 w-5" />
              Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </SheetTitle>
          </SheetHeader>

          {checkoutSuccess && (
            <Alert className="mt-4 border-green-200 bg-green-50 text-green-800 flex-shrink-0">
              <Trash2 className="h-4 w-4" />
              <AlertDescription>Order placed successfully! This is a mock checkout.</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col flex-1 min-h-0 mt-6">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Trash2 className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Your cart is empty</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Add some products to get started!</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 -mx-6 px-6">
                  <div className="space-y-3 sm:space-y-4 pb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-lg border">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-contain p-1 sm:p-2"
                            sizes="(max-width: 640px) 48px, 64px"
                          />
                        </div>

                        <div className="flex-1 space-y-2 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base text-card-foreground leading-tight line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">{item.category}</p>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm sm:text-base text-primary">
                              {formatPrice(item.price)}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-8 sm:w-8 bg-transparent"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                              </Button>
                              <span className="font-medium text-xs sm:text-sm min-w-[1.5rem] sm:min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-8 sm:w-8 bg-transparent"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 sm:h-8 sm:w-8 text-destructive hover:text-destructive bg-transparent"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-2 w-2 sm:h-3 sm:w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="space-y-4 pt-4 border-t flex-shrink-0">
                  <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || cartItems.length === 0}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
                      size="lg"
                    >
                      {isCheckingOut ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Checkout {formatPrice(totalPrice)}
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={clearCart}
                      disabled={isCheckingOut || cartItems.length === 0}
                      className="w-full bg-transparent text-sm sm:text-base"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
