import { headers } from "next/headers"
import { getTranslations, getLocale } from "next-intl/server"
import { AlbumContent } from "@/components/album/AlbumContent"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { UserMenu } from "@/components/profile/UserMenu"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { LayoutGrid } from "lucide-react"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { getAlbum } from "@/lib/albums/getAlbum"
import { auth } from "@/lib/auth"

export default async function AlbumPage() {
  const [t, h, locale] = await Promise.all([getTranslations("album"), headers(), getLocale()])

  const session = await auth.api.getSession({ headers: h as unknown as Headers })
  const viewer = session?.user ?? null
  const viewerId = viewer?.id

  const album = await getAlbum(viewerId)

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
      {/* Top bar */}
      <header className="bg-background fixed top-0 w-full z-50 border-b border-border h-16">
        <div className="h-full flex justify-between items-center px-4 max-w-2xl mx-auto">
          <a href={`/${locale}`} className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-foreground" />
            <span className="text-lg font-bold tracking-tighter text-foreground">
              Sticker Swap Hub
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
        <section className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {album.name}
          </h1>
        </section>

        <AlbumContent
          sections={album.sections}
          totalStickers={album.totalStickers}
          isGuest={!viewer}
        />
      </main>

      <ProfileNav username={viewerUsername} activePage="album" />
    </div>
  )
}
