"use client"

import { ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

const ALBUMS = [
  { id: "wc2026", name: "FIFA World Cup 2026" },
]

export function AlbumSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full bg-card border border-border rounded px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-accent hover:border-primary/30 transition-all duration-150 outline-none">
        <div className="flex items-center gap-3">
          <img src="/wc2026_white.svg" alt="" aria-hidden="true" width={20} height={20} className="shrink-0 opacity-80" />
          <span className="font-display text-sm font-bold text-foreground">FIFA World Cup 2026</span>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="bottom" sideOffset={4}>
        <DropdownMenuRadioGroup value="wc2026">
          {ALBUMS.map((album) => (
            <DropdownMenuRadioItem key={album.id} value={album.id}>
              <img src="/wc2026_white.svg" alt="" aria-hidden="true" width={16} height={16} className="shrink-0 ml-1 mr-1.5 opacity-80" />
              {album.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
