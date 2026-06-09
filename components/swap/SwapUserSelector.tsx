import { getTranslations, getLocale } from "next-intl/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeftRight } from "lucide-react"
import { SwapUserSearch } from "@/components/swap/SwapUserSearch"

type SwapUser = {
  name: string
  username: string | null
  image: string | null
}

interface SwapUserSelectorProps {
  currentUser: SwapUser | null
  compareWithUser: SwapUser | null
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("")
}

export async function SwapUserSelector({ currentUser, compareWithUser }: SwapUserSelectorProps) {
  const [t, locale] = await Promise.all([getTranslations("swap"), getLocale()])

  return (
    <section className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 md:justify-between">
      {/* Current user */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Avatar className="w-12 h-12 border-2 border-primary shrink-0">
          {currentUser?.image && (
            <AvatarImage src={currentUser.image} alt={currentUser.username ?? currentUser.name} />
          )}
          <AvatarFallback className="text-sm font-semibold">
            {currentUser ? initials(currentUser.name) : "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            {t("currentUser")}
          </span>
          <span className="text-base font-semibold text-foreground">
            {currentUser?.username ?? currentUser?.name ?? "—"}
          </span>
        </div>
      </div>

      {/* Swap icon — desktop only */}
      <div className="hidden md:flex bg-primary/10 border border-primary/40 rounded-full p-2 shrink-0">
        <ArrowLeftRight className="w-5 h-5 text-primary -rotate-12" strokeWidth={2.5} />
      </div>

      {/* Divider — mobile only */}
      <div className="w-full h-px bg-border block md:hidden" />

      {/* Compare-with — interactive search */}
      <SwapUserSearch
        compareWithUser={compareWithUser}
        compareWithLabel={t("compareWith")}
        locale={locale}
      />
    </section>
  )
}
