import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
