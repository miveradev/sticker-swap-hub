"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type UpdateResult =
  | { quantity: number }
  | { error: string }

type BulkResult =
  | { updated: number }
  | { error: string }

export async function bulkAddSectionStickers(
  stickerIds: string[]
): Promise<BulkResult> {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h as unknown as Headers })

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const userId = session.user.id

  const result = await prisma.userSticker.createMany({
    data: stickerIds.map((stickerId) => ({ userId, stickerId, quantity: 1 })),
    skipDuplicates: true,
  })

  return { updated: result.count }
}

export async function bulkResetSectionStickers(
  stickerIds: string[]
): Promise<BulkResult> {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h as unknown as Headers })

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const userId = session.user.id

  const result = await prisma.userSticker.deleteMany({
    where: { userId, stickerId: { in: stickerIds } },
  })

  return { updated: result.count }
}

export async function updateStickerQuantity(
  stickerId: string,
  quantity: number
): Promise<UpdateResult> {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h as unknown as Headers })

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const userId = session.user.id

  const sticker = await prisma.sticker.findUnique({
    where: { id: stickerId },
    select: { id: true },
  })

  if (!sticker) {
    return { error: "Sticker not found" }
  }

  if (quantity <= 0) {
    await prisma.userSticker.deleteMany({ where: { userId, stickerId } })
    return { quantity: 0 }
  }

  const userSticker = await prisma.userSticker.upsert({
    where: { userId_stickerId: { userId, stickerId } },
    create: { userId, stickerId, quantity },
    update: { quantity },
    select: { quantity: true },
  })

  return { quantity: userSticker.quantity }
}
