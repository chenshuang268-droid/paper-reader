// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // 增加环境变量校验，避免构建时报错
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables not found (build time)");
    // 返回空客户端，运行时再初始化
    return { auth: { signInWithPassword: () => ({ error: null }), signUp: () => ({ error: null }) } } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
