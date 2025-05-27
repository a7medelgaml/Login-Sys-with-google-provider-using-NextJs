"use client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
        <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            fullScreen: { enable: true, zIndex: -1 },
            fpsLimit: 60,
            particles: {
            number: {
                value: 80,
                density: {
                enable: true,
                area: 800,
                },
            },
            color: { value: "#992c2c" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: true,
                animation: {
                enable: true,
                speed: 15,
                minimumValue: 0.1,
                sync: false,
                },
            },
            size: {
                value: 5,
                random: true,
                animation: {
                enable: true,
                speed: 20,
                minimumValue: 0.1,
                sync: false,
                },
            },
            links: {
                enable: true,
                distance: 120,
                color: "#992c50",
                opacity: 0.4,
                width: 2.5,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                default: "out",
                },
                attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
                },
            },
            twinkle: {
                particles: {
                enable: true,
                color: "#ffff00",
                frequency: 0.03,
                opacity: 1,
                },
                lines: {
                enable: true,
                color: "#ff0000",
                frequency: 0.005,
                opacity: 1,
                },
            },
            },
            interactivity: {
            events: {
                onHover: {
                enable: true,
                mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                distance: 100,
                duration: 0.4,
                },
                push: {
                quantity: 4,
                },
            },
            },
            retinaDetect: true,
        }}
        />
        
  );
}
