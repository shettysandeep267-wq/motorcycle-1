export default function ProductCardSkeleton() {
  return (
    <div className="bg-black/40 rounded-xl shadow-sm border border-white/10 overflow-hidden animate-pulse">
      <div className="h-48 sm:h-56 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-3/4" />
        <div className="flex justify-between items-center pt-3">
          <div className="h-6 bg-white/10 rounded w-20" />
          <div className="h-5 bg-white/5 rounded w-24" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-10 bg-white/10 rounded flex-1" />
          <div className="h-10 bg-white/10 rounded w-24" />
        </div>
      </div>
    </div>
  )
}
