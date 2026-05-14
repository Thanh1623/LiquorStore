export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[2/3] w-2/3 mx-auto bg-stone-100" />
          <div className="h-4 w-1/3 mx-auto bg-stone-100" />
          <div className="h-6 w-2/3 mx-auto bg-stone-100" />
          <div className="h-4 w-1/4 mx-auto bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
