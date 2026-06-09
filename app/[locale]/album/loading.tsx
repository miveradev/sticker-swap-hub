import { getTranslations } from "next-intl/server"
import { ArrowLeftRight } from "lucide-react"

export default async function AlbumLoading() {
  const tApp = await getTranslations("app")
  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
            <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
            <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">
              {tApp("name")}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="flex-grow pt-24 pb-8 px-4 max-w-2xl mx-auto w-full flex flex-col">
        <section className="mb-6">
          <div className="h-9 w-52 bg-muted rounded-md animate-pulse" />
        </section>

        <div className="flex flex-col gap-6">
          <div className="h-24 w-full bg-muted rounded-xl animate-pulse" />
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-md bg-muted animate-pulse"
                style={{ animationDelay: `${(i % 5) * 40}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
