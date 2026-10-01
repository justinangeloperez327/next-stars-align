import Link from "next/link";

import { logoutAction } from "@/app/actions";
import Brand from "@/components/brand";

const links = [
  ["Dashboard", "/employer/dashboard"],
  ["Jobs", "/employer/jobs"],
  ["Applications", "/employer/applications"],
  ["Profile", "/employer/profile"],
];

export default function EmployerShell({ user, children }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-white/10 bg-black/30 p-6 md:min-h-screen md:border-b-0 md:border-r">
        <Brand />
        <nav className="mt-10 grid gap-2">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl px-4 py-3 font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>
        <header className="flex min-h-20 items-center justify-between border-b border-white/10 px-6 lg:px-10">
          <p className="text-sm text-white/60">{user.email}</p>
          <form action={logoutAction}>
            <button className="btn btn-secondary" type="submit">Logout</button>
          </form>
        </header>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
