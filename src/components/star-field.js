"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

async function initParticles(engine) {
  await loadSlim(engine);
}

export default function StarField() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 40,
      detectRetina: true,
      pauseOnBlur: true,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
          resize: { enable: true },
        },
      },
      particles: {
        color: {
          value: ["#F8FAFC", "#BAE6FD", "#67E8F9"],
        },
        links: {
          enable: true,
          color: "#7DD3FC",
          distance: 138,
          opacity: 0.065,
          width: 0.55,
        },
        move: {
          enable: !reduceMotion,
          speed: 0.1,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        number: {
          value: 28,
        },
        opacity: {
          value: {
            min: 0.16,
            max: 0.44,
          },
        },
        shape: {
          type: "star",
        },
        size: {
          value: {
            min: 0.6,
            max: 1.55,
          },
        },
      },
    }),
    [reduceMotion],
  );

  return (
    <div className="particle-layer" aria-hidden="true">
      <ParticlesProvider init={initParticles}>
        <Particles id="stars-align-particles" options={options} />
      </ParticlesProvider>
    </div>
  );
}
