export default function LoadingCard() {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse">
      <div className="relative w-full aspect-video bg-gray-300" />

      <div className="p-4 flex-1 flex flex-col">
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-auto" />
      </div>
    </article>
  );
}
