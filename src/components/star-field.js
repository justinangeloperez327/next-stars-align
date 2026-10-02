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
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 45,
      detectRetina: true,
      pauseOnBlur: true,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#c4b5fd", "#7dd3fc"],
        },
        links: {
          enable: true,
          color: "#a8b4d6",
          distance: 145,
          opacity: 0.09,
          width: 0.6,
        },
        move: {
          enable: !reduceMotion,
          speed: 0.16,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        number: {
          value: 26,
        },
        opacity: {
          value: {
            min: 0.18,
            max: 0.52,
          },
        },
        shape: {
          type: "star",
        },
        size: {
          value: {
            min: 0.7,
            max: 1.9,
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
