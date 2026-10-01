"use client";

import {
  ArrowRightCircleIcon,
  Bars4Icon,
  BriefcaseIcon,
  ChevronDownIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@features/authentication";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/employer/dashboard" },
  { name: "Jobs", icon: BriefcaseIcon, href: "/employer/jobs" },
  { name: "Applications", icon: UsersIcon, href: "/employer/applications" },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const current = navigation.find((item) => pathname.startsWith(item.href)) || navigation[0];

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-0 z-40 w-64 flex-shrink-0 border-r border-gray-200 bg-black transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between bg-black px-4 text-white">
            <span className="text-xl font-bold">Employer</span>
            <button className="md:hidden" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-5 flex-1 space-y-2 px-4">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg p-2 ${active ? "bg-gray-500 text-white" : "text-white hover:bg-gray-300 hover:text-gray-950"}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-16 items-center justify-between bg-black px-4 text-white shadow-md">
          <button className="md:hidden" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            <Bars4Icon className="h-6 w-6" />
          </button>
          <span className="text-lg font-semibold">{current.name}</span>
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-800">
              {user?.email || "Account"}
              <ChevronDownIcon className="size-4 fill-white/80" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/30"
                >
                  <ArrowRightCircleIcon className="size-4 fill-white/30" />
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
