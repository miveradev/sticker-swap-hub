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
    { icon: ArrowLeftRight, labelKey: "trade" as const, href: `/${locale}/swap` },
    { icon: Users, labelKey: "social" as const, href: `/${locale}/social` },
    { icon: User, labelKey: "profile" as const, href: username ? `/${locale}/u/${username}` : "#" },
  ]

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-t border-border fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="lg:max-w-md lg:mx-auto flex justify-around items-center h-20 px-2">
        {navItems.map(({ icon: Icon, labelKey, href }) => (
          <a
            key={labelKey}
            href={href}
            className={[
              "flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-200 w-16 rounded py-2",
              activePage === labelKey
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="w-5 h-5" />
            <span className="font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">{t(labelKey)}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
