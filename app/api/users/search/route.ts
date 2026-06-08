import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? ""
  if (q.length === 0) return NextResponse.json([])

  const users = await prisma.user.findMany({
    where: {
      username: { contains: q, mode: "insensitive" },
    },
    select: { username: true, name: true, image: true },
    orderBy: { username: "asc" },
    take: 8,
  })

  return NextResponse.json(users)
}
