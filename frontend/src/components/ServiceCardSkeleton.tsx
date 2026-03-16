export default function ServiceCardSkeleton() {
  return (
    <div className="bg-black/40 rounded-xl shadow-sm border border-white/10 overflow-hidden animate-pulse flex flex-col">
      <div className="h-44 sm:h-52 bg-white/10" />
      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
        <div className="h-5 bg-white/10 rounded w-4/5" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-2/3" />
        <div className="mt-auto space-y-3">
          <div className="h-6 bg-white/10 rounded w-28" />
          <div className="h-10 bg-white/10 rounded w-full" />
        </div>
      </div>
    </div>
  )
}

