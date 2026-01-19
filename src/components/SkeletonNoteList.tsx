const SkeletonNoteList: React.FC = () => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0 py-10">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="group relative flex flex-col p-5 rounded-xl border-t-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/30"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div className="space-y-2 mb-6 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="flex gap-2 justify-end mt-auto">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonNoteList;
