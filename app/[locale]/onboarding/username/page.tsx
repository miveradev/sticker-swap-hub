import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { getTranslations } from "next-intl/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UsernameForm } from "@/components/onboarding/UsernameForm"
import { ArrowLeftRight } from "lucide-react"

export default async function OnboardingUsernamePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const h = await headers()

  const session = await auth.api.getSession({ headers: h as unknown as Headers })

  if (!session?.user) {
    redirect(`/${locale}`)
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  })

  if (user?.username) {
    redirect(`/${locale}/u/${user.username}`)
  }

  const tApp = await getTranslations("app")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-1.5 transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">
            <ArrowLeftRight className="w-7 h-7 text-primary shrink-0 -rotate-12" strokeWidth={2.5} />
            <span className="font-display text-sm sm:text-lg font-black text-primary italic leading-none">
              {tApp("name")}
            </span>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="font-display text-2xl font-extrabold tracking-tight">Choose your username</h1>
            <p className="text-sm text-muted-foreground">
              This will be your public identity in the app.
            </p>
          </div>
        </div>

        <UsernameForm locale={locale} />
      </div>
    </div>
  )
}
