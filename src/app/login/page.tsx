"use client";

import LoginCard from "@/components/auth/login-card";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9eef8] px-4">
      <LoginCard />
    </main>
  );
}
