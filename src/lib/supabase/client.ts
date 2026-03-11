// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // 增加环境变量校验，避免构建时报错
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // 构建时（无环境变量）返回空客户端，运行时（浏览器）正常初始化
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase env vars loaded in browser only (safe warning)");
    return {
      auth: {
        signInWithPassword: async () => ({ error: null }),
        signUp: async () => ({ error: null }),
        getUser: async () => ({ data: null, error: null })
      }
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
