import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { ShareButton } from "@/components/profile/ShareButton"
import { TopDuplicates } from "@/components/profile/TopDuplicates"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { ProfileGuestCTA } from "@/components/profile/ProfileGuestCTA"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { UserMenu } from "@/components/profile/UserMenu"
import { LogOutButton } from "@/components/profile/LogOutButton"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { getProfileData } from "@/lib/profile/getProfileData"
import { auth } from "@/lib/auth"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string }>
}) {
  const { username, locale } = await params
  const h = await headers()

  const [profileData, session, t] = await Promise.all([
    getProfileData(username),
    auth.api.getSession({ headers: h as unknown as Headers }),
    getTranslations("profile"),
  ])

  if (!profileData) notFound()

  const { user, stats, topDuplicates } = profileData
  const viewer = session?.user ?? null
  const viewerInitials = viewer?.name
    ? viewer.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? "")
        .join("")
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
      {/* TopAppBar — background spans full width, content is centered on lg+ */}
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <a href={`/${locale}`} className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-foreground" />
            <span className="text-lg font-bold tracking-tighter text-foreground">
              {t("brand")}
            </span>
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

      {/* Main Content — centered on lg+ */}
      <main className="flex-grow pt-24 px-4 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        <ProfileHeader
          username={user.username}
          name={user.name}
          image={user.image}
          country={user.country}
          showAlbum={!!viewer}
          isOwner={viewerUsername === user.username}
          locale={locale}
        />
        {viewer ? (
          <>
            <ProfileStats stats={stats} />
            <ShareButton username={user.username} />
            <TopDuplicates duplicates={topDuplicates} />
            <div className="flex flex-col gap-3 pb-8 pt-2">
              <Button
                variant="outline"
                className="w-full rounded-lg py-3 px-4 text-xs font-medium tracking-wide h-auto"
                render={<Link href={`/${locale}/album`} />}
                nativeButton={false}
              >
                {t("viewFullAlbum")}
              </Button>
              <LogOutButton />
            </div>
          </>
        ) : (
          <div className="pb-8">
            <ProfileGuestCTA username={user.username} />
          </div>
        )}
      </main>

      <ProfileNav username={viewerUsername} activePage="profile" />
    </div>
  )
}
