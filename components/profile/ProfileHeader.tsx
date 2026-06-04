import { getTranslations } from "next-intl/server"
import ReactCountryFlag from "react-country-flag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlbumSelector } from "@/components/profile/AlbumSelector"
import { EditUsernameButton } from "@/components/profile/EditUsernameButton"
import { EditCountryButton } from "@/components/profile/EditCountryButton"
import { getCountryName } from "@/lib/countries"

interface ProfileHeaderProps {
  username: string
  name: string
  image: string | null
  country: string | null
  showAlbum?: boolean
  isOwner?: boolean
  locale?: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")
}

export async function ProfileHeader({ username, name, image, country, showAlbum = true, isOwner = false, locale = "" }: ProfileHeaderProps) {
  const t = await getTranslations("profile")
  const initials = getInitials(name)
  const countryName = country ? getCountryName(country, locale) : null

  return (
    <>
      {/* Profile Identity */}
      <section className="flex flex-col items-center gap-2">
        <Avatar className="w-24 h-24 border-2 border-zinc-800 shadow-lg">
          {image && <AvatarImage src={image} alt={username} />}
          <AvatarFallback className="text-2xl font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <h1 className="text-[32px] leading-10 font-semibold tracking-tight text-foreground">
            {username}
          </h1>
          {isOwner && <EditUsernameButton currentUsername={username} locale={locale} />}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="bg-card border border-border rounded-full px-3 py-1 flex items-center gap-1.5">
            {country && countryName ? (
              <>
                <ReactCountryFlag countryCode={country} svg style={{ width: "1.1em", height: "1.1em" }} />
                <span className="text-xs font-medium tracking-wide text-muted-foreground">
                  {countryName}
                </span>
              </>
            ) : (
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                {isOwner ? "Set your country" : "No country"}
              </span>
            )}
          </div>
          {isOwner && <EditCountryButton currentCountry={country} locale={locale} />}
        </div>
      </section>

      {/* Active Album */}
      {showAlbum && <section className="mb-4">
        <label className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
          {t("activeAlbum")}
        </label>
        <AlbumSelector />
      </section>}
    </>
  )
}
