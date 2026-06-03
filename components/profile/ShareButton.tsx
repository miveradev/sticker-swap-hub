"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

interface ShareButtonProps {
  username: string
}

export function ShareButton({ username }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("profile.share")
  const locale = useLocale()

  async function handleShare() {
    const url = `${window.location.origin}/${locale}/u/${username}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      onClick={handleShare}
      className="w-full rounded-lg py-3 px-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-200 h-auto"
    >
      {copied ? (
        <Check className="w-4 h-4 shrink-0" />
      ) : (
        <Share2 className="w-4 h-4 shrink-0" />
      )}
      <span className="text-xs font-bold tracking-wide">
        {copied ? t("copied") : t("button")}
      </span>
    </Button>
  )
}
