import Link from "next/link";

import { registerEmployeeAction } from "@/app/actions";

export const metadata = { title: "Register" };

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;

  return (
    <section className="panel rounded-3xl p-7 sm:p-9">
      <h1 className="text-3xl font-black">Create your account</h1>
      <p className="muted mt-2">Register as an employee to apply for jobs.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={registerEmployeeAction} className="mt-7 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold">Email</span>
          <input autoComplete="email" className="field" name="email" required type="email" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold">Password</span>
          <input autoComplete="new-password" className="field" minLength="6" name="password" required type="password" />
        </label>
        <button className="btn btn-primary mt-2" type="submit">Create account</button>
      </form>
      <p className="muted mt-6 text-sm">Hiring instead? <Link className="font-bold text-violet-300" href="/register-employer">Register as an employer</Link>.</p>
    </section>
  );
}
