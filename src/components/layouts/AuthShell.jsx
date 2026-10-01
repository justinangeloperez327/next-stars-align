"use client";

import Link from "next/link";
import ParticleEffect from "@components/ParticleEffect";

export default function AuthShell({ children }) {
  return (
    <>
      <ParticleEffect />
      <div className="z-10 font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col items-center bg-black pt-6 sm:justify-center sm:pt-0">
          <div className="fade-up">
            <Link href="/" className="flex w-full items-center justify-center font-bold text-[2.5rem]">
              <span className="text-white">STARS</span>
              <span className="text-violet-800">ALIGN</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
