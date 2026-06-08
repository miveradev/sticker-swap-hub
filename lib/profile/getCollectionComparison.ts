import { prisma } from "@/lib/prisma"

export type ComparisonSticker = {
  code: string
  name: string
  count: number
}

export type CollectionComparison = {
  canReceive: ComparisonSticker[]
  canGive: ComparisonSticker[]
}

export async function getCollectionComparison(
  viewerId: string,
  targetUserId: string
): Promise<CollectionComparison> {
  const [viewerStickers, targetStickers] = await Promise.all([
    prisma.userSticker.findMany({
      where: { userId: viewerId },
      select: {
        quantity: true,
        sticker: { select: { id: true, code: true, name: true } },
      },
    }),
    prisma.userSticker.findMany({
      where: { userId: targetUserId },
      select: {
        quantity: true,
        sticker: { select: { id: true, code: true, name: true } },
      },
    }),
  ])

  const viewerMap = new Map<string, number>()
  for (const us of viewerStickers) {
    viewerMap.set(us.sticker.id, us.quantity)
  }

  const targetMap = new Map<string, number>()
  for (const us of targetStickers) {
    targetMap.set(us.sticker.id, us.quantity)
  }

  const canReceive: ComparisonSticker[] = []
  for (const us of targetStickers) {
    const viewerQty = viewerMap.get(us.sticker.id) ?? 0
    if (us.quantity > 1 && viewerQty === 0) {
      canReceive.push({ code: us.sticker.code, name: us.sticker.name, count: us.quantity - 1 })
    }
  }
  canReceive.sort((a, b) => b.count - a.count)

  const canGive: ComparisonSticker[] = []
  for (const us of viewerStickers) {
    const targetQty = targetMap.get(us.sticker.id) ?? 0
    if (us.quantity > 1 && targetQty === 0) {
      canGive.push({ code: us.sticker.code, name: us.sticker.name, count: us.quantity - 1 })
    }
  }
  canGive.sort((a, b) => b.count - a.count)

  return { canReceive, canGive }
}
