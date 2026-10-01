export default function ProductCardSkeleton() {
  return (
    <div
      role="status"
      className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 motion-safe:animate-pulse dark:bg-gray-800"
    >
      <span className="sr-only">Đang tải sản phẩm...</span>
      <div aria-hidden="true">
        <div className="absolute right-2 top-2 size-11 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="absolute inset-x-2 bottom-2 space-y-2 sm:inset-x-4 sm:bottom-4">
          <div className="rounded h-4 w-4/5 bg-gray-300 dark:bg-gray-700" />
          <div className="rounded h-3 w-3/5 bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
