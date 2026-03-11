"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";



type AuthMode = "login" | "signup";

export default function LoginCard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);


  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!email || !password) {
        throw new Error("请输入邮箱和密码");
      }

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/library");
        router.refresh();
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setMessage("注册成功，请去邮箱完成验证后再登录");
      setMode("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "操作失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-white px-6 py-7 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
      <h1 className="text-center text-[30px] font-semibold tracking-tight text-slate-900">
        账号登录
      </h1>
      <p className="mt-2 text-center text-sm text-slate-500">
        请输入您的账号信息以登录
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-700">邮箱地址</label>
          <input
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl bg-slate-100 px-4 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-700">密码</label>
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl bg-slate-100 px-4 text-sm outline-none"
          />
        </div>

        {error ? (
          <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#060a23] text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
        </button>

        <div className="text-center text-sm text-slate-500">
          {mode === "login" ? "还没有账号？" : "已经有账号？"}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
            className="ml-1 font-medium text-slate-900"
          >
            {mode === "login" ? "立即注册" : "去登录"}
          </button>
        </div>
      </form>
    </div>
  );
}
