"use client"

import { useQuery } from "@tanstack/react-query"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCategories } from "@/lib/api"
import { useStore } from "@/lib/store"

export function SearchAndFilter() {
  const searchQuery = useStore((state) => state.searchQuery)
  const selectedCategory = useStore((state) => state.selectedCategory)
  const setSearchQuery = useStore((state) => state.setSearchQuery)
  const setSelectedCategory = useStore((state) => state.setSelectedCategory)

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>

        {/* Category Filter and Clear Button */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full xs:w-48 bg-input border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="flex items-center gap-2 bg-transparent w-full xs:w-auto"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Search: "{searchQuery.length > 20 ? `${searchQuery.substring(0, 20)}...` : searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              <button
                onClick={() => setSelectedCategory("")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
