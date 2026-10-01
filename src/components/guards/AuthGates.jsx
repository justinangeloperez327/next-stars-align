"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function LoadingGate() {
  return <div className="min-h-screen bg-black" aria-busy="true" />;
}

export function PublicGate({ children }) {
  const router = useRouter();
  const { hydrated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hydrated || !token) return;
    if (user?.role === "employer") router.replace("/employer/dashboard");
    if (user?.role === "admin") router.replace("/admin/dashboard");
  }, [hydrated, token, user, router]);

  if (!hydrated) return <LoadingGate />;
  if (token && (user?.role === "employer" || user?.role === "admin")) return <LoadingGate />;
  return children;
}

export function AuthGate({ children }) {
  const router = useRouter();
  const { hydrated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!hydrated || !token) return;
    if (user?.role === "employer") router.replace("/employer/dashboard");
    else if (user?.role === "admin") router.replace("/admin/dashboard");
    else router.replace("/");
  }, [hydrated, token, user, router]);

  if (!hydrated || token) return <LoadingGate />;
  return children;
}

export function EmployeeGate({ children }) {
  const router = useRouter();
  const { hydrated, token, user } = useSelector((state) => state.auth);
  const allowed = Boolean(token && user?.role === "employee");

  useEffect(() => {
    if (hydrated && !allowed) router.replace("/login");
  }, [hydrated, allowed, router]);

  if (!hydrated || !allowed) return <LoadingGate />;
  return children;
}

export function EmployerGate({ children }) {
  const router = useRouter();
  const { hydrated, token, user } = useSelector((state) => state.auth);
  const allowed = Boolean(token && user?.role === "employer");

  useEffect(() => {
    if (hydrated && !allowed) router.replace("/login");
  }, [hydrated, allowed, router]);

  if (!hydrated || !allowed) return <LoadingGate />;
  return children;
}

export function AdminGate({ children }) {
  const router = useRouter();
  const { hydrated, token, user } = useSelector((state) => state.auth);
  const allowed = Boolean(token && user?.role === "admin");

  useEffect(() => {
    if (hydrated && !allowed) router.replace("/login");
  }, [hydrated, allowed, router]);

  if (!hydrated || !allowed) return <LoadingGate />;
  return children;
}

export function ApplicationGate({ children }) {
  const router = useRouter();
  const job = useSelector((state) => state.jobs.job);

  useEffect(() => {
    if (job?.applied && job?._id) {
      router.replace(`/jobs/${job._id}/details`);
    }
  }, [job, router]);

  if (job?.applied) return <LoadingGate />;
  return children;
}
