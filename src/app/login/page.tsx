// /login/page.tsx（完全重写，确保动态渲染）
"use client"; // 强制客户端组件，彻底绕过服务端预渲染

import { useEffect, useState } from "react";
import LoginCard from "@/components/auth/login-card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  // 延迟初始化 Supabase 客户端，确保环境变量已注入
  const [supabase, setSupabase] = useState<any>(null);
  
  useEffect(() => {
    const initSupabase = () => {
      const client = createClient();
      setSupabase(client);
    };
    initSupabase();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9eef8] px-4">
      <LoginCard />
    </main>
  );
}

// 双重保险：禁用静态生成
export const dynamic = "force-dynamic";
export const revalidate = 0; // 禁用缓存
export const generateStaticParams = async () => {
  return []; // 明确不生成静态参数
};
