export default function Loading() {
  return (
    <section>
      <div className="h-10 w-48 animate-pulse rounded-lg bg-dark-4 mb-10" />

      <div className="mt-9 flex flex-col gap-10">
        <div className="flex flex-col gap-5 rounded-xl border border-dark-4 p-7">
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
              <div className="flex flex-col items-center">
                <div className="h-11 w-11 animate-pulse rounded-full bg-dark-4" />
              </div>
              <div className="flex w-full flex-col">
                <div className="h-4 w-32 animate-pulse rounded bg-dark-4" />
                <div className="mt-2 h-20 w-full animate-pulse rounded bg-dark-4" />
              </div>
            </div>
          </div>
          <div className="mt-5 h-20 w-full animate-pulse rounded bg-dark-4" />
        </div>
      </div>
    </section>
  );
}
