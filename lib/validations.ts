import { z } from "zod"

export const addProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0.01, "Price must be greater than 0")
    .max(10000, "Price must be less than $10,000"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image URL is required").url("Please enter a valid URL"),
})

export type AddProductFormData = z.infer<typeof addProductSchema>
