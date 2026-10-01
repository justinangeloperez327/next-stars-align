"use client";

import { useEffect, useRef } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import { Provider, useDispatch } from "react-redux";
import { loadSlim } from "@tsparticles/slim";
import { hydrateAuth } from "@features/authentication/slices/authSlice";
import { makeStore } from "./store";

function AuthHydrator({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      user = null;
    }

    dispatch(
      hydrateAuth({
        user,
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ParticlesProvider init={loadSlim}>
      <Provider store={storeRef.current}>
        <AuthHydrator>{children}</AuthHydrator>
      </Provider>
    </ParticlesProvider>
  );
}
