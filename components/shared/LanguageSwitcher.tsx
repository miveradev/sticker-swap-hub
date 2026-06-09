"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { ChevronDown } from "lucide-react"
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

export function LanguageSwitcher() {
  const currentLocale = useLocale() as LocaleCode
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function switchLocale(next: LocaleCode) {
    if (next === currentLocale) return
    const segments = pathname.split("/")
    segments[1] = next
    const qs = searchParams.toString()
    router.push(segments.join("/") + (qs ? `?${qs}` : ""))
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
            className={`py-2 cursor-pointer ${l.code === currentLocale ? "bg-accent text-accent-foreground" : ""}`}
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
