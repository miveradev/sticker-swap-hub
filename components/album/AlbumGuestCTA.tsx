"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogIn } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

export function AlbumGuestCTA() {
  const t = useTranslations("album.guest")
  const locale = useLocale()

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-center text-center gap-4 px-6 py-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>
        <Button className="w-full gap-2" onClick={handleSignIn}>
          <LogIn className="w-4 h-4" />
          {t("signIn")}
        </Button>
      </CardContent>
    </Card>
  )
}
