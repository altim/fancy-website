"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import styles from "./FireExtinguisherScene.module.scss";

const FireExtinguisherExperience = dynamic(
  () =>
    import(
      "./components/FireExtinguisherExperience/FireExtinguisherExperience"
    ),
  { ssr: false }
);

interface FireExtinguisherSceneProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function FireExtinguisherScene({
  wrapperRef,
}: FireExtinguisherSceneProps) {
  return (
    <Canvas shadows className={styles.root}>
      <FireExtinguisherExperience wrapperRef={wrapperRef} />
    </Canvas>
  );
}
