"use client"

import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { LayoutGrid, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LOCALES = [
  { code: "en", countryCode: "GB", label: "English" },
  { code: "es", countryCode: "ES", label: "Español" },
] as const

type LocaleCode = (typeof LOCALES)[number]["code"]

function LanguageSwitcher() {
  const currentLocale = useLocale() as LocaleCode
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: LocaleCode) {
    if (next === currentLocale) return
    const segments = pathname.split("/")
    segments[1] = next
    router.push(segments.join("/"))
  }

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Switch language"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 h-8 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <ReactCountryFlag
          countryCode={current.countryCode}
          svg
          style={{ width: "1.2em", height: "1.2em" }}
        />
        <span className="text-xs font-medium">{current.code.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-0">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => switchLocale(l.code)}
            className={
              l.code === currentLocale ? "bg-accent text-accent-foreground" : undefined
            }
          >
            <ReactCountryFlag
              countryCode={l.countryCode}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
            />
            <span>{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button size="sm">{t("cta")}</Button>
        </div>
      </div>
    </header>
  )
}
