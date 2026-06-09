"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USERNAME_MIN, USERNAME_MAX } from "@/lib/username"

type Status = "idle" | "checking" | "available" | "taken" | "invalid"

const VALID_CHAR_RE = /^[a-z0-9_]*$/

export function UsernameForm({ locale }: { locale: string }) {
  const t = useTranslations("onboarding.username")
  const [username, setUsername] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (username === "") {
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
        const res = await fetch(
          `/api/username/check?username=${encodeURIComponent(username)}`
        )
        const data = (await res.json()) as { available: boolean }
        setStatus(data.available ? "available" : "taken")
      } catch {
        setStatus("idle")
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [username])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setApiError(null)
    // Sanitise: lowercase, strip invalid chars
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
      if (res.status === 409) {
        setStatus("taken")
      } else {
        setApiError(data.error ?? t("error.generic"))
      }
    } catch {
      setApiError(t("error.retry"))
    } finally {
      setSubmitting(false)
    }
  }

  const hint = (() => {
    if (apiError) return { text: apiError, color: "text-destructive" }
    if (status === "available") return { text: t("hint.available"), color: "text-primary" }
    if (status === "taken") return { text: t("hint.taken"), color: "text-destructive" }
    if (status === "invalid" && username.length > 0)
      return {
        text:
          username.length < USERNAME_MIN
            ? t("hint.tooShort", { min: USERNAME_MIN })
            : t("hint.invalidChars"),
        color: "text-muted-foreground",
      }
    return {
      text: t("hint.format", { min: USERNAME_MIN, max: USERNAME_MAX }),
      color: "text-muted-foreground",
    }
  })()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Input
            value={username}
            onChange={handleChange}
            placeholder={t("placeholder")}
            maxLength={USERNAME_MAX}
            autoComplete="off"
            autoFocus
            className="pr-9"
            aria-label="Username"
            aria-describedby="username-hint"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {status === "checking" && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
            {status === "available" && <CheckCircle className="w-4 h-4 text-primary" />}
            {(status === "taken" || status === "invalid") && (
              <XCircle className="w-4 h-4 text-destructive" />
            )}
          </span>
        </div>

        <p id="username-hint" className={`text-xs min-h-[16px] ${hint.color}`}>
          {hint.text}
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={status !== "available" || submitting}>
        {submitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("saving")}
          </span>
        ) : (
          t("continue")
        )}
      </Button>
    </form>
  )
}
