"use client"

import { useTranslations } from "next-intl"
import { LayoutGrid } from "lucide-react"

export function Footer() {
  const t = useTranslations("landing.footer")

  return (
    <footer className="w-full py-16 bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">{t("brand")}</span>
        </div>
        <nav className="flex gap-6 flex-wrap justify-center">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.album")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.features")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.compare")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.privacy")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.terms")}
          </a>
        </nav>
        <span className="text-sm text-muted-foreground text-center">
          {t("copyright")}
          <br />
          {t("tagline")}
        </span>
      </div>
    </footer>
  )
}
