"use client";

import { Suspense, useMemo, useRef } from "react";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { Color } from "three";

const FloatingSculpture = () => {
  const groupRef = useRef<Group | null>(null);
  const coreRef = useRef<Mesh | null>(null);
  const ringRef = useRef<Mesh | null>(null);

  const palette = useMemo(
    () => ({
      shell: new Color("#0f766e"),
      core: new Color("#f6f1e8"),
      ring: new Color("#0f172a"),
    }),
    [],
  );

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.36;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.22) * 0.1;
    }

    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(elapsed * 1.2) * 0.12;
      coreRef.current.rotation.x += delta * 0.6;
      coreRef.current.rotation.z += delta * 0.45;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = elapsed * 0.52;
      ringRef.current.rotation.z = elapsed * 0.33;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.8}>
        <mesh>
          <torusKnotGeometry args={[0.82, 0.2, 140, 20]} />
          <meshStandardMaterial
            color={palette.shell}
            roughness={0.22}
            metalness={0.55}
          />
        </mesh>
      </Float>

      <mesh ref={coreRef} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color={palette.core}
          roughness={0.2}
          metalness={0.08}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[0.4, 0.2, 0.1]}>
        <torusGeometry args={[1.25, 0.035, 18, 72]} />
        <meshStandardMaterial
          color={palette.ring}
          roughness={0.68}
          metalness={0.12}
        />
      </mesh>
    </group>
  );
};

const HeroCanvas = () => {
  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0.2, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={0.9} position={[2.2, 2.8, 2.2]} color="#fff3dc" />
        <directionalLight intensity={0.38} position={[-2.6, -1.4, -2]} />

        <FloatingSculpture />
      </Canvas>
    </Suspense>
  );
};

export default HeroCanvas;
