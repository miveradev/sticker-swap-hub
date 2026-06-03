import { headers } from "next/headers"
import { getTranslations } from "next-intl/server"
import { AlbumProgressCard } from "@/components/album/AlbumProgressCard"
import { AlbumGuestCTA } from "@/components/album/AlbumGuestCTA"
import { AlbumSection } from "@/components/album/AlbumSection"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { UserMenu } from "@/components/profile/UserMenu"
import { HeaderLoginButton } from "@/components/profile/HeaderLoginButton"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { getAlbum } from "@/lib/albums/getAlbum"
import { auth } from "@/lib/auth"

export default async function AlbumPage() {
  const [t, h] = await Promise.all([getTranslations("album"), headers()])

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
          <span className="text-lg font-bold tracking-tighter text-foreground">
            Sticker Swap Hub
          </span>
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

        <section className="mb-16">
          {viewer ? (
            <AlbumProgressCard owned={0} total={album.totalStickers} />
          ) : (
            <AlbumGuestCTA />
          )}
        </section>

        {album.sections.map((section) => (
          <AlbumSection key={section.id} section={section} isGuest={!viewer} />
        ))}
      </main>

      <ProfileNav />
    </div>
  )
}
