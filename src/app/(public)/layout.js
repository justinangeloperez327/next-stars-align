import { redirect } from "next/navigation";

import SiteShell from "@/components/site-shell";
import { getSession } from "@/lib/auth";

export default async function PublicLayout({ children }) {
  const session = await getSession();

  if (session?.user?.role === "employer") redirect("/employer/dashboard");
  if (session?.user?.role === "admin") redirect("/admin/dashboard");

  return <SiteShell>{children}</SiteShell>;
}
