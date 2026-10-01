"use client";

import Link from "next/link";
import ParticleEffect from "@components/ParticleEffect";

export default function NotFound() {
  return (
    <>
      <ParticleEffect />
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-violet-950 to-indigo-900">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="mt-3 text-2xl font-semibold text-white">Page Not Found</p>
        <Link href="/" className="mt-4 rounded-md bg-white px-4 py-2 text-black">Go back to Home</Link>
      </section>
    </>
  );
}
