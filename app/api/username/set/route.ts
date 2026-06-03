import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { isValidUsername } from "@/lib/username"

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as { username?: string }
  const { username } = body

  if (!username || !isValidUsername(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  })

  if (existing && existing.id !== session.user.id) {
    return NextResponse.json({ error: "Username taken" }, { status: 409 })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  })

  return NextResponse.json({ username })
}
