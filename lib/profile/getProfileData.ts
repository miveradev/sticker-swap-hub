import { prisma } from "@/lib/prisma"

export type ProfileStats = {
  completion: number
  owned: number
  duplicates: number
}

export type TopDuplicate = {
  code: string
  name: string
  count: number
}

export type ProfileData = {
  user: {
    id: string
    username: string
    name: string
    image: string | null
  }
  stats: ProfileStats
  topDuplicates: TopDuplicate[]
}

export async function getProfileData(username: string): Promise<ProfileData | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, name: true, image: true, username: true },
  })

  if (!user) return null

  const [ownedCount, quantityAgg, totalStickers, rawTopDuplicates] = await Promise.all([
    prisma.userSticker.count({
      where: { userId: user.id },
    }),
    prisma.userSticker.aggregate({
      where: { userId: user.id },
      _sum: { quantity: true },
    }),
    prisma.sticker.count({
      where: { album: { isActive: true } },
    }),
    prisma.userSticker.findMany({
      where: { userId: user.id, quantity: { gt: 1 } },
      orderBy: { quantity: "desc" },
      take: 10,
      select: {
        quantity: true,
        sticker: { select: { code: true, name: true } },
      },
    }),
  ])

  const owned = ownedCount
  const duplicates = (quantityAgg._sum.quantity ?? 0) - owned
  const completion = totalStickers > 0 ? Math.round((owned / totalStickers) * 100) : 0

  const topDuplicates: TopDuplicate[] = rawTopDuplicates.map((us) => ({
    code: us.sticker.code,
    name: us.sticker.name,
    count: us.quantity - 1,
  }))

  return {
    user: {
      id: user.id,
      username: user.username!,
      name: user.name,
      image: user.image ?? null,
    },
    stats: { completion, owned, duplicates },
    topDuplicates,
  }
}
