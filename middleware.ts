import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    try {
      const supabase = await createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      // Supabase not configured, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
