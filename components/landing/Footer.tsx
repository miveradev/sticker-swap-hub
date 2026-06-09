"use client"

import { useTranslations } from "next-intl"
import { ArrowLeftRight } from "lucide-react"

export function Footer() {
  const t = useTranslations("landing.footer")
  const tApp = useTranslations("app")

  return (
    <footer className="w-full py-14 bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
          <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
          <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">{tApp("name")}</span>
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
