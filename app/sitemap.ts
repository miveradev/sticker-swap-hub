import type { MetadataRoute } from "next"

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://stickersawphub.com"

const LOCALES = ["en", "es"] as const

type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

const ROUTES: Route[] = [
  { path: "",          priority: 1.0, changeFrequency: "weekly"  },
  { path: "/album",    priority: 0.8, changeFrequency: "weekly"  },
  { path: "/swap",     priority: 0.7, changeFrequency: "weekly"  },
  { path: "/social",   priority: 0.7, changeFrequency: "weekly"  },
  { path: "/privacy",  priority: 0.3, changeFrequency: "yearly"  },
  { path: "/terms",    priority: 0.3, changeFrequency: "yearly"  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}/${l}${path}`])
        ),
      },
    }))
  )
}
