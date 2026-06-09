"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ArrowLeftRight } from "lucide-react"
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

interface HeaderProps {
  initialViewer?: Viewer | null
}

export function Header({ initialViewer = null }: HeaderProps) {
  const t = useTranslations("landing.header")
  const locale = useLocale()
  const [viewer] = useState<Viewer | null>(initialViewer)

  async function handleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border h-16 flex items-center">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 w-full">
        <a href={`/${locale}`} className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
          <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
          <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">{t("brand")}</span>
        </a>
        <nav className="hidden md:flex gap-10 items-center">
          <a href={`/${locale}/album`} className="font-mono text-xs tracking-[0.08em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase">
            {t("nav.album")}
          </a>
          <a href="#features" className="font-mono text-xs tracking-[0.08em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase">
            {t("nav.features")}
          </a>
          <a href="#comparison" className="font-mono text-xs tracking-[0.08em] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase">
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
