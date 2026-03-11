import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const successUrl = new URL("/library", request.url);
  const failUrl = new URL("/login", request.url);

  try {
    if (!code) {
      failUrl.searchParams.set("error", "missing_code");
      return NextResponse.redirect(failUrl);
    }

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      failUrl.searchParams.set("error", "confirm_failed");
      return NextResponse.redirect(failUrl);
    }

    return NextResponse.redirect(successUrl);
  } catch {
    failUrl.searchParams.set("error", "server_error");
    return NextResponse.redirect(failUrl);
  }
}
