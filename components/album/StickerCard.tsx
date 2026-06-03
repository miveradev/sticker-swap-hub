"use client"

import { useRef } from "react"
import { Minus, Plus } from "lucide-react"

const LONG_PRESS_MS = 500

interface StickerCardProps {
  code: string
  name: string
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onReset: () => void
  interactive?: boolean
}

export function StickerCard({ code, name, quantity, onAdd, onRemove, onReset, interactive = true }: StickerCardProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  function startLongPress() {
    didLongPress.current = false
    timerRef.current = setTimeout(() => {
      didLongPress.current = true
      onRemove()
    }, LONG_PRESS_MS)
  }

  function cancelLongPress() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function handleCardClick() {
    if (didLongPress.current) {
      didLongPress.current = false
      return
    }
    onAdd()
  }

  function stopButtonTouch(e: React.TouchEvent) {
    e.stopPropagation()
  }

  if (quantity === 0) {
    return (
      <div
        onClick={interactive ? onAdd : undefined}
        className={[
          "aspect-square bg-background border border-border/30 rounded-lg flex flex-col items-center justify-center opacity-40 py-1 transition-all duration-200 hover:opacity-70 hover:border-border hover:scale-105 select-none",
          interactive ? "cursor-pointer" : "cursor-default",
        ].join(" ")}
      >
        <span className="max-[430px]:text-[9px] text-[11px] sm:text-[14px] md:text-[13px] font-bold text-muted-foreground tracking-widest uppercase leading-none">
          {code}
        </span>
        <span className="max-[430px]:text-[7px] text-[8px] sm:text-[12px] md:text-[12px] text-muted-foreground mt-0.5 text-center px-1 break-words w-full leading-tight">
          {name}
        </span>
      </div>
    )
  }

  const isDuplicate = quantity > 1

  return (
    <div className="relative group">
      {/* Quantity badge — outside the card so overflow-hidden doesn't clip it */}
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-foreground text-background text-[8px] md:text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full z-10 font-bold flex items-center justify-center transition-transform duration-200 group-hover:scale-125 select-none">
        {quantity}
      </div>

      <div
        onClick={handleCardClick}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchCancel={cancelLongPress}
        onContextMenu={(e) => e.preventDefault()}
        className={[
          "aspect-square bg-card rounded-lg overflow-hidden flex flex-col transition-all duration-200 group-hover:scale-105 active:scale-95 select-none cursor-pointer",
          isDuplicate
            ? "border border-foreground/50 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
            : "border border-zinc-800",
        ].join(" ")}
      >
        {/* Reset button */}
        <button
          onClick={(e) => { e.stopPropagation(); onReset() }}
          onTouchStart={stopButtonTouch}
          className="absolute top-1.5 left-1.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-destructive bg-background/80 text-destructive flex items-center justify-center z-10 hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <Minus className="w-2 h-2 md:w-2.5 md:h-2.5" />
        </button>

        {/* Sticker info */}
        <div className="flex-1 p-0.5 flex flex-col items-center justify-center">
          <span className="max-[430px]:text-[9px] text-[14px] sm:text-[16px] md:text-[17px] text-foreground font-bold leading-none">{code}</span>
          <span className="max-[430px]:text-[5px] text-[8px] sm:text-[12px] md:text-[12px] text-muted-foreground mt-0.5 text-center px-1 break-words w-full leading-tight">
            {name}
          </span>
        </div>

        {/* Quantity controls */}
        <div
          className={[
            "flex items-center justify-between px-1 py-0.5 md:py-1",
            isDuplicate
              ? "bg-foreground text-background"
              : "bg-muted border-t border-border/20",
          ].join(" ")}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            onTouchStart={stopButtonTouch}
            className={[
              "flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full transition-colors cursor-pointer",
              isDuplicate
                ? "text-background hover:bg-black/20"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/10",
            ].join(" ")}
          >
            <Minus className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </button>
          <span className="text-[9px] md:text-[12px] font-bold">{quantity}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd() }}
            onTouchStart={stopButtonTouch}
            className={[
              "flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full transition-colors cursor-pointer",
              isDuplicate
                ? "text-background hover:bg-black/20"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/10",
            ].join(" ")}
          >
            <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
