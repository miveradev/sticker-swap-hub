"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Plus, Minus, Loader2 } from "lucide-react"
import ReactCountryFlag from "react-country-flag"
import { StickerCard } from "@/components/album/StickerCard"
import { updateStickerQuantity, bulkAddSectionStickers, bulkResetSectionStickers } from "@/app/actions/stickers"
import type { SectionData } from "@/lib/albums/getAlbum"

interface AlbumSectionProps {
  section: SectionData
  quantities: Record<string, number>
  onQuantityChange: (code: string, qty: number) => void
  isGuest?: boolean
  readOnly?: boolean
}

export function AlbumSection({ section, quantities, onQuantityChange, isGuest = false, readOnly = false }: AlbumSectionProps) {
  const t = useTranslations("album")
  const [bulking, setBulking] = useState(false)

  async function persist(stickerId: string, code: string, newQty: number) {
    const prevQty = quantities[code] ?? 0

    onQuantityChange(code, newQty) // optimistic — instant UI update

    const result = await updateStickerQuantity(stickerId, newQty)

    if ("error" in result) {
      onQuantityChange(code, prevQty) // rollback
      toast.error(t("errorUpdate"))
    }
  }

  function handleAdd(stickerId: string, code: string) {
    void persist(stickerId, code, (quantities[code] ?? 0) + 1)
  }

  function handleRemove(stickerId: string, code: string) {
    void persist(stickerId, code, Math.max(0, (quantities[code] ?? 0) - 1))
  }

  function handleReset(stickerId: string, code: string) {
    void persist(stickerId, code, 0)
  }

  async function handleBulkAdd() {
    if (bulking) return
    const missing = section.stickers.filter((s) => (quantities[s.code] ?? 0) === 0)
    if (missing.length === 0) return

    setBulking(true)
    missing.forEach((s) => onQuantityChange(s.code, 1))

    const result = await bulkAddSectionStickers(missing.map((s) => s.id))

    if ("error" in result) {
      missing.forEach((s) => onQuantityChange(s.code, 0))
      toast.error(t("errorUpdate"))
    }
    setBulking(false)
  }

  async function handleBulkReset() {
    if (bulking) return
    const owned = section.stickers.filter((s) => (quantities[s.code] ?? 0) > 0)
    if (owned.length === 0) return

    setBulking(true)
    const prev = Object.fromEntries(owned.map((s) => [s.code, quantities[s.code]]))
    owned.forEach((s) => onQuantityChange(s.code, 0))

    const result = await bulkResetSectionStickers(owned.map((s) => s.id))

    if ("error" in result) {
      owned.forEach((s) => onQuantityChange(s.code, prev[s.code] ?? 0))
      toast.error(t("errorUpdate"))
    }
    setBulking(false)
  }

  const ownedCount = isGuest ? 0 : Object.values(quantities).filter((q) => q > 0).length
  const total = section.stickers.length
  const allOwned = !isGuest && ownedCount === total

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-4 border-b border-border pb-1">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          {section.countryCode ? (
            <ReactCountryFlag
              countryCode={section.countryCode}
              svg
              style={{ width: "1.4em", height: "1.4em" }}
            />
          ) : (
            <img src="/wc2026_white.svg" alt="" aria-hidden="true" style={{ width: "1.4em", height: "1.4em" }} className="shrink-0" />
          )}
          {section.name}
        </h2>
        <div className="flex items-center gap-2">
          {!isGuest && !readOnly && (
            <button
              type="button"
              onClick={allOwned ? handleBulkReset : handleBulkAdd}
              disabled={bulking}
              className={`flex items-center justify-center w-6 h-6 rounded-full border bg-card transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                allOwned
                  ? "border-destructive/50 text-destructive hover:bg-destructive/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {bulking
                ? <Loader2 className="w-3 h-3 animate-spin" />
                : allOwned
                  ? <Minus className="w-3 h-3" />
                  : <Plus className="w-3 h-3" />
              }
            </button>
          )}
          <span className={`text-xs bg-card px-3 py-1 rounded-full tabular-nums select-none border ${allOwned ? "text-green-600 border-green-600/50" : "text-muted-foreground border-border"}`}>
            {ownedCount} / {total}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
        {section.stickers.map((sticker) => (
          <StickerCard
            key={sticker.code}
            code={sticker.code}
            name={sticker.name}
            quantity={isGuest && !readOnly ? 0 : quantities[sticker.code] ?? 0}
            onAdd={() => handleAdd(sticker.id, sticker.code)}
            onRemove={() => handleRemove(sticker.id, sticker.code)}
            onReset={() => handleReset(sticker.id, sticker.code)}
            interactive={!isGuest && !readOnly}
          />
        ))}
      </div>
    </section>
  )
}
