"use client"

import { useTranslations } from "next-intl"
import { MessageCircle, Images, AlertCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

function PainCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="bg-background border border-border rounded p-8 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
        <Icon className="w-7 h-7 text-destructive" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function PainPoints() {
  const t = useTranslations("landing.painPoints")

  return (
    <div className="w-full bg-card/40 border-y border-border/50 py-24">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PainCard icon={MessageCircle} title={t("whatsapp.title")} description={t("whatsapp.description")} />
          <PainCard icon={Images} title={t("photos.title")} description={t("photos.description")} />
          <PainCard icon={AlertCircle} title={t("memory.title")} description={t("memory.description")} />
        </div>
      </div>
    </div>
  )
}
