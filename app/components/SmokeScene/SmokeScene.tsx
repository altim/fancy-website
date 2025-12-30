"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import styles from "./SmokeScene.module.scss";

const SmokeExperience = dynamic(
  () => import("./components/SmokeExperience/SmokeExperience"),
  { ssr: false }
);

interface SmokeSceneProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function SmokeScene({ wrapperRef }: SmokeSceneProps) {
  return (
    <Canvas
      className={styles.root}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: false }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <SmokeExperience wrapperRef={wrapperRef} />
    </Canvas>
  );
}
