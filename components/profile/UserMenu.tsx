"use client"

import { authClient } from "@/lib/auth-client"
import { useTranslations, useLocale } from "next-intl"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserMenuProps {
  name: string
  email: string
  image: string | null
  initials: string
  username: string | null
}

export function UserMenu({ name, email, image, initials, username }: UserMenuProps) {
  const t = useTranslations("profile.userMenu")
  const locale = useLocale()

  async function handleLogout() {
    await authClient.signOut()
    window.location.href = `/${locale}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full cursor-pointer transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <Avatar className="w-8 h-8 border border-border">
          {image && <AvatarImage src={image} alt={name} />}
          <AvatarFallback className="text-[10px] font-semibold">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <a
          href={username ? `/${locale}/u/${username}` : undefined}
          className="flex items-center gap-3 px-2 py-2 w-full rounded-md text-left transition-colors hover:bg-accent cursor-pointer"
        >
          <Avatar className="w-8 h-8 shrink-0 border border-border">
            {image && <AvatarImage src={image} alt={name} />}
            <AvatarFallback className="text-[10px] font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold truncate min-w-0">{username}</span>
        </a>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout} className="gap-2 cursor-pointer">
          <LogOut className="w-4 h-4" />
          {t("logOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
