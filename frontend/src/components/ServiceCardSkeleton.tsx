export default function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse flex flex-col">
      <div className="h-44 sm:h-52 bg-gray-200" />
      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
        <div className="h-5 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="mt-auto space-y-3">
          <div className="h-6 bg-gray-200 rounded w-28" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  )
}

