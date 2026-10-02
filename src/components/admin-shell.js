import Link from "next/link";

import { logoutAction } from "@/app/actions";
import Brand from "@/components/brand";

const links = [
  ["Dashboard", "/admin/dashboard"],
  ["Users", "/admin/users"],
  ["Companies", "/admin/companies"],
  ["Jobs", "/admin/jobs"],
  ["Applications", "/admin/applications"],
  ["Settings", "/admin/settings"],
];

export default function AdminShell({ user, children }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <aside className="sidebar m-3 rounded-2xl p-4 md:sticky md:top-3 md:h-[calc(100vh-1.5rem)]">
        <div className="px-2 py-2">
          <Brand />
          <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/35">Administration</p>
        </div>
        <nav className="mt-7 grid gap-1" aria-label="Admin navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="sidebar-link">{label}</Link>)}
        </nav>
        <div className="mt-8 hidden md:block">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="truncate text-xs text-white/45">Administrator</p>
            <p className="mt-1 truncate text-sm font-medium text-white/80">{user.email}</p>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="mx-3 mt-3 flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 backdrop-blur-xl lg:px-7">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/35">Platform operations</p>
          <form action={logoutAction}><button className="btn btn-secondary min-h-10 py-2" type="submit">Logout</button></form>
        </header>
        <main className="p-5 sm:p-7 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
