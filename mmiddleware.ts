import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/login"

  // allow login page
  if (isLoginPage) {
    return NextResponse.next()
  }

  // cek session dari Supabase (lebih aman pakai bypass middleware auth dulu)
  const authCookie = request.cookies.get("sb-access-token")?.value

  // kalau belum login → redirect
  if (isAdminRoute && !authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}