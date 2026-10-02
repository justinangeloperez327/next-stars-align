import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen items-center justify-center py-16">
      <section className="glass-strong max-w-xl rounded-[2rem] p-9 text-center">
        <p className="eyebrow">404 · Off course</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em]">This page is not in our orbit.</h1>
        <p className="muted mt-4 leading-7">The page may have moved, expired, or never existed.</p>
        <Link className="btn btn-primary mt-8" href="/">Back to jobs</Link>
      </section>
    </main>
  );
}
