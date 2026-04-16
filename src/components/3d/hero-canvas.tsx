"use client";

import { Suspense, useMemo, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { Color } from "three";

const BasicOrb = () => {
  const groupRef = useRef<Group | null>(null);
  const orbRef = useRef<Mesh | null>(null);
  const haloRef = useRef<Mesh | null>(null);
  const accentRef = useRef<Mesh | null>(null);
  const elapsedRef = useRef(0);

  const palette = useMemo(
    () => ({
      orb: new Color("#334155"),
      halo: new Color("#8fa0b5"),
      accent: new Color("#f4d7b0"),
    }),
    [],
  );

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    const elapsed = elapsedRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.26) * 0.08;
    }

    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.18;
      orbRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.05;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.16;
      haloRef.current.rotation.x = 0.46 + Math.sin(elapsed * 0.65) * 0.16;
    }

    if (accentRef.current) {
      accentRef.current.position.x = Math.cos(elapsed * 0.82) * 1.05;
      accentRef.current.position.y = Math.sin(elapsed * 0.82) * 0.26;
      accentRef.current.position.z = Math.sin(elapsed * 0.82) * 0.42;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.02, 0]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshStandardMaterial
          color={palette.orb}
          roughness={0.42}
          metalness={0.24}
        />
      </mesh>

      <mesh ref={haloRef} rotation={[0.46, 0.08, 0.12]}>
        <torusGeometry args={[1.38, 0.03, 20, 96]} />
        <meshStandardMaterial
          color={palette.halo}
          roughness={0.62}
          metalness={0.18}
        />
      </mesh>

      <mesh ref={accentRef} position={[1.05, 0.12, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={palette.accent}
          roughness={0.28}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
};

const HeroCanvas = () => {
  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0.08, 4.1], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.78} />
        <directionalLight intensity={0.82} position={[2.1, 2.5, 2.1]} color="#fff2dc" />
        <directionalLight intensity={0.34} position={[-2.4, -1.2, -1.8]} />

        <BasicOrb />
      </Canvas>
    </Suspense>
  );
};

export default HeroCanvas;
