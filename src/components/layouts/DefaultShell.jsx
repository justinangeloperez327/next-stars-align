"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

import Footer from "@components/Footer";
import MobileProfileDropdown from "@features/authentication/components/MobileProfileDropdown";
import NavbarLogo from "@components/NavbarLogo";
import ParticleEffect from "@components/ParticleEffect";
import { ProfileDropdown } from "@features/authentication";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="relative pb-6 pt-2 text-white md:pt-6">
        <div className="mx-auto w-full max-w-6xl">
          <nav className="relative mx-4 flex items-center justify-between sm:h-10 xl:mx-0" aria-label="Global">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link href="/" className="block items-center justify-center">
                <NavbarLogo />
              </Link>
              <div className="lg:hidden">
                <button
                  type="button"
                  aria-label="Toggle navigation"
                  className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-300 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                >
                  {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <div className="hidden items-center justify-start uppercase md:space-x-10 lg:flex">
              <Link href="/" className="text-lg font-bold hover:underline">JOBS</Link>
              {isAuthenticated ? (
                <Link href="/applied-jobs" className="text-lg font-bold hover:underline">Applied</Link>
              ) : (
                <Link href="/about" className="text-lg font-bold hover:underline">ABOUT</Link>
              )}
            </div>

            <div className="hidden items-center justify-end space-x-4 lg:flex">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Link href="/register" className="text-lg font-bold hover:underline">Register</Link>
                  <Link href="/login" className="text-lg font-bold hover:underline">Login</Link>
                </>
              )}
            </div>
          </nav>

          <Transition
            show={isMobileMenuOpen}
            className="transition duration-300 ease-in-out"
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="mx-4 mt-4 lg:hidden">
              <div className="space-y-4">
                <Link href="/" className="block text-lg font-bold">JOBS</Link>
                {!isAuthenticated && <Link href="/about" className="block text-lg font-bold">ABOUT</Link>}
                {isAuthenticated ? (
                  <MobileProfileDropdown />
                ) : (
                  <>
                    <Link href="/register" className="block text-lg font-bold">Register</Link>
                    <Link href="/login" className="block text-lg font-bold">Login</Link>
                  </>
                )}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </header>
  );
}

export default function DefaultShell({ children }) {
  return (
    <>
      <ParticleEffect />
      <div className="flex min-h-screen flex-col bg-gradient-to-r from-violet-950 to-indigo-900 font-mono antialiased">
        <Navbar />
        <main className="flex-grow">
          <div className="py-12">
            <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
