export default function HomeLoading() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-border h-16 flex items-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 w-full">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-muted animate-pulse" />
            <div className="h-5 w-36 bg-muted rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-14 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-20 h-8 bg-muted rounded-md animate-pulse" />
        </div>
      </header>

      <main className="pt-[120px] pb-16 flex flex-col gap-[120px]">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-8">
          <div className="max-w-3xl flex flex-col items-center gap-4 w-full">
            <div className="h-14 w-3/4 bg-muted rounded-lg animate-pulse" />
            <div className="h-14 w-1/2 bg-muted rounded-lg animate-pulse" />
            <div className="h-5 w-2/3 bg-muted rounded animate-pulse mt-2" />
          </div>
          <div className="flex gap-4">
            <div className="h-11 w-36 bg-muted rounded-md animate-pulse" />
            <div className="h-11 w-32 bg-muted rounded-md animate-pulse" />
          </div>
          {/* Comparison card placeholder */}
          <div className="w-full max-w-2xl h-48 bg-muted rounded-xl animate-pulse" />
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-8 flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="h-7 w-48 bg-muted rounded animate-pulse" />
            <div className="h-5 w-80 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border p-8 rounded-lg flex flex-col gap-4"
              >
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-8 flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="h-7 w-40 bg-muted rounded animate-pulse" />
            <div className="h-5 w-72 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border p-6 rounded-lg flex flex-col gap-1"
              >
                <div className="h-12 w-20 bg-muted rounded animate-pulse" />
                <div className="h-3 w-16 bg-muted rounded animate-pulse mt-1" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-8 flex flex-col items-center text-center gap-6">
          <div className="h-7 w-64 bg-muted rounded animate-pulse" />
          <div className="h-5 w-80 bg-muted rounded animate-pulse" />
          <div className="h-11 w-36 bg-muted rounded-md animate-pulse mt-4" />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-background border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded animate-pulse" />
            <div className="h-5 w-36 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-40 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </footer>
    </>
  )
}
