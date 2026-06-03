"use client"

import { useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { StickerCard } from "@/components/album/StickerCard"
import type { SectionData } from "@/lib/albums/getAlbum"

interface AlbumSectionProps {
  section: SectionData
  isGuest?: boolean
}

export function AlbumSection({ section, isGuest = false }: AlbumSectionProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(section.stickers.map((s) => [s.code, s.quantity]))
  )

  function handleAdd(code: string) {
    setQuantities((prev) => ({ ...prev, [code]: prev[code] + 1 }))
  }

  function handleRemove(code: string) {
    setQuantities((prev) => ({ ...prev, [code]: Math.max(0, prev[code] - 1) }))
  }

  function handleReset(code: string) {
    setQuantities((prev) => ({ ...prev, [code]: 0 }))
  }

  const ownedCount = isGuest ? 0 : Object.values(quantities).filter((q) => q > 0).length
  const total = section.stickers.length

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4 border-b border-border pb-1">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          {section.countryCode && (
            <ReactCountryFlag
              countryCode={section.countryCode}
              svg
              style={{ width: "1.4em", height: "1.4em" }}
            />
          )}
          {section.name}
        </h2>
        <span className="text-xs text-muted-foreground bg-card border border-border px-3 py-1 rounded-full tabular-nums">
          {ownedCount} / {total}
        </span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
        {section.stickers.map((sticker) => (
          <StickerCard
            key={sticker.code}
            code={sticker.code}
            name={sticker.name}
            quantity={isGuest ? 0 : quantities[sticker.code]}
            onAdd={() => handleAdd(sticker.code)}
            onRemove={() => handleRemove(sticker.code)}
            onReset={() => handleReset(sticker.code)}
            interactive={!isGuest}
          />
        ))}
      </div>
    </section>
  )
}
