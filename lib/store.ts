import { create } from "zustand"

// Product type based on Fake Store API
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Cart item type
export interface CartItem extends Product {
  quantity: number
}

// Store interface
interface StoreState {
  // Search and filter state
  searchQuery: string
  selectedCategory: string
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void

  // Cart state
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number

  // Modal state for product details
  selectedProductId: number | null
  isModalOpen: boolean
  setSelectedProduct: (productId: number | null) => void
  setModalOpen: (open: boolean) => void
}

// Zustand store
export const useStore = create<StoreState>((set, get) => ({
  // Search and filter state
  searchQuery: "",
  selectedCategory: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Cart state
  cartItems: [],
  addToCart: (product) => {
    const { cartItems } = get()
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      })
    } else {
      set({
        cartItems: [...cartItems, { ...product, quantity: 1 }],
      })
    }
  },
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== productId),
    })
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }

    set({
      cartItems: get().cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    })
  },
  clearCart: () => set({ cartItems: [] }),
  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0)
  },
  getTotalPrice: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  // Modal state management
  selectedProductId: null,
  isModalOpen: false,
  setSelectedProduct: (productId) => set({ selectedProductId: productId }),
  setModalOpen: (open) => set({ isModalOpen: open }),
}))
