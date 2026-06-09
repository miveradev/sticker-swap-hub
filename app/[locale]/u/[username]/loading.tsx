import { getTranslations } from "next-intl/server"
import { ArrowLeftRight } from "lucide-react"

function Pulse({ className }: { className: string }) {
  return <div className={`bg-muted animate-pulse rounded-md ${className}`} />
}

export default async function ProfileLoading() {
  const tApp = await getTranslations("app")
  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Top bar */}
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
            <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
            <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">{tApp("name")}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="flex-grow pt-24 px-4 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        {/* Profile identity */}
        <section className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
          <Pulse className="h-8 w-36 mt-1" />
          <Pulse className="h-6 w-24 rounded-full" />
        </section>

        {/* Active album selector */}
        <section>
          <Pulse className="h-3 w-20 mb-2" />
          <Pulse className="h-10 w-full rounded-lg" />
        </section>

        {/* Stats — 3 cards */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border rounded-xl p-4 flex flex-col items-center gap-2">
              <Pulse className="h-7 w-10" />
              <Pulse className="h-3 w-14" />
            </div>
          ))}
        </div>

        {/* Share CTA */}
        <Pulse className="h-10 w-full rounded-lg" />

        {/* Top Duplicates */}
        <div className="flex flex-col gap-4">
          <Pulse className="h-5 w-32" />
          <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-muted animate-pulse"
                style={{ animationDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col gap-3 pb-8 pt-2">
          <Pulse className="h-10 w-full rounded-lg" />
          <Pulse className="h-10 w-full rounded-lg" />
        </div>
      </main>
    </div>
  )
}
