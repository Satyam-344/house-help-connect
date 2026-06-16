const WorkerCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex justify-between pt-2 border-t border-gray-100">
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded w-24" />
      </div>
    </div>
  </div>
);

export default WorkerCardSkeleton;
