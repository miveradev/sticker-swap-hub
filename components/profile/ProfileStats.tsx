import { Card } from "@/components/ui/card"

const stats = [
  { value: "85%", label: "Completion" },
  { value: "833", label: "Owned" },
  { value: "142", label: "Duplicates" },
] as const

export function ProfileStats() {
  return (
    <section className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="py-0 gap-0 ring-0 border border-border rounded-xl items-center justify-center text-center p-4"
        >
          <span className="text-xl font-semibold tracking-tight text-foreground">
            {stat.value}
          </span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            {stat.label}
          </span>
        </Card>
      ))}
    </section>
  )
}
