export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Skeleton with subtle pulse */}
        <div className="aspect-[2/3] w-full max-w-md mx-auto bg-stone-100 animate-pulse" />
        
        {/* Content Skeleton with subtle pulse */}
        <div className="space-y-6 animate-pulse">
          <div className="h-10 w-3/4 bg-stone-100" /> {/* Title */}
          <div className="h-6 w-1/3 bg-stone-100" />  {/* Category */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-stone-100" />
            <div className="h-4 w-full bg-stone-100" />
            <div className="h-4 w-2/3 bg-stone-100" />
          </div> {/* Description */}
          <div className="h-8 w-1/4 bg-stone-100" /> {/* Price */}
          <div className="h-12 w-40 bg-stone-100" />  {/* Button */}
        </div>
      </div>
    </div>
  );
}
