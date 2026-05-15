import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/shop", "/categories", "/new-arrivals", "/sale"].includes(nextUrl.pathname)
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname)
  const isProtectedRoute = ["/cart", "/checkout", "/profile"].includes(nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl))
    }
    return null
  }

  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
