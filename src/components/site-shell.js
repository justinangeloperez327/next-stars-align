import Link from "next/link";

import { logoutAction } from "@/app/actions";
import { getSession } from "@/lib/auth";
import Brand from "@/components/brand";

export default async function SiteShell({ children }) {
  const session = await getSession();
  const employee = session?.role === "employee";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070511]/90 backdrop-blur-xl">
        <div className="shell flex min-h-20 items-center justify-between gap-6">
          <Brand />
          <nav className="flex items-center gap-5 text-sm font-bold">
            <Link href="/">Jobs</Link>
            <Link href="/companies">Companies</Link>
            {employee ? (
              <>
                <Link href="/applied-jobs">Applied</Link>
                <Link href="/profile">Profile</Link>
                <form action={logoutAction}>
                  <button className="btn btn-secondary" type="submit">Logout</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/about">About</Link>
                <Link href="/register">Register</Link>
                <Link className="btn btn-primary" href="/login">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-white/10 py-8">
        <div className="shell flex flex-wrap items-center justify-between gap-3 text-sm text-white/55">
          <span>Stars Align</span>
          <span>Full-stack Next.js job platform.</span>
        </div>
      </footer>
    </div>
  );
}
