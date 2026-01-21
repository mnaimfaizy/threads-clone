export default function Loading() {
  return (
    <section>
      <div className="h-10 w-64 animate-pulse rounded-lg bg-dark-4 mb-10" />

      <div className="mt-14 flex flex-col gap-9">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="community-card">
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-dark-4" />
              <div className="flex-1">
                <div className="h-4 w-40 animate-pulse rounded bg-dark-4 mb-2" />
                <div className="h-3 w-32 animate-pulse rounded bg-dark-4" />
              </div>
            </div>
            <div className="mt-4 h-3 w-full animate-pulse rounded bg-dark-4" />
            <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-dark-4" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="h-9 w-24 animate-pulse rounded bg-dark-4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-7 w-7 animate-pulse rounded-full bg-dark-4"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
