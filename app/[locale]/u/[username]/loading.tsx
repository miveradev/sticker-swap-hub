export default function ProfileLoading() {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 lg:max-w-md lg:mx-auto">
          <span className="text-lg font-bold tracking-tighter text-foreground">
            Sticker Swap Hub
          </span>
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="flex-grow pt-24 px-4 flex flex-col gap-8 lg:max-w-md lg:mx-auto lg:w-full">
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-36 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>

        <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  )
}
