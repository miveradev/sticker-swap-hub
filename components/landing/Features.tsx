"use client"

import { useTranslations } from "next-intl"
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
  const t = useTranslations("landing.features")

  return (
    <section id="features" className="max-w-7xl mx-auto px-8 flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-base text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={ListChecks}
          title={t("track.title")}
          description={t("track.description")}
        />
        <FeatureCard
          icon={Share2}
          title={t("share.title")}
          description={t("share.description")}
        />
        <FeatureCard
          icon={ArrowLeftRight}
          title={t("compare.title")}
          description={t("compare.description")}
        />
      </div>
    </section>
  )
}
