import { prisma } from "@/lib/prisma"
import { resolveCountryCode } from "@/lib/albums/getAlbum"

export type ComparisonSticker = {
  code: string
  name: string
  count: number
}

export type ComparisonSection = {
  id: string
  name: string
  slug: string
  countryCode?: string
  stickers: ComparisonSticker[]
}

export type CollectionComparison = {
  canReceive: ComparisonSection[]
  canGive: ComparisonSection[]
}

type RawUserSticker = {
  quantity: number
  sticker: {
    id: string
    code: string
    name: string
    position: number
    section: {
      id: string
      name: string
      slug: string
      sortOrder: number
    }
  }
}

const STICKER_SELECT = {
  quantity: true,
  sticker: {
    select: {
      id: true,
      code: true,
      name: true,
      position: true,
      section: {
        select: { id: true, name: true, slug: true, sortOrder: true },
      },
    },
  },
} as const

function buildSections(
  candidates: RawUserSticker[],
  excludeMap: Map<string, number>
): ComparisonSection[] {
  type SectionAccum = {
    sortOrder: number
    id: string
    name: string
    slug: string
    stickers: Array<{ position: number } & ComparisonSticker>
  }

  const sectionMap = new Map<string, SectionAccum>()

  for (const us of candidates) {
    const excludeQty = excludeMap.get(us.sticker.id) ?? 0
    if (us.quantity <= 1 || excludeQty > 0) continue

    const { id, name, slug, sortOrder } = us.sticker.section

    if (!sectionMap.has(id)) {
      sectionMap.set(id, { sortOrder, id, name, slug, stickers: [] })
    }
    sectionMap.get(id)!.stickers.push({
      code: us.sticker.code,
      name: us.sticker.name,
      count: us.quantity - 1,
      position: us.sticker.position,
    })
  }

  return Array.from(sectionMap.values())
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ id, name, slug, stickers }) => ({
      id,
      name,
      slug,
      countryCode: resolveCountryCode(name, slug),
      stickers: stickers
        .sort((a, b) => a.position - b.position)
        .map(({ code, name, count }) => ({ code, name, count })),
    }))
}

export async function getCollectionComparison(
  viewerId: string,
  targetUserId: string
): Promise<CollectionComparison> {
  const [viewerStickers, targetStickers] = await Promise.all([
    prisma.userSticker.findMany({
      where: { userId: viewerId },
      select: STICKER_SELECT,
    }),
    prisma.userSticker.findMany({
      where: { userId: targetUserId },
      select: STICKER_SELECT,
    }),
  ])

  const viewerMap = new Map<string, number>(
    viewerStickers.map((us) => [us.sticker.id, us.quantity])
  )
  const targetMap = new Map<string, number>(
    targetStickers.map((us) => [us.sticker.id, us.quantity])
  )

  return {
    canReceive: buildSections(targetStickers, viewerMap),
    canGive: buildSections(viewerStickers, targetMap),
  }
}
