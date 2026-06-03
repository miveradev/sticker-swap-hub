import { Button } from "@/components/ui/button"
import { Comparison } from "./Comparison"

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-8">
      <div className="max-w-3xl flex flex-col gap-4">
        <h1 className="text-5xl font-semibold tracking-tight text-foreground">
          Compare your FIFA World Cup 2026 collections in seconds.
        </h1>
        <p className="text-base text-muted-foreground">
          Track the stickers you have, mark the ones you need, and instantly compare your collection
          with friends to see possible trades.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">Start Tracking</Button>
        <Button variant="outline" size="lg">
          View Album
        </Button>
      </div>
      <Comparison />
    </section>
  )
}
