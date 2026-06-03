"use client"

import { useState } from "react"
import { AlbumProgressCard } from "@/components/album/AlbumProgressCard"
import { AlbumGuestCTA } from "@/components/album/AlbumGuestCTA"
import { AlbumSection } from "@/components/album/AlbumSection"
import type { SectionData } from "@/lib/albums/getAlbum"

interface AlbumContentProps {
  sections: SectionData[]
  totalStickers: number
  isGuest: boolean
}

export function AlbumContent({ sections, totalStickers, isGuest }: AlbumContentProps) {
  // Single source of truth for all sticker quantities across every section
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(
      sections.flatMap((s) => s.stickers.map((st) => [st.code, st.quantity]))
    )
  )

  const ownedCount = Object.values(quantities).filter((q) => q > 0).length

  function handleQuantityChange(code: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [code]: qty }))
  }

  return (
    <>
      <section className="mb-16">
        {isGuest ? (
          <AlbumGuestCTA />
        ) : (
          <AlbumProgressCard owned={ownedCount} total={totalStickers} />
        )}
      </section>

      {sections.map((section) => {
        const sectionQuantities = Object.fromEntries(
          section.stickers.map((s) => [s.code, quantities[s.code] ?? 0])
        )
        return (
          <AlbumSection
            key={section.id}
            section={section}
            quantities={sectionQuantities}
            onQuantityChange={handleQuantityChange}
            isGuest={isGuest}
          />
        )
      })}
    </>
  )
}
