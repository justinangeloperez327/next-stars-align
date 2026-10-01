import Brand from "@/components/brand";
import { requireGuest } from "@/lib/auth";

export default async function AuthLayout({ children }) {
  await requireGuest();

  return (
    <main className="shell flex min-h-screen flex-col items-center justify-center py-10">
      <Brand />
      <div className="mt-8 w-full max-w-xl">{children}</div>
    </main>
  );
}
