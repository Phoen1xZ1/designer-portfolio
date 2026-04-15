"use client";

import { Suspense, useEffect, useState } from "react";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const CUSTOM_MODEL_URL = process.env.NEXT_PUBLIC_HERO_MODEL_URL ?? "";
const RAW_CUSTOM_MODEL_SCALE = Number(process.env.NEXT_PUBLIC_HERO_MODEL_SCALE ?? "1.05");

const resolveScale = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? value : fallback;

const CUSTOM_MODEL_SCALE = resolveScale(RAW_CUSTOM_MODEL_SCALE, 1.05);

const useReducedMotionPreference = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return isReducedMotion;
};

const FallbackSculpture = () => {
  const isReducedMotion = useReducedMotionPreference();

  const modelNode = (
    <mesh position={[0.58, -0.26, 0.06]} scale={0.95}>
      <icosahedronGeometry args={[0.94, 3]} />
      <meshStandardMaterial color="#dce6f1" roughness={0.9} metalness={0.03} />
    </mesh>
  );

  if (isReducedMotion) {
    return modelNode;
  }

  return (
    <Float
      speed={0.82}
      rotationIntensity={0.16}
      floatIntensity={0.26}
      floatingRange={[-0.12, 0.1]}
    >
      {modelNode}
    </Float>
  );
};

const CustomModel = ({ modelUrl }: { modelUrl: string }) => {
  const [loadedScene, setLoadedScene] = useState<Object3D | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [loadedModelUrl, setLoadedModelUrl] = useState<string | null>(null);
  const isReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!modelUrl) {
      return;
    }

    let isMounted = true;
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        if (!isMounted) {
          return;
        }

        const loaded = gltf.scene.clone(true);
        loaded.traverse((node) => {
          if ((node as Mesh).isMesh) {
            const mesh = node as Mesh;
            mesh.castShadow = false;
            mesh.receiveShadow = false;
          }
        });

        setLoadedScene(loaded);
        setLoadedModelUrl(modelUrl);
        setHasLoadingError(false);
      },
      undefined,
      () => {
        if (isMounted) {
          setLoadedScene(null);
          setLoadedModelUrl(null);
          setHasLoadingError(true);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  if (!modelUrl || !loadedScene || hasLoadingError || loadedModelUrl !== modelUrl) {
    return <FallbackSculpture />;
  }

  const modelNode = (
    <group scale={CUSTOM_MODEL_SCALE} position={[0.62, -0.36, 0]}>
      <primitive object={loadedScene} />
    </group>
  );

  if (isReducedMotion) {
    return modelNode;
  }

  return (
    <Float
      speed={0.78}
      rotationIntensity={0.13}
      floatIntensity={0.22}
      floatingRange={[-0.14, 0.09]}
    >
      {modelNode}
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0.08, 0.05, 6.9], fov: 33 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.02} />
        <directionalLight intensity={0.52} position={[2.8, 3.2, 2.4]} color="#f6f8fb" />
        <directionalLight intensity={0.25} position={[-2.8, -1.2, -1.8]} color="#d6deea" />

        <CustomModel modelUrl={CUSTOM_MODEL_URL} />
      </Canvas>
    </Suspense>
  );
};

export default HeroCanvas;
