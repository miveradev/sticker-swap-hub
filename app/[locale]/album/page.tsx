import { headers } from "next/headers"
import { getTranslations, getLocale } from "next-intl/server"
import Link from "next/link"
import { AlbumContent } from "@/components/album/AlbumContent"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { UserMenu } from "@/components/profile/UserMenu"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeftRight } from "lucide-react"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton"
import { getAlbum } from "@/lib/albums/getAlbum"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function AlbumPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string }>
}) {
  const [{ user: targetUsername }, t, tApp, h, locale] = await Promise.all([
    searchParams,
    getTranslations("album"),
    getTranslations("app"),
    headers(),
    getLocale(),
  ])

  const session = await auth.api.getSession({ headers: h as unknown as Headers })
  const viewer = session?.user ?? null
  const viewerId = viewer?.id

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

  // Mode 3: read-only view of another user's collection
  let albumUserId = viewerId
  let readOnly = false
  let targetUser: { id: string; name: string; username: string | null; image: string | null } | null = null

  if (targetUsername) {
    targetUser = await prisma.user.findUnique({
      where: { username: targetUsername },
      select: { id: true, name: true, username: true, image: true },
    })
    if (targetUser) {
      albumUserId = targetUser.id
      readOnly = true
    }
  }

  // Identity of whoever's album is being shown — null for guests
  const albumOwner = viewer
    ? readOnly && targetUser
      ? { name: targetUser.name, username: targetUser.username, image: targetUser.image }
      : { name: viewer.name, username: viewerUsername, image: viewerImage }
    : null

  const album = await getAlbum(albumUserId)

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Top bar */}
      <header className="bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <a href={`/${locale}`} className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
            <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
            <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">
              {tApp("name")}
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

      {/* Main content */}
      <main className="flex-grow pt-24 pb-8 px-4 max-w-2xl mx-auto w-full flex flex-col">
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-display text-xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <img src="/wc2026_white.svg" alt="" aria-hidden="true" width={28} height={28} className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 opacity-80" />
            {album.name}
          </h1>
          {albumOwner && (
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end sm:gap-6 shrink-0">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 border-2 border-primary">
                  {albumOwner.image && <AvatarImage src={albumOwner.image} alt={albumOwner.username ?? albumOwner.name} />}
                  <AvatarFallback className="text-xs font-semibold">
                    {albumOwner.name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold text-foreground">
                  {albumOwner.username ?? albumOwner.name}
                </span>
              </div>
              {readOnly && (
                <a href={`/${locale}/album`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {t("viewMyAlbum")}
                </a>
              )}
            </div>
          )}
        </section>

        <AlbumContent
          sections={album.sections}
          totalStickers={album.totalStickers}
          isGuest={!viewer}
          readOnly={readOnly}
        />
      </main>

      <ScrollToTopButton />
      <ProfileNav username={viewerUsername} activePage="album" />
    </div>
  )
}
