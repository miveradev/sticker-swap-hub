"use client"

import { useTranslations } from "next-intl"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const t = useTranslations("landing.header")

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border h-16 flex items-center">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 w-full">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">{t("brand")}</span>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.album")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.features")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.compare")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.signIn")}
          </a>
        </nav>
        <Button size="sm">{t("cta")}</Button>
      </div>
    </header>
  )
}
