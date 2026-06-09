"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Loader2, X } from "lucide-react"

type SearchUser = {
  username: string | null
  name: string
  image: string | null
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("")
}

export function SocialSearch() {
  const t = useTranslations("social")
  const locale = useLocale()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchUser[]>([])
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(q.trim())}`)
      setResults(await res.json())
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 300)
  }

  // Reset highlight when results change
  useEffect(() => { setHighlighted(-1) }, [results])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlighted >= 0) resultRefs.current[highlighted]?.scrollIntoView({ block: "nearest" })
  }, [highlighted])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (results.length === 0) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlighted((h) => Math.min(h + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlighted((h) => Math.max(h - 1, 0))
      } else if (e.key === "Enter" && highlighted >= 0) {
        const user = results[highlighted]
        if (user?.username) router.push(`/${locale}/u/${user.username}`)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [results, highlighted, locale, router])

  function clear() {
    setQuery("")
    setResults([])
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Search input */}
      <div className="flex items-center gap-3 bg-card border border-border rounded px-4 py-3 focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(163,230,53,0.1)] transition-all">
        <Search className="w-5 h-5 text-primary shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={handleInput}
          placeholder={t("placeholder")}
          className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
        />
        {loading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />}
        {!loading && query && (
          <button onClick={clear} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results */}
      {query.trim().length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {!loading && results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">{t("noResults")}</p>
          ) : (
            results.map((user, i) => (
              <Link
                key={user.username}
                ref={(el) => { resultRefs.current[i] = el }}
                href={`/${locale}/u/${user.username}`}
                onMouseEnter={() => setHighlighted(i)}
                className={[
                  "flex items-center gap-4 px-4 py-3 transition-colors border-b border-border/50 last:border-0",
                  highlighted === i ? "bg-muted" : "hover:bg-muted",
                ].join(" ")}
              >
                <Avatar className="w-9 h-9 border border-border shrink-0">
                  {user.image && <AvatarImage src={user.image} alt={user.username ?? user.name} />}
                  <AvatarFallback className="text-xs font-semibold">{initials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold text-foreground">{user.username}</span>
              </Link>
            ))
          )}
        </div>
      )}

      {query.trim().length === 0 && (
        <p className="text-sm text-muted-foreground text-center pt-6">{t("empty")}</p>
      )}
    </div>
  )
}
