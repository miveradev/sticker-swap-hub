"use client"

import { useTranslations } from "next-intl"
import { LayoutGrid } from "lucide-react"

export function Footer() {
  const t = useTranslations("landing.footer")

  return (
    <footer className="w-full py-14 bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <LayoutGrid className="w-5 h-5 text-primary" />
          <span className="font-display text-base font-bold tracking-tight text-foreground">{t("brand")}</span>
        </div>
        <nav className="flex gap-6 flex-wrap justify-center">
          {[t("nav.album"), t("nav.features"), t("nav.compare"), t("nav.privacy"), t("nav.terms")].map((label) => (
            <a
              key={label}
              href="#"
              className="font-mono text-xs tracking-[0.08em] font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="font-mono text-xs text-muted-foreground text-center leading-relaxed">
          {t("copyright")}
          <br />
          {t("tagline")}
        </span>
      </div>
    </footer>
  )
}
