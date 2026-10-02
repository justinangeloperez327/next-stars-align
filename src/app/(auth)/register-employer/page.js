import Link from "next/link";

import { registerEmployerAction } from "@/app/actions";

export const metadata = { title: "Employer registration" };

export default async function RegisterEmployerPage({ searchParams }) {
  const params = await searchParams;
  const fields = [
    ["companyName", "Company name", true],
    ["website", "Website", false],
    ["location", "Location", true],
    ["industry", "Industry", true],
    ["size", "Company size", false],
  ];

  return (
    <section className="glass-strong rounded-[1.7rem] p-6 sm:p-9">
      <p className="eyebrow">Employer workspace</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Create your company account</h1>
      <p className="muted mt-2">Set up the essentials now. You can refine your company profile later.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={registerEmployerAction} className="mt-7 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="form-label">Email</span>
            <input className="field" name="email" placeholder="you@company.com" required type="email" />
          </label>
          <label className="grid gap-2">
            <span className="form-label">Password</span>
            <input className="field" minLength="6" name="password" placeholder="At least 6 characters" required type="password" />
          </label>
          {fields.map(([name, label, required]) => (
            <label className="grid gap-2" key={name}>
              <span className="form-label">{label}</span>
              <input className="field" name={name} required={required} />
            </label>
          ))}
        </div>
        {["vision", "mission", "values"].map((name) => (
          <label className="grid gap-2" key={name}>
            <span className="form-label capitalize">{name}</span>
            <textarea className="field min-h-24 resize-y" name={name} />
          </label>
        ))}
        <button className="btn btn-primary mt-1" type="submit">Create employer account</button>
      </form>
      <p className="muted mt-6 border-t border-white/8 pt-5 text-sm">Looking for work? <Link className="font-medium text-violet-300 hover:text-violet-200" href="/register">Register as an employee</Link>.</p>
    </section>
  );
}
