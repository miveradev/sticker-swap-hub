import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { COUNTRIES } from "@/lib/countries"

const VALID_CODES = new Set(COUNTRIES.map((c) => c.code))

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as { country?: string }
  const { country } = body

  if (!country || !VALID_CODES.has(country)) {
    return NextResponse.json({ error: "Invalid country" }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { country },
  })

  return NextResponse.json({ country })
}
