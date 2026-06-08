import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

export type StickerData = {
  id: string
  code: string
  name: string
  quantity: number
}

export type SectionData = {
  id: string
  name: string
  countryCode?: string
  stickers: StickerData[]
}

export type AlbumData = {
  id: string
  name: string
  slug: string
  totalStickers: number
  ownedStickers: number
  sections: SectionData[]
}

// ISO 3166-1 alpha-2 lookup for FIFA WC 2026 sections.
// Keys are matched against section name and slug (case-insensitive).
const COUNTRY_CODES: Record<string, string> = {
  afghanistan: "AF", albania: "AL", algeria: "DZ", andorra: "AD",
  angola: "AO", argentina: "AR", armenia: "AM", australia: "AU",
  austria: "AT", azerbaijan: "AZ", bahrain: "BH", bangladesh: "BD",
  belgium: "BE", bolivia: "BO",
  "bosnia and herzegovina": "BA", "bosnia herzegovina": "BA",
  "bosnia & herzegovina": "BA", "bosnia-herzegovina": "BA", bosnia: "BA",
  botswana: "BW", brazil: "BR", bulgaria: "BG", burkina_faso: "BF",
  burundi: "BI", cameroon: "CM", canada: "CA",
  "cape verde": "CV", "cabo verde": "CV",
  chile: "CL", china: "CN", colombia: "CO",
  congo: "CD", "dr congo": "CD", "congo dr": "CD",
  "congo rd": "CD", "republic of congo": "CG",
  "democratic republic of congo": "CD", "democratic republic of the congo": "CD",
  "costa rica": "CR", croatia: "HR", cuba: "CU", cyprus: "CY",
  "czech republic": "CZ", czechia: "CZ", denmark: "DK",
  ecuador: "EC", egypt: "EG", england: "GB-ENG", eritrea: "ER",
  ethiopia: "ET", fiji: "FJ", finland: "FI", france: "FR",
  georgia: "GE", germany: "DE", ghana: "GH", greece: "GR",
  guatemala: "GT", guinea: "GN", haiti: "HT", honduras: "HN",
  hungary: "HU", iceland: "IS", india: "IN", indonesia: "ID",
  iran: "IR", iraq: "IQ", ireland: "IE", israel: "IL",
  italy: "IT",
  "ivory coast": "CI", "cote d ivoire": "CI", "cote d ivore": "CI", "cote divoire": "CI",
  curaçao: "CW", curacao: "CW",
  jamaica: "JM", japan: "JP", jordan: "JO", kazakhstan: "KZ",
  kenya: "KE", "south korea": "KR", "korea republic": "KR",
  "korea dpr": "KP", north_korea: "KP", kuwait: "KW",
  lebanon: "LB", liberia: "LR", libya: "LY", luxembourg: "LU",
  madagascar: "MG", malawi: "MW", malaysia: "MY", mali: "ML",
  malta: "MT", mauritania: "MR", mexico: "MX", moldova: "MD",
  mongolia: "MN", montenegro: "ME", morocco: "MA", mozambique: "MZ",
  myanmar: "MM", namibia: "NA", nepal: "NP", netherlands: "NL",
  "new caledonia": "NC", "new zealand": "NZ", nicaragua: "NI",
  nigeria: "NG", "north macedonia": "MK", norway: "NO",
  oman: "OM", pakistan: "PK", panama: "PA", "papua new guinea": "PG",
  paraguay: "PY", peru: "PE", philippines: "PH", poland: "PL",
  portugal: "PT", qatar: "QA", romania: "RO", russia: "RU",
  "saudi arabia": "SA", scotland: "GB-SCT", senegal: "SN",
  serbia: "RS", singapore: "SG", slovakia: "SK", slovenia: "SI",
  "solomon islands": "SB", somalia: "SO", "south africa": "ZA",
  spain: "ES", "sri lanka": "LK", sudan: "SD", sweden: "SE",
  switzerland: "CH", syria: "SY", tahiti: "PF", tanzania: "TZ",
  thailand: "TH", "trinidad and tobago": "TT", tunisia: "TN",
  turkey: "TR", türkiye: "TR", uganda: "UG", ukraine: "UA",
  "united arab emirates": "AE", uae: "AE",
  "united states": "US", usa: "US", "united states of america": "US",
  uruguay: "UY", uzbekistan: "UZ", vanuatu: "VU", venezuela: "VE",
  vietnam: "VN", wales: "GB-WLS", "northern ireland": "GB-NIR", "western sahara": "EH",
  yemen: "YE", zambia: "ZM", zimbabwe: "ZW",
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")   // strip combining diacritics
    .replace(/[^a-z0-9\s]/g, " ")      // replace apostrophes and any other non-alphanum with space
    .replace(/\s+/g, " ")              // collapse multiple spaces
    .trim()
}

export function resolveCountryCode(name: string, slug: string): string | undefined {
  const key = name.toLowerCase().trim()
  const normalizedKey = normalize(name)
  const slugKey = slug.toLowerCase().replace(/-/g, " ").trim()
  return (
    COUNTRY_CODES[key] ??
    COUNTRY_CODES[normalizedKey] ??
    COUNTRY_CODES[slugKey]
  )
}

export async function getAlbum(userId?: string): Promise<AlbumData> {
  const [album, userStickers] = await Promise.all([
    prisma.album.findFirst({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        sections: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
            stickers: {
              orderBy: { position: "asc" },
              select: { id: true, code: true, name: true },
            },
          },
        },
      },
    }),
    userId
      ? prisma.userSticker.findMany({
          where: { userId },
          select: { stickerId: true, quantity: true },
        })
      : Promise.resolve([] as Array<{ stickerId: string; quantity: number }>),
  ])

  if (!album) notFound()

  const quantityMap = new Map(userStickers.map((us) => [us.stickerId, us.quantity]))

  const sections: SectionData[] = album.sections.map((section) => ({
    id: section.id,
    name: section.name,
    countryCode: resolveCountryCode(section.name, section.slug),
    stickers: section.stickers.map((sticker) => ({
      id: sticker.id,
      code: sticker.code,
      name: sticker.name,
      quantity: quantityMap.get(sticker.id) ?? 0,
    })),
  }))

  const totalStickers = sections.reduce((sum, s) => sum + s.stickers.length, 0)
  const ownedStickers = quantityMap.size

  return {
    id: album.id,
    name: album.name,
    slug: album.slug,
    totalStickers,
    ownedStickers,
    sections,
  }
}
