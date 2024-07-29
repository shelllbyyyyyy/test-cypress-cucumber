import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

const excludedPaths = ["/auth"];

export async function middleware(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
