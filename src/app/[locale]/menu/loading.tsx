export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-zinc-50 px-4 py-12">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 h-9 w-64 animate-pulse rounded-md bg-zinc-200" />
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="h-10 w-full animate-pulse rounded-md bg-zinc-100" />
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-9 animate-pulse rounded-md bg-zinc-100" />
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="aspect-[4/3] animate-pulse rounded-md bg-zinc-100" />
              <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-zinc-100" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-zinc-100" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-100" />
            </div>
          ))}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
}
