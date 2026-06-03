import { ArrowRight } from "lucide-react"

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card border border-border p-6 rounded-lg flex flex-col gap-1">
      <span className="text-5xl font-semibold tracking-tight text-foreground">{value}</span>
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Built specifically for FIFA World Cup 2026.
        </h2>
        <p className="text-base text-muted-foreground">
          Every team, every special sticker, pre-loaded and ready to track.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatCard value="980" label="Stickers" />
        <StatCard value="48" label="National Teams" />
        <StatCard value="8" label="Special Sections" />
        <div className="bg-card border border-border p-6 rounded-lg flex flex-col items-center justify-center">
          <ArrowRight className="w-8 h-8 text-foreground" />
        </div>
      </div>
    </section>
  )
}
