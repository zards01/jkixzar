"use client"

import { useCallback } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },

        fpsLimit: 60,

        particles: {
          number: {
            value: 90,
            density: { enable: true, area: 800 },
          },

          color: {
            value: ["#ff7a00", "#ffae42"],
          },

          links: {
            enable: true,
            distance: 170,
            color: "#ff7a00",
            opacity: 0.45,
            width: 1.5,
          },

          move: {
            enable: true,
            speed: { min: 0.3, max: 1.2 },
            outModes: { default: "bounce" },
          },

          size: {
            value: { min: 2, max: 6 },
          },

          opacity: {
            value: { min: 0.4, max: 0.9 },
          },

          shadow: {
            enable: true,
            color: "#ff7a00",
            blur: 12,
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },

          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.9,
              },
            },
          },
        },

        detectRetina: true,
      }}
    />
  )
}