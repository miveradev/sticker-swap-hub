import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UsernameForm } from "@/components/onboarding/UsernameForm"
import { LayoutGrid } from "lucide-react"

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-foreground" />
            <span className="text-base font-bold tracking-tight text-foreground">
              Sticker Swap Hub
            </span>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Choose your username</h1>
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
