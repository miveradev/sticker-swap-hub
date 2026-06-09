"use client"

import { useTranslations } from "next-intl"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function HeaderLoginButton() {
  const t = useTranslations("profile.userMenu")

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/onboarding/username`,
    })
  }

  return (
    <Button size="sm" onClick={handleSignIn}>
      {t("logIn")}
    </Button>
  )
}
