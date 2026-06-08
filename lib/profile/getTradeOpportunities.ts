import { prisma } from "@/lib/prisma"

export type TradeOpportunities = {
  canReceiveCount: number
  canGiveCount: number
  mutualCount: number
}

export async function getTradeOpportunities(
  viewerId: string,
  targetUserId: string
): Promise<TradeOpportunities> {
  const [viewerStickers, targetStickers] = await Promise.all([
    prisma.userSticker.findMany({
      where: { userId: viewerId },
      select: { stickerId: true, quantity: true },
    }),
    prisma.userSticker.findMany({
      where: { userId: targetUserId },
      select: { stickerId: true, quantity: true },
    }),
  ])

  const viewerMap = new Map<string, number>()
  for (const us of viewerStickers) viewerMap.set(us.stickerId, us.quantity)

  const targetMap = new Map<string, number>()
  for (const us of targetStickers) targetMap.set(us.stickerId, us.quantity)

  let canReceiveCount = 0
  for (const us of targetStickers) {
    const viewerQty = viewerMap.get(us.stickerId) ?? 0
    if (us.quantity > 1 && viewerQty === 0) canReceiveCount++
  }

  let canGiveCount = 0
  for (const us of viewerStickers) {
    const targetQty = targetMap.get(us.stickerId) ?? 0
    if (us.quantity > 1 && targetQty === 0) canGiveCount++
  }

  const mutualCount = Math.min(canReceiveCount, canGiveCount)

  return { canReceiveCount, canGiveCount, mutualCount }
}
