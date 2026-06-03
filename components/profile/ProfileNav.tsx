import { BookOpen, ArrowLeftRight, Users, User } from "lucide-react"

const navItems = [
  { icon: BookOpen, label: "Album", href: "#", active: false },
  { icon: ArrowLeftRight, label: "Trade", href: "#", active: false },
  { icon: Users, label: "Social", href: "#", active: false },
  { icon: User, label: "Profile", href: "#", active: true },
] as const

export function ProfileNav() {
  return (
    <nav className="bg-card border-t border-border fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-2 pb-[env(safe-area-inset-bottom)] shadow-xl">
      {navItems.map(({ icon: Icon, label, href, active }) => (
        <a
          key={label}
          href={href}
          className={[
            "flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-200 w-16",
            active
              ? "bg-muted text-foreground rounded-xl px-4 py-1"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-widest">{label}</span>
        </a>
      ))}
    </nav>
  )
}
