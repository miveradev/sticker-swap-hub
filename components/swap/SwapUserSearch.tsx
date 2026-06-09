"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Search, Loader2, X } from "lucide-react"

type SearchUser = {
  username: string | null
  name: string
  image: string | null
}

interface SwapUserSearchProps {
  compareWithUser: SearchUser | null
  compareWithLabel: string
  locale: string
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("")
}

export function SwapUserSearch({ compareWithUser, compareWithLabel, locale }: SwapUserSearchProps) {
  const t = useTranslations("swap.search")
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchUser[]>([])
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([])

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

  function handleSelect(username: string | null) {
    if (!username) return
    close()
    window.location.href = `/${locale}/swap?user=${encodeURIComponent(username)}`
  }

  function close() {
    setOpen(false)
    setQuery("")
    setResults([])
  }

  function handleOpen() {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // Reset highlight when results change
  useEffect(() => { setHighlighted(-1) }, [results])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlighted >= 0) resultRefs.current[highlighted]?.scrollIntoView({ block: "nearest" })
  }, [highlighted])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { close(); return }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlighted((h) => Math.min(h + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlighted((h) => Math.max(h - 1, 0))
      } else if (e.key === "Enter" && highlighted >= 0) {
        e.preventDefault()
        handleSelect(results[highlighted]?.username ?? null)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, results, highlighted])

  return (
    <>
      {/* Compare-with trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center justify-between gap-4 w-full md:w-auto bg-background border border-border hover:border-foreground/30 hover:bg-card transition-all rounded p-3 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 border-2 border-primary shrink-0">
            {compareWithUser?.image && (
              <AvatarImage src={compareWithUser.image} alt={compareWithUser.username ?? compareWithUser.name} />
            )}
            <AvatarFallback className="text-xs font-semibold">
              {compareWithUser ? initials(compareWithUser.name) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              {compareWithLabel}
            </span>
            <span className={`text-base font-semibold ${compareWithUser ? "text-foreground" : "text-muted-foreground"}`}>
              {compareWithUser ? (compareWithUser.username ?? compareWithUser.name) : "—"}
            </span>
          </div>
        </div>
        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={close}
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">{t("title")}</span>
              <button
                onClick={close}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search input */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleInput}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
              {loading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />}
            </div>

            {/* Results */}
            <div className="max-h-64 overflow-y-auto">
              {query.trim().length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted-foreground text-center">{t("empty")}</p>
              ) : !loading && results.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted-foreground text-center">{t("noResults")}</p>
              ) : (
                results.map((user, i) => (
                  <button
                    key={user.username}
                    ref={(el) => { resultRefs.current[i] = el }}
                    onClick={() => handleSelect(user.username)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={[
                      "w-full flex items-center gap-3 px-4 py-3 transition-colors text-left cursor-pointer border-b border-border/50 last:border-0",
                      highlighted === i ? "bg-muted" : "hover:bg-muted",
                    ].join(" ")}
                  >
                    <Avatar className="w-8 h-8 border-2 border-primary shrink-0">
                      {user.image && <AvatarImage src={user.image} alt={user.username ?? user.name} />}
                      <AvatarFallback className="text-xs font-semibold">{initials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-foreground truncate">{user.username}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
