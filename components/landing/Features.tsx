"use client"

import { useTranslations } from "next-intl"
import { BookMarked, Share2, Handshake } from "lucide-react"
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
    <div className="bg-card border border-border p-8 rounded flex flex-col gap-5 hover:border-primary/40 hover:bg-accent transition-all duration-200 cursor-default group">
      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function Features() {
  const t = useTranslations("landing.features")

  return (
    <section id="features" className="max-w-7xl mx-auto px-8 flex flex-col gap-10 w-full">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{t("title")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon={BookMarked}
          title={t("track.title")}
          description={t("track.description")}
        />
        <FeatureCard
          icon={Share2}
          title={t("share.title")}
          description={t("share.description")}
        />
        <FeatureCard
          icon={Handshake}
          title={t("compare.title")}
          description={t("compare.description")}
        />
      </div>
    </section>
  )
}
