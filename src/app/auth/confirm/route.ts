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
      failUrl.searchParams.set("error", "confirm_failed");
      return NextResponse.redirect(failUrl);
    }

    return NextResponse.redirect(successUrl);
  } catch {
    failUrl.searchParams.set("error", "server_error");
    return NextResponse.redirect(failUrl);
  }
}
