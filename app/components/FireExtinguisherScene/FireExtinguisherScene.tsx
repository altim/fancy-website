"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FireExtinguisher from "../../components/FireExtinguisher/FireExtinguisher";
import styles from "./FireExtinguisherScene.module.scss";

export default function FireExtinguisherScene() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      className={styles.root}
    >
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      <FireExtinguisher />
    </Canvas>
  );
}
