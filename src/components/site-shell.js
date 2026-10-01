import Link from "next/link";

import { logoutAction } from "@/app/actions";
import Brand from "@/components/brand";
import { getSession } from "@/lib/auth";

export default async function SiteShell({ children }) {
  const session = await getSession();
  const employee = session?.role === "employee";

  return (
    <div className="min-h-screen">
      <header className="site-header">
        <div className="shell site-header-inner glass-strong">
          <Brand />
          <nav className="site-nav" aria-label="Primary navigation">
            <Link className="nav-link" href="/">Jobs</Link>
            <Link className="nav-link" href="/companies">Companies</Link>
            {employee ? (
              <>
                <Link className="nav-link" href="/applied-jobs">Applied</Link>
                <Link className="nav-link" href="/profile">Profile</Link>
                <form action={logoutAction}>
                  <button className="btn btn-secondary min-h-10 py-2" type="submit">Logout</button>
                </form>
              </>
            ) : (
              <>
                <Link className="nav-link" href="/about">About</Link>
                <Link className="nav-link" href="/register">Register</Link>
                <Link className="btn btn-primary min-h-10 py-2" href="/login">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 pb-8 pt-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-7 text-sm text-white/50">
          <Brand />
          <span>Focused hiring, without the noise.</span>
        </div>
      </footer>
    </div>
  );
}
