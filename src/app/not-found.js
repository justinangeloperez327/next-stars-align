import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen flex-col items-center justify-center text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-violet-400">404</p>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="muted mt-3">The page you requested does not exist.</p>
      <Link className="btn btn-primary mt-8" href="/">Back to jobs</Link>
    </main>
  );
}
