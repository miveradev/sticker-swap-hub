"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { UserMenu } from "@/components/profile/UserMenu"
import { authClient } from "@/lib/auth-client"

type Viewer = {
  name: string
  email: string
  image: string | null
  username: string | null
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")
}

export function Header() {
  const t = useTranslations("landing.header")
  const locale = useLocale()
  const [viewer, setViewer] = useState<Viewer | null>(null)

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data?.user) return
      const u = data.user as Record<string, unknown>
      setViewer({
        name: data.user.name,
        email: (u.email as string) ?? "",
        image: (u.image as string | null) ?? null,
        username: (u.username as string | null) ?? null,
      })
    })
  }, [])

  async function handleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border h-16 flex items-center">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 w-full">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">{t("brand")}</span>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.album")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.features")}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors duration-200"
          >
            {t("nav.compare")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {viewer ? (
            <UserMenu
              name={viewer.name}
              email={viewer.email}
              image={viewer.image}
              initials={getInitials(viewer.name)}
              username={viewer.username}
            />
          ) : (
            <Button size="sm" onClick={handleLogin}>{t("cta")}</Button>
          )}
        </div>
      </div>
    </header>
  )
}
