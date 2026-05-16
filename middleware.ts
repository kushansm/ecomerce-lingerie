import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = (req.auth?.user as any)?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname)
  const isProtectedRoute = ["/cart", "/checkout", "/profile"].includes(nextUrl.pathname)
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl))
    }
    return null
  }

  if (!isLoggedIn && (isProtectedRoute || isAdminRoute)) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  if (isAdminRoute && userRole !== "ADMIN") {
    return Response.redirect(new URL("/", nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
