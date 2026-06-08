import React from "react"
import { LayoutGrid } from "lucide-react"

function Pulse({ className, style }: { className: string; style?: React.CSSProperties }) {
  return <div className={`bg-muted animate-pulse rounded-md ${className}`} style={style} />
}

export default function SwapLoading() {
  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Top bar */}
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-foreground" />
            <span className="text-lg font-bold tracking-tighter text-foreground">Sticker Swap Hub</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="flex-grow pt-24 pb-8 px-4 max-w-2xl mx-auto w-full flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-2">
          <Pulse className="h-9 w-56" />
          <Pulse className="h-4 w-80" />
        </div>

        {/* User selector */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex flex-col gap-2">
              <Pulse className="h-3 w-20" />
              <Pulse className="h-5 w-28" />
            </div>
          </div>
          <div className="hidden md:block w-9 h-9 rounded-full bg-muted animate-pulse" />
          <div className="w-full h-px bg-border block md:hidden" />
          <div className="flex items-center gap-4 w-full md:w-auto bg-background border border-border rounded-lg p-3">
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex flex-col gap-2">
              <Pulse className="h-3 w-20" />
              <Pulse className="h-5 w-24" />
            </div>
          </div>
        </div>

        {/* Trade summary — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[0, 70, 140].map((delay) => (
            <div key={delay} className="border border-border rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <Pulse className="h-3 w-24" />
                <Pulse className="h-4 w-4 rounded-sm" />
              </div>
              <Pulse className="h-9 w-12" style={{ animationDelay: `${delay}ms` }} />
              <Pulse className="h-3 w-28" />
            </div>
          ))}
        </div>

        {/* Insight bar */}
        <div className="border border-border rounded-xl p-4 flex items-start gap-3">
          <Pulse className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-2 flex-1">
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-3/4" />
          </div>
        </div>

        {/* Sticker sections */}
        <div className="flex flex-col gap-16 pt-6 border-t border-border">
          {[8, 4].map((count, si) => (
            <div key={si} className={si === 1 ? "border-t border-border pt-6" : ""}>
              {/* Section title + description */}
              <div className="flex flex-col gap-2 mb-4">
                <Pulse className="h-7 w-40" />
                <Pulse className="h-4 w-64" />
              </div>
              {/* Country sub-header */}
              <div className="flex items-center gap-2 mb-4 pb-1 border-b border-border">
                <Pulse className="h-5 w-6 rounded-sm" />
                <Pulse className="h-5 w-24" />
              </div>
              {/* Card grid */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {Array.from({ length: count }).map((_, i) => (
                  <Pulse
                    key={i}
                    className="aspect-square rounded-lg"
                    style={{ animationDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
