import Link from "next/link";

import { loginAction } from "@/app/actions";

export const metadata = { title: "Login" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <section className="panel rounded-3xl p-7 sm:p-9">
      <h1 className="text-3xl font-black">Welcome back</h1>
      <p className="muted mt-2">Sign in to continue to Stars Align.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={loginAction} className="mt-7 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold">Email</span>
          <input autoComplete="email" className="field" name="email" required type="email" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Password</span>
          <input autoComplete="current-password" className="field" minLength="6" name="password" required type="password" />
        </label>
        <button className="btn btn-primary mt-2" type="submit">Login</button>
      </form>
      <p className="muted mt-6 text-sm">New here? <Link className="font-bold text-violet-300" href="/register">Create an employee account</Link>.</p>
    </section>
  );
}
