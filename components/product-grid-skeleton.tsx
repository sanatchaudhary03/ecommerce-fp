import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="h-8 bg-muted rounded-lg w-64 mx-auto animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="h-full flex flex-col overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse" />
            <CardContent className="flex-1 p-4 space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                <div className="h-4 bg-muted rounded w-20 animate-pulse" />
              </div>
              <div className="h-6 bg-muted rounded w-20 animate-pulse" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-9 bg-muted rounded w-full animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
