import Link from "next/link";

import { registerEmployeeAction } from "@/app/actions";

export const metadata = { title: "Register" };

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;

  return (
    <section className="glass-strong rounded-[1.7rem] p-6 sm:p-9">
      <p className="eyebrow">Candidate account</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Create your account</h1>
      <p className="muted mt-2">Build your profile and keep your applications in one place.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={registerEmployeeAction} className="mt-7 grid gap-5">
        <label className="grid gap-2">
          <span className="form-label">Email</span>
          <input autoComplete="email" className="field" name="email" placeholder="you@example.com" required type="email" />
        </label>
        <label className="grid gap-2">
          <span className="form-label">Password</span>
          <input autoComplete="new-password" className="field" minLength="6" name="password" placeholder="At least 6 characters" required type="password" />
        </label>
        <button className="btn btn-primary mt-1" type="submit">Create account</button>
      </form>
      <p className="muted mt-6 border-t border-white/8 pt-5 text-sm">Hiring instead? <Link className="font-medium text-sky-300 hover:text-sky-200" href="/register-employer">Register as an employer</Link>.</p>
    </section>
  );
}
