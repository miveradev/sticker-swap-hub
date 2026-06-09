"use client"

import { useTranslations } from "next-intl"
import { ArrowLeftRight } from "lucide-react"

const STEPS = ["step1", "step2", "step3", "step4"] as const

export function HowItWorks() {
  const t = useTranslations("landing.howItWorks")

  return (
    <div className="w-full bg-card/40 border-y border-border/50 py-24">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-12">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto w-full relative">
          {/* Vertical connecting line */}
          <div className="hidden sm:block absolute left-8 top-8 bottom-8 w-px bg-border z-0" />

          <div className="flex flex-col gap-10 relative z-10">
            {STEPS.map((key, i) => (
              <div key={key} className="flex flex-col sm:flex-row gap-5 sm:items-start">
                <div className="w-16 h-16 rounded-xl bg-card border-2 border-primary flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md">
                  <span className="font-display text-xl font-black text-primary">{i + 1}</span>
                </div>
                <div className="bg-background border border-border p-6 rounded flex-grow">
                  <h3 className="font-display text-base font-bold text-foreground mb-1">{t(`${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`${key}.description`)}</p>
                </div>
              </div>
            ))}

            {/* Final step — primary filled */}
            <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-md shadow-primary/20">
                <ArrowLeftRight className="w-6 h-6 text-primary-foreground -rotate-12" strokeWidth={2.5} />
              </div>
              <div className="bg-background border border-border p-6 rounded flex-grow">
                <h3 className="font-display text-base font-bold text-foreground mb-1">{t("step5.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("step5.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
