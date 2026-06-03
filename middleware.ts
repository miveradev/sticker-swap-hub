import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { NextRequest } from "next/server"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Inject current pathname into request headers so server components can read it
  const newHeaders = new Headers(request.headers)
  newHeaders.set("x-pathname", request.nextUrl.pathname)

  return intlMiddleware(
    new NextRequest(request.url, {
      headers: newHeaders,
      method: request.method,
    })
  )
}

export const config = {
  matcher: [
    // Match all pathnames except /api/*, /_next/*, /_vercel/*, and static files
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
