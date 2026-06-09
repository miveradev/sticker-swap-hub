"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Pencil, CheckCircle, XCircle, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USERNAME_MIN, USERNAME_MAX } from "@/lib/username"

type Status = "idle" | "checking" | "available" | "taken" | "invalid"

const VALID_CHAR_RE = /^[a-z0-9_]*$/

interface EditUsernameButtonProps {
  currentUsername: string
  locale: string
}

export function EditUsernameButton({ currentUsername, locale }: EditUsernameButtonProps) {
  const t = useTranslations("profile.editUsername")
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState(currentUsername)
  const [status, setStatus] = useState<Status>("idle")
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setUsername(currentUsername)
    setStatus("idle")
    setApiError(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [open, currentUsername])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (username === "" || username === currentUsername) {
      setStatus("idle")
      return
    }
    if (!VALID_CHAR_RE.test(username) || username.length < USERNAME_MIN) {
      setStatus("invalid")
      return
    }
    setStatus("checking")
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/username/check?username=${encodeURIComponent(username)}`)
        const data = (await res.json()) as { available: boolean }
        setStatus(data.available ? "available" : "taken")
      } catch {
        setStatus("idle")
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [username, currentUsername])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setApiError(null)
    setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== "available" || submitting) return
    setSubmitting(true)
    setApiError(null)
    try {
      const res = await fetch("/api/username/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })
      if (res.ok) {
        router.push(`/${locale}/u/${username}`)
        return
      }
      const data = (await res.json()) as { error?: string }
      if (res.status === 409) setStatus("taken")
      else setApiError(data.error ?? t("error.generic"))
    } catch {
      setApiError(t("error.retry"))
    } finally {
      setSubmitting(false)
    }
  }

  const hint = (() => {
    if (apiError) return { text: apiError, color: "text-destructive" }
    if (status === "available") return { text: t("hint.available"), color: "text-green-500" }
    if (status === "taken") return { text: t("hint.taken"), color: "text-destructive" }
    if (status === "invalid" && username.length > 0)
      return {
        text: username.length < USERNAME_MIN ? t("hint.tooShort", { min: USERNAME_MIN }) : t("hint.invalidChars"),
        color: "text-muted-foreground",
      }
    return { text: t("hint.format", { min: USERNAME_MIN, max: USERNAME_MAX }), color: "text-muted-foreground" }
  })()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors mt-1"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">{t("title")}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={username}
                    onChange={handleChange}
                    placeholder={t("placeholder")}
                    maxLength={USERNAME_MAX}
                    autoComplete="off"
                    className="pr-9"
                    aria-label="Username"
                    aria-describedby="edit-username-hint"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {status === "checking" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                    {status === "available" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {(status === "taken" || status === "invalid") && <XCircle className="w-4 h-4 text-destructive" />}
                  </span>
                </div>
                <p id="edit-username-hint" className={`text-xs min-h-[16px] ${hint.color}`}>
                  {hint.text}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={status !== "available" || submitting}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("saving")}
                    </span>
                  ) : (
                    t("save")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
