import { getTranslations, getLocale } from "next-intl/server"
import { BookOpen, ArrowLeftRight, Users, User } from "lucide-react"

type ActivePage = "album" | "trade" | "social" | "profile"

export async function ProfileNav({
  username,
  activePage,
}: { username?: string | null; activePage?: ActivePage } = {}) {
  if (!username) return null

  const [t, locale] = await Promise.all([getTranslations("profile.nav"), getLocale()])

  const navItems = [
    { icon: BookOpen, labelKey: "album" as const, href: `/${locale}/album` },
    { icon: ArrowLeftRight, labelKey: "trade" as const, href: "#" },
    { icon: Users, labelKey: "social" as const, href: "#" },
    { icon: User, labelKey: "profile" as const, href: username ? `/${locale}/u/${username}` : "#" },
  ]

  return (
    <nav className="bg-card border-t border-border fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom)] shadow-xl">
      <div className="lg:max-w-md lg:mx-auto flex justify-around items-center h-20 px-2">
        {navItems.map(({ icon: Icon, labelKey, href }) => (
          <a
            key={labelKey}
            href={href}
            className={[
              "flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-200 w-16",
              activePage === labelKey
                ? "bg-muted text-foreground rounded-xl px-4 py-1"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-widest">{t(labelKey)}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
