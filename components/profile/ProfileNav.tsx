import { getTranslations } from "next-intl/server"
import { BookOpen, ArrowLeftRight, Users, User } from "lucide-react"

export async function ProfileNav() {
  const t = await getTranslations("profile.nav")

  const navItems = [
    { icon: BookOpen, labelKey: "album" as const, href: "#", active: false },
    { icon: ArrowLeftRight, labelKey: "trade" as const, href: "#", active: false },
    { icon: Users, labelKey: "social" as const, href: "#", active: false },
    { icon: User, labelKey: "profile" as const, href: "#", active: true },
  ]

  return (
    <nav className="bg-card border-t border-border fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom)] shadow-xl">
      <div className="lg:max-w-md lg:mx-auto flex justify-around items-center h-20 px-2">
        {navItems.map(({ icon: Icon, labelKey, href, active }) => (
          <a
            key={labelKey}
            href={href}
            className={[
              "flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-200 w-16",
              active
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
