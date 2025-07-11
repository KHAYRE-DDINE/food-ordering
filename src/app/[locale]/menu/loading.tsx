export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
