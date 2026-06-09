"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Pencil, X, Search, Check, Loader2 } from "lucide-react"
import ReactCountryFlag from "react-country-flag"
import { getLocalizedCountries } from "@/lib/countries"

interface EditCountryButtonProps {
  currentCountry: string | null
  locale: string
}

export function EditCountryButton({ currentCountry, locale }: EditCountryButtonProps) {
  const t = useTranslations("profile.editCountry")
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setQuery("")
    setTimeout(() => searchRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const allCountries = useMemo(() => getLocalizedCountries(locale), [locale])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allCountries
    return allCountries.filter((c) => c.name.toLowerCase().includes(q))
  }, [query, allCountries])

  async function handleSelect(code: string) {
    if (saving || code === currentCountry) {
      setOpen(false)
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/user/country", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: code }),
      })
      if (res.ok) {
        router.refresh()
        setOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-sm flex flex-col max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0">
              <h2 className="text-base font-semibold text-foreground">{t("title")}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pb-3 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-muted border border-border rounded-lg outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* List */}
            <ul className="overflow-y-auto flex-1 px-2 pb-2">
              {filtered.length === 0 ? (
                <li className="text-sm text-muted-foreground text-center py-6">{t("noResults")}</li>
              ) : (
                filtered.map((country) => {
                  const isSelected = country.code === currentCountry
                  return (
                    <li key={country.code}>
                      <button
                        type="button"
                        onClick={() => handleSelect(country.code)}
                        disabled={saving}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{ width: "1.4em", height: "1.4em", flexShrink: 0 }}
                        />
                        <span className="flex-1 text-foreground">{country.name}</span>
                        {isSelected && (
                          saving
                            ? <Loader2 className="w-4 h-4 animate-spin text-muted-foreground shrink-0" />
                            : <Check className="w-4 h-4 text-foreground shrink-0" />
                        )}
                      </button>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
