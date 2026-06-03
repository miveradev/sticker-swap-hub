import { ChevronsUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderProps {
  username: string
  name: string
  image: string | null
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("")
}

export function ProfileHeader({ username, name, image }: ProfileHeaderProps) {
  const initials = getInitials(name)

  return (
    <>
      {/* Profile Identity */}
      <section className="flex flex-col items-center gap-2">
        <Avatar className="w-24 h-24 border-2 border-zinc-800 shadow-lg mb-2">
          {image && <AvatarImage src={image} alt={username} />}
          <AvatarFallback className="text-2xl font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-[32px] leading-10 font-semibold tracking-tight text-foreground">
          {username}
        </h1>
        <div className="bg-card border border-border rounded-full px-3 py-1 flex items-center gap-1">
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            España 🇪🇸
          </span>
        </div>
      </section>

      {/* Active Album */}
      <section className="mb-4">
        <label className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
          Active Album
        </label>
        <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">FIFA World Cup 2026</span>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </section>
    </>
  )
}
