import Brand from "@/components/brand";
import { requireGuest } from "@/lib/auth";

export default async function AuthLayout({ children }) {
  await requireGuest();

  return (
    <main className="auth-shell shell flex min-h-screen flex-col items-center justify-center py-10 sm:py-14">
      <div className="relative z-10">
        <Brand />
      </div>
      <div className="relative z-10 mt-8 w-full max-w-xl">{children}</div>
    </main>
  );
}
