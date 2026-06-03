import { ListChecks, Share2, ArrowLeftRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="bg-card border border-border p-8 rounded-lg flex flex-col gap-4 hover:bg-muted transition-colors cursor-pointer">
      <Icon className="w-8 h-8 text-foreground" />
      <h3 className="text-lg font-medium tracking-tight text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Stop comparing lists manually.
        </h2>
        <p className="text-base text-muted-foreground">
          Ditch the WhatsApp photos and scribbled notes. Sticker Swap Hub provides a clean, precise
          interface to manage your inventory and find exact matches instantly.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={ListChecks}
          title="Track your collection"
          description="Quickly mark stickers as owned, needed, or duplicate with keyboard shortcuts and bulk actions."
        />
        <FeatureCard
          icon={Share2}
          title="Share your progress"
          description="Generate a unique public link to show friends exactly what you need without them needing an account."
        />
        <FeatureCard
          icon={ArrowLeftRight}
          title="Compare instantly"
          description="Paste a friend's link and see exactly which stickers you can swap in a clean, visual format."
        />
      </div>
    </section>
  )
}
