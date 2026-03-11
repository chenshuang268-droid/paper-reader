// /login/page.tsx（最终版，无报错）
"use client"; // 强制客户端组件，彻底绕过服务端预渲染

import LoginCard from "@/components/auth/login-card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9eef8] px-4">
      <LoginCard />
    </main>
  );
}

// 核心配置：禁用静态渲染（仅保留这两个即可）
export const dynamic = "force-dynamic";
export const revalidate = 0; // 禁用缓存，确保每次请求都动态渲染
