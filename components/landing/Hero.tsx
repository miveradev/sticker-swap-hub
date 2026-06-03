"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Comparison } from "./Comparison"

export function Hero() {
  const t = useTranslations("landing.hero")

  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-8">
      <div className="max-w-3xl flex flex-col gap-4">
        <h1 className="text-5xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
        <p className="text-base text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">{t("ctaPrimary")}</Button>
        <Button variant="outline" size="lg">
          {t("ctaSecondary")}
        </Button>
      </div>
      <Comparison />
    </section>
  )
}
