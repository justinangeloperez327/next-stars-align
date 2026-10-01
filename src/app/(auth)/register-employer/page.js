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
    <section className="panel rounded-3xl p-7 sm:p-9">
      <h1 className="text-3xl font-black">Create an employer account</h1>
      <p className="muted mt-2">Set up your company profile and start managing roles.</p>
      {params?.error && <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>}
      <form action={registerEmployerAction} className="mt-7 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold">Email</span>
            <input className="field" name="email" required type="email" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Password</span>
            <input className="field" minLength="6" name="password" required type="password" />
          </label>
          {fields.map(([name, label, required]) => (
            <label className="grid gap-2" key={name}>
              <span className="text-sm font-bold">{label}</span>
              <input className="field" name={name} required={required} />
            </label>
          ))}
        </div>
        {["vision", "mission", "values"].map((name) => (
          <label className="grid gap-2" key={name}>
            <span className="text-sm font-bold capitalize">{name}</span>
            <textarea className="field min-h-24" name={name} />
          </label>
        ))}
        <button className="btn btn-primary mt-2" type="submit">Create employer account</button>
      </form>
      <p className="muted mt-6 text-sm">Looking for work? <Link className="font-bold text-violet-300" href="/register">Register as an employee</Link>.</p>
    </section>
  );
}
