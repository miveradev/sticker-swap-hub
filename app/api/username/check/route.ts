import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isValidUsername } from "@/lib/username"

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") ?? ""

  if (!isValidUsername(username)) {
    return NextResponse.json({ available: false })
  }

  const existing = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  })

  return NextResponse.json({ available: !existing })
}
