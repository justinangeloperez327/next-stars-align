import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <section className="panel rounded-3xl p-9 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">Account created</p>
      <h1 className="mt-4 text-3xl font-semibold">Registration complete</h1>
      <p className="muted mt-3">Your account is ready. Sign in to continue.</p>
      <Link className="btn btn-primary mt-7" href="/login">Go to login</Link>
    </section>
  );
}
