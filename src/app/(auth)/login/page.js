import Link from "next/link";

import { loginAction } from "@/app/actions";

export const metadata = { title: "Login" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <section className="glass-strong rounded-[1.7rem] p-6 sm:p-9">
      <p className="eyebrow">Account access</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Welcome back</h1>
      <p className="muted mt-2">Sign in to continue to your Stars Align workspace.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={loginAction} className="mt-7 grid gap-5">
        <label className="grid gap-2">
          <span className="form-label">Email</span>
          <input autoComplete="email" className="field" name="email" placeholder="you@example.com" required type="email" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Password</span>
          <input autoComplete="current-password" className="field" minLength="6" name="password" placeholder="••••••••" required type="password" />
        </label>
        <button className="btn btn-primary mt-1" type="submit">Login</button>
      </form>
      <p className="muted mt-6 border-t border-white/8 pt-5 text-sm">New here? <Link className="font-medium text-violet-300 hover:text-violet-200" href="/register">Create an employee account</Link>.</p>
    </section>
  );
}
