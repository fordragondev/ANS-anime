export function TopStorySkeleton() {
  return (
    <div className="animate-pulse w-full min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row overflow-hidden shadow-xl">
      {/* Image placeholder */}
      <div className="w-full md:w-[65%] h-[250px] md:h-auto md:min-h-[500px] bg-gray-300 dark:bg-gray-700" />

      {/* Content placeholder */}
      <div className="w-full md:w-[35%] bg-[#2a2a2a] dark:bg-gray-900 p-6 md:p-8 flex flex-col justify-center">
        <div className="w-16 h-6 bg-gray-600 rounded mb-4" />
        <div className="h-10 bg-gray-600 rounded w-full mb-2" />
        <div className="h-10 bg-gray-600 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-600 rounded w-full mb-2" />
        <div className="h-4 bg-gray-600 rounded w-full mb-2" />
        <div className="h-4 bg-gray-600 rounded w-2/3 mb-4" />
        <div className="flex gap-2">
          <div className="h-4 bg-gray-600 rounded w-20" />
          <div className="h-4 bg-gray-600 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function TopPicksSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="aspect-[16/10] bg-gray-300 dark:bg-gray-700" />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-8" />
            </div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LatestNewsSkeleton() {
  return (
    <div className="bg-[#f5f5f5] dark:bg-gray-800 p-6 md:p-8 rounded-lg animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48" />
        <div className="flex gap-4">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>

      {/* News items */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4 py-4 border-t border-gray-200 dark:border-gray-700 first:border-t-0">
          <div className="w-full sm:w-48 h-36 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0" />
          <div className="flex-1">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="flex gap-2 mb-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16" />
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mt-1" />
          </div>
        </div>
      ))}

      {/* Load more button */}
      <div className="flex justify-center mt-6">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-40" />
      </div>
    </div>
  );
}

export function CategorySectionSkeleton() {
  return (
    <div className="animate-pulse mb-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-700">
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-24" />
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-6" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Featured */}
        <div>
          <div className="aspect-[16/10] bg-gray-300 dark:bg-gray-700 rounded-lg mb-3" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
