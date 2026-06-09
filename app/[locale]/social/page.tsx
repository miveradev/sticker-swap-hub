import { headers } from "next/headers"
import { getTranslations, getLocale } from "next-intl/server"
import { ArrowLeftRight } from "lucide-react"
import { auth } from "@/lib/auth"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { UserMenu } from "@/components/profile/UserMenu"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { SocialSearch } from "@/components/social/SocialSearch"

export default async function SocialPage() {
  const [t, tApp, h, locale] = await Promise.all([
    getTranslations("social"),
    getTranslations("app"),
    headers(),
    getLocale(),
  ])

  const session = await auth.api.getSession({ headers: h as unknown as Headers })
  const viewer = session?.user ?? null

  const viewerInitials = viewer?.name
    ? viewer.name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("")
    : "?"
  const viewerImage = viewer
    ? ((viewer as Record<string, unknown>).image as string | null ?? null)
    : null
  const viewerEmail = viewer
    ? ((viewer as Record<string, unknown>).email as string ?? "")
    : ""
  const viewerUsername = viewer
    ? ((viewer as Record<string, unknown>).username as string | null ?? null)
    : null

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Top bar */}
      <header className="bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <a href={`/${locale}`} className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
            <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
            <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">{tApp("name")}</span>
          </a>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {viewer ? (
              <UserMenu
                name={viewer.name}
                email={viewerEmail}
                image={viewerImage}
                initials={viewerInitials}
                username={viewerUsername}
              />
            ) : (
              <HeaderLoginButton />
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow pt-24 pb-8 px-4 max-w-2xl mx-auto w-full flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        <SocialSearch />
      </main>

      <ProfileNav activePage="social" username={viewerUsername} />
    </div>
  )
}
