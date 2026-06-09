"use client"

import { useTranslations } from "next-intl"
import { ArrowLeftRight, ArrowUp, ArrowDown, Handshake, ChevronDown } from "lucide-react"
import ReactCountryFlag from "react-country-flag"

const MOCK_CURRENT = { username: "miveradev", initials: "MV" }
const MOCK_COMPARE = { username: "noellelalalala", initials: "NL" }

const MOCK_RECEIVE_SECTIONS = [
  {
    id: "esp",
    countryCode: "ES",
    name: "Spain",
    stickers: [
      { code: "ESP 1",  name: "Spain Badge",   count: 2 },
      { code: "ESP 5",  name: "Dean Huijsen",  count: 3 },
      { code: "ESP 11", name: "Pedri",         count: 2 },
      { code: "ESP 15", name: "Lamine Yamal",  count: 2 },
    ],
  },
  {
    id: "bra",
    countryCode: "BR",
    name: "Brazil",
    stickers: [
      { code: "BRA 2",  name: "Alisson",          count: 2 },
      { code: "BRA 14", name: "Vinícius Júnior",  count: 3 },
    ],
  },
]

const MOCK_GIVE_SECTIONS = [
  {
    id: "ger",
    countryCode: "DE",
    name: "Germany",
    stickers: [
      { code: "GER 6",  name: "Antonio Rüdiger", count: 2 },
      { code: "GER 17", name: "Kai Havertz",     count: 3 },
      { code: "GER 19", name: "Karim Adeyemi",   count: 2 },
    ],
  },
  {
    id: "fra",
    countryCode: "FR",
    name: "France",
    stickers: [
      { code: "FRA 4",  name: "William Saliba", count: 2 },
      { code: "FRA 20", name: "Kylian Mbappé",  count: 2 },
    ],
  },
]

export function ComparisonShowcase() {
  const t = useTranslations("landing.comparisonShowcase")
  const tSwap = useTranslations("swap")

  return (
    <section id="comparison" className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-10 items-center w-full">

        {/* Section header */}
        <div className="flex flex-col gap-3 text-center max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Mock swap UI — max-w-2xl matches real /swap page */}
        <div className="w-full max-w-2xl flex flex-col gap-6">

          {/* User selector */}
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 md:justify-between">
            {/* Current user */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-card flex items-center justify-center font-mono text-sm font-bold text-primary shrink-0">
                {MOCK_CURRENT.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {tSwap("currentUser")}
                </span>
                <span className="text-base font-semibold text-foreground">{MOCK_CURRENT.username}</span>
              </div>
            </div>

            {/* Center icon — desktop */}
            <div className="hidden md:flex bg-primary/10 border border-primary/40 rounded-full p-2 shrink-0">
              <ArrowLeftRight className="w-5 h-5 text-primary -rotate-12" strokeWidth={2.5} />
            </div>
            {/* Divider — mobile */}
            <div className="w-full h-px bg-border block md:hidden" />

            {/* Compare with mock dropdown */}
            <div className="flex items-center justify-between gap-4 w-full md:w-auto bg-background border border-border rounded-lg p-3 select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-card flex items-center justify-center font-mono text-xs font-bold text-primary shrink-0">
                  {MOCK_COMPARE.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {tSwap("compareWith")}
                  </span>
                  <span className="text-base font-semibold text-foreground">{MOCK_COMPARE.username}</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded overflow-hidden">
              <div className="p-4 flex flex-col gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">
                  {tSwap("summary.canReceive")}
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-4xl font-black italic text-primary leading-none">6</span>
                  <ArrowUp className="w-5 h-5 text-primary shrink-0" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded overflow-hidden">
              <div className="p-4 flex flex-col gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase text-center">
                  {tSwap("summary.canGive")}
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-4xl font-black italic text-foreground leading-none">5</span>
                  <ArrowDown className="w-5 h-5 text-foreground shrink-0" />
                </div>
              </div>
            </div>

            <div className="bg-primary border border-primary rounded overflow-hidden">
              <div className="p-4 flex flex-col gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[#0B141C] uppercase text-center">
                  {tSwap("summary.mutual")}
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-4xl font-black italic text-[#0B141C] leading-none">5</span>
                  <Handshake className="w-5 h-5 text-[#0B141C] shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* You Can Receive section */}
          <div className="flex flex-col gap-6 pt-6 border-t border-border">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {tSwap("sections.receive.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                Stickers duplicated by{" "}
                <strong className="text-foreground font-semibold">{MOCK_COMPARE.username}</strong>{" "}
                that you still need.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {MOCK_RECEIVE_SECTIONS.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center mb-4 border-b border-border pb-2">
                    <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={section.countryCode}
                        svg
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
                      {section.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                    {section.stickers.map((sticker) => (
                      <div key={sticker.code} className="relative select-none group">
                        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground font-mono text-[9px] md:text-[11px] w-5 h-5 md:w-6 md:h-6 rounded-full font-bold flex items-center justify-center z-10 shadow-[0_0_8px_rgba(163,230,53,0.35)]">
                          {sticker.count}
                        </div>
                        <div className="bg-card border border-border rounded overflow-hidden aspect-square flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105 cursor-default">
                          <p className="font-mono text-[13px] sm:text-[15px] font-bold text-foreground leading-none">
                            {sticker.code}
                          </p>
                          <p className="text-[8px] sm:text-[11px] text-muted-foreground mt-0.5 px-1 leading-tight">
                            {sticker.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You Can Give section */}
          <div className="flex flex-col gap-6 pt-6 border-t border-border">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {tSwap("sections.give.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                Stickers duplicated by you that{" "}
                <strong className="text-foreground font-semibold">{MOCK_COMPARE.username}</strong>{" "}
                still needs.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {MOCK_GIVE_SECTIONS.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center mb-4 border-b border-border pb-2">
                    <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={section.countryCode}
                        svg
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
                      {section.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                    {section.stickers.map((sticker) => (
                      <div key={sticker.code} className="relative select-none group">
                        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground font-mono text-[9px] md:text-[11px] w-5 h-5 md:w-6 md:h-6 rounded-full font-bold flex items-center justify-center z-10 shadow-[0_0_8px_rgba(163,230,53,0.35)]">
                          {sticker.count}
                        </div>
                        <div className="bg-card border border-border rounded overflow-hidden aspect-square flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105 cursor-default">
                          <p className="font-mono text-[13px] sm:text-[15px] font-bold text-foreground leading-none">
                            {sticker.code}
                          </p>
                          <p className="text-[8px] sm:text-[11px] text-muted-foreground mt-0.5 px-1 leading-tight">
                            {sticker.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
