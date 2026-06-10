"use client"

import { useTranslations, useLocale } from "next-intl"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function HeaderLoginButton() {
  const t = useTranslations("profile.userMenu")
  const locale = useLocale()

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  return (
    <Button size="sm" onClick={handleSignIn}>
      {t("logIn")}
    </Button>
  )
}
