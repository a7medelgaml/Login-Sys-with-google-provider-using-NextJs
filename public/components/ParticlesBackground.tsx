// components/ParticlesBackground.tsx
"use client";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    return (
        <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            fullScreen: { enable: true, zIndex: -1 },
            background: { color: "#000" },
            particles: {
            number: { value: 50 },
            size: { value: 3 },
            color: { value: "#ffffff" },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: "#ffffff", distance: 150 },
            },
        }}
        />
    );
}
