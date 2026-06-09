"use client"

import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlbumProgressCard } from "@/components/album/AlbumProgressCard"
import { StickerCard } from "@/components/album/StickerCard"
import { authClient } from "@/lib/auth-client"

const HERO_STICKERS = [
  { code: "ESP 1",  name: "Spain Badge",       qty: 1 },
  { code: "ESP 2",  name: "Unai Simón",        qty: 0 },
  { code: "ESP 3",  name: "R. Le Normand",     qty: 2 },
  { code: "ESP 4",  name: "Aymeric Laporte",   qty: 1 },
  { code: "ESP 5",  name: "Dean Huijsen",      qty: 0 },
  { code: "ESP 6",  name: "Pedro Porro",       qty: 1 },
  { code: "ESP 7",  name: "Dani Carvajal",     qty: 0 },
  { code: "ESP 8",  name: "Marc Cucurella",    qty: 3 },
  { code: "ESP 9",  name: "M. Zubimendi",      qty: 0 },
  { code: "ESP 10", name: "Rodri",             qty: 1 },
]

const noop = () => {}

export function Hero() {
  const t = useTranslations("landing.hero")
  const locale = useLocale()
  const router = useRouter()

  async function handleStartTracking() {
    const { data } = await authClient.getSession()
    if (data?.user) {
      router.push(`/${locale}/onboarding/username`)
      return
    }
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  const ownedCount = HERO_STICKERS.filter((s) => s.qty > 0).length

  return (
    <section className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Text column */}
      <div className="flex-1 flex flex-col gap-6 items-start">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-primary">
            FIFA World Cup 2026
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          {t("title")}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={handleStartTracking}>
            {t("ctaPrimary")}
          </Button>
          <a href={`/${locale}/album`} className={buttonVariants({ variant: "outline", size: "lg" })}>
            {t("ctaSecondary")}
          </a>
        </div>
      </div>

      {/* App mock */}
      <div className="flex-1 w-full relative">
        {/* Depth layers */}
        <div className="absolute inset-0 bg-accent/40 rounded rotate-2 scale-[1.02] opacity-40" />
        <div className="absolute inset-0 bg-card rounded rotate-1 scale-[1.01] border border-border/40 opacity-70" />

        {/* Front card — album content */}
        <div className="relative bg-card border border-border rounded shadow-xl z-10 p-5 flex flex-col gap-4 select-none pointer-events-none">

          {/* Album title — matches /album page */}
          <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <img
              src="/wc2026_white.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="shrink-0 w-6 h-6 opacity-80"
            />
            FIFA World Cup 2026
          </h2>

          {/* Progress card */}
          <AlbumProgressCard owned={142} total={980} />

          {/* Section header — matches AlbumSection */}
          <div className="flex justify-between items-center border-b border-border pb-2">
            <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
              <ReactCountryFlag countryCode="ES" svg style={{ width: "1.3em", height: "1.3em" }} />
              Spain
            </h3>
            <span className={`font-mono text-xs bg-card px-2.5 py-0.5 rounded tabular-nums select-none border text-muted-foreground border-border`}>
              {ownedCount} / {HERO_STICKERS.length}
            </span>
          </div>

          {/* Sticker grid — real StickerCard components */}
          <div className="grid grid-cols-5 gap-2">
            {HERO_STICKERS.map((s) => (
              <StickerCard
                key={s.code}
                code={s.code}
                name={s.name}
                quantity={s.qty}
                onAdd={noop}
                onRemove={noop}
                onReset={noop}
                interactive={false}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
