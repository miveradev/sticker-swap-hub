"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export function Cta() {
  const t = useTranslations("landing.cta")

  return (
    <section className="max-w-3xl mx-auto px-8 flex flex-col items-center text-center gap-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
      <p className="text-base text-muted-foreground">{t("subtitle")}</p>
      <Button size="lg" className="mt-4">
        {t("button")}
      </Button>
    </section>
  )
}
