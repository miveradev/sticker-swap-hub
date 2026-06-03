import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { getTranslations } from "next-intl/server"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { ShareButton } from "@/components/profile/ShareButton"
import { TopDuplicates } from "@/components/profile/TopDuplicates"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { ProfileGuestCTA } from "@/components/profile/ProfileGuestCTA"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; username: string }>
}) {
  const { username } = await params
  const h = await headers()
  const t = await getTranslations("profile")

  const user = await prisma.user.findUnique({
    where: { username },
    select: { name: true, image: true, username: true },
  })

  if (!user) notFound()

  const session = await auth.api.getSession({ headers: h as unknown as Headers })
  const viewer = session?.user ?? null
  const viewerInitials = viewer?.name
    ? viewer.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? "")
        .join("")
    : "?"
  const viewerImage =
    viewer ? ((viewer as Record<string, unknown>).image as string | null ?? null) : null

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* TopAppBar — background spans full width, content is centered on lg+ */}
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 lg:max-w-md lg:mx-auto">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-foreground" />
            <span className="text-lg font-bold tracking-tighter text-foreground">
              {t("brand")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {viewer ? (
              <Avatar className="w-8 h-8 border border-border">
                {viewerImage && <AvatarImage src={viewerImage} alt="Your avatar" />}
                <AvatarFallback className="text-[10px] font-semibold">{viewerInitials}</AvatarFallback>
              </Avatar>
            ) : (
              <HeaderLoginButton />
            )}
          </div>
        </div>
      </header>

      {/* Main Content — centered on lg+ */}
      <main className="flex-grow pt-24 px-4 flex flex-col gap-8 lg:max-w-md lg:mx-auto lg:w-full">
        <ProfileHeader
          username={user.username!}
          name={user.name}
          image={user.image ?? null}
          showAlbum={!!viewer}
        />
        {viewer ? (
          <>
            <ProfileStats />
            <ShareButton username={user.username!} />
            <TopDuplicates />
            <div className="pb-8 pt-2">
              <Button
                variant="outline"
                className="w-full rounded-lg py-3 px-4 text-xs font-medium tracking-wide h-auto"
              >
                {t("viewFullAlbum")}
              </Button>
            </div>
          </>
        ) : (
          <div className="pb-8">
            <ProfileGuestCTA username={user.username!} />
          </div>
        )}
      </main>

      <ProfileNav />
    </div>
  )
}
