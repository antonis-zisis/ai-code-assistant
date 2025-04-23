export function Loading() {
  return (
    <div className="flex justify-start">
      <div className="p-3 rounded-lg bg-gray-700 text-gray-100">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
      </div>
    </div>
  );
}
