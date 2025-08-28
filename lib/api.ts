import type { Product } from "./store"

const BASE_URL = "https://fakestoreapi.com"

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch products by category")
  }
  return response.json()
}

// Fetch single product
export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}
