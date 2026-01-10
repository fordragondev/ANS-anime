export default function LoadingCard() {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse border border-gray-200 dark:border-gray-700">
      <div className="relative w-full aspect-video bg-gray-300 dark:bg-gray-700" />

      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-auto" />
      </div>
    </article>
  );
}
