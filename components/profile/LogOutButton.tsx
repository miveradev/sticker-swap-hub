"use client"

import { authClient } from "@/lib/auth-client"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogOutButton() {
  const t = useTranslations("profile.userMenu")
  const locale = useLocale()
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut()
    router.push(`/${locale}`)
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full rounded-lg py-3 px-4 flex items-center justify-center gap-2 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <LogOut className="w-4 h-4 shrink-0" />
      <span className="text-xs font-medium tracking-wide">{t("logOut")}</span>
    </Button>
  )
}
