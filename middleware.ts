import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api/* (Better Auth and other API routes)
    // - /_next/* (Next.js internals)
    // - /_vercel/* (Vercel internals)
    // - Static files with extensions (e.g. favicon.ico, robots.txt)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
