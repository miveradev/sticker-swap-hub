"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function HeaderLoginButton() {
  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/onboarding/username`,
    })
  }

  return (
    <Button size="sm" onClick={handleSignIn}>
      Log In
    </Button>
  )
}
