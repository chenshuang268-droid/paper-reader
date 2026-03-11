import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  const successUrl = new URL("/library", request.url);
  const failUrl = new URL("/login", request.url);

  try {
    console.log("[auth/confirm] hit");
    console.log("[auth/confirm] token exists:", !!token_hash);
    console.log("[auth/confirm] type:", type);

    if (!token_hash || !type) {
      failUrl.searchParams.set("error", "missing_token");
      return NextResponse.redirect(failUrl);
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      console.error("[auth/confirm] verifyOtp error:", error.message);
      failUrl.searchParams.set("error", "confirm_failed");
      return NextResponse.redirect(failUrl);
    }

    console.log("[auth/confirm] verify success");
    return NextResponse.redirect(successUrl);
  } catch (err) {
    console.error("[auth/confirm] unexpected error:", err);
    failUrl.searchParams.set("error", "server_error");
    return NextResponse.redirect(failUrl);
  }
}
