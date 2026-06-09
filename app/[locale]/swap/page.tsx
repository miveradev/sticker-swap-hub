import { headers } from "next/headers"
import { getTranslations, getLocale } from "next-intl/server"
import { ArrowLeftRight, Lightbulb } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getCollectionComparison } from "@/lib/profile/getCollectionComparison"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { UserMenu } from "@/components/profile/UserMenu"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton"
import { SwapUserSelector } from "@/components/swap/SwapUserSelector"
import { SwapTradeSummary } from "@/components/swap/SwapTradeSummary"
import { SwapTradeSection } from "@/components/swap/SwapTradeSection"

export default async function SwapPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string }>
}) {
  const [{ user: targetUsername }, t, tApp, h, locale] = await Promise.all([
    searchParams,
    getTranslations("swap"),
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

  const currentUser = viewer
    ? { name: viewer.name, username: viewerUsername, image: viewerImage }
    : null

  // Resolve target user and comparison data
  let targetUser: { id: string; name: string; username: string | null; image: string | null } | null = null
  let comparison: Awaited<ReturnType<typeof getCollectionComparison>> | null = null

  if (targetUsername && viewer) {
    targetUser = await prisma.user.findUnique({
      where: { username: targetUsername },
      select: { id: true, name: true, username: true, image: true },
    })

    if (targetUser) {
      comparison = await getCollectionComparison(viewer.id, targetUser.id)
    }
  }

  const compareWithUser = targetUser
    ? { name: targetUser.name, username: targetUser.username, image: targetUser.image }
    : null

  const summary = comparison
    ? {
        canReceive: comparison.canReceive.reduce((n, s) => n + s.stickers.length, 0),
        canGive: comparison.canGive.reduce((n, s) => n + s.stickers.length, 0),
        get mutual() { return Math.min(this.canReceive, this.canGive) },
      }
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
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        {/* User selector */}
        <SwapUserSelector currentUser={currentUser} compareWithUser={compareWithUser} />

        {comparison && summary && (
          <>
            {/* Trade summary */}
            <SwapTradeSummary
              canReceive={summary.canReceive}
              canGive={summary.canGive}
              mutual={summary.mutual}
            />

            {/* Trade insight */}
            <div className="bg-primary/5 border border-primary/15 rounded p-4 md:p-5 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.rich("insight", {
                  receive: summary.canReceive,
                  give: summary.canGive,
                  mutual: summary.mutual,
                  strong: (chunks) => <strong className="text-foreground font-medium">{chunks}</strong>,
                })}
              </p>
            </div>

            {/* Sticker sections */}
            <div className="flex flex-col gap-16 pt-6 border-t border-border">
              <SwapTradeSection
                type="receive"
                sections={comparison.canReceive}
                compareUsername={compareWithUser?.username ?? compareWithUser?.name ?? ""}
              />
              <div className="border-t border-border pt-6">
                <SwapTradeSection
                  type="give"
                  sections={comparison.canGive}
                  compareUsername={compareWithUser?.username ?? compareWithUser?.name ?? ""}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <ProfileNav activePage="trade" username={viewerUsername} />
      <ScrollToTopButton />
    </div>
  )
}
