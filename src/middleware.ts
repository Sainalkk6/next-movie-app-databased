import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuthenticated = !!request.cookies.get("next-auth.session-token")
  if (isAuthenticated) {
    if (path === "/" || path === "/signup") return NextResponse.redirect(new URL("/home", request.url))
  } else {
    if(path === "/home:path*" || path === "/profile") return NextResponse.redirect(new URL("/",request.url))
  }
}

export const config = {
  matcher: ["/home", "/profile", "/signup"]
};

