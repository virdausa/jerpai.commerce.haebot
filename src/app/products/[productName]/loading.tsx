import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-1 py-3 md:px-6 md:py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Gallery Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>

          <div className="space-y-2 pt-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
