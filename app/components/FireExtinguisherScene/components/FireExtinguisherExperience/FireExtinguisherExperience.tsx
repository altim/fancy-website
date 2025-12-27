"use client";

import { useLenis } from "@/app/contexts/LenisContext";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import FireExtinguisher from "../FireExtinguisher/FireExtinguisher";

interface FireExtinguisherExperienceProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function FireExtinguisherExperience({
  wrapperRef,
}: FireExtinguisherExperienceProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const fireExtinguisherRef = useRef<THREE.Group>(null);
  const scrollProgressRef = useRef(0); // Store scroll progress for useFrame
  const lenis = useLenis();

  const {
    initialCameraPosition,
    finalCameraPosition,
    initialCameraTarget,
    finalCameraTarget,
  } = useControls("Camera", {
    initialCameraPosition: {
      value: { x: 0, y: 1, z: 1.2 },
      step: 0.1,
      min: -10,
      max: 10,
    },
    finalCameraPosition: {
      value: { x: 0, y: 1, z: 2 },
      step: 0.1,
      min: -10,
      max: 10,
    },
    initialCameraTarget: {
      value: { x: -0.5, y: 0.9, z: 0 },
      step: 0.1,
      min: -10,
      max: 10,
    },
    finalCameraTarget: {
      value: { x: 1, y: 0.7, z: 0 },
      step: 0.1,
      min: -10,
      max: 10,
    },
  });

  const { initialRotation, finalRotation } = useControls("Object Rotation", {
    initialRotation: {
      value: { x: 0, y: -Math.PI / 4, z: 0 },
      step: 0.1,
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    finalRotation: {
      value: { x: 0, y: 5.2, z: 0.2 },
      step: 0.1,
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
  });

  // Update scroll progress from Lenis
  useEffect(() => {
    if (!lenis || !wrapperRef?.current) return;

    const handleScroll = (e: { scroll: number }) => {
      const windowHeight = window.innerHeight;
      const wrapperStart = wrapperRef.current!.offsetTop;
      const wrapperHeight = wrapperRef.current!.offsetHeight;

      // Start when wrapper top hits viewport top, end when wrapper bottom hits viewport bottom
      const scrollStart = wrapperStart;
      const scrollEnd = wrapperStart + wrapperHeight - windowHeight;

      const progress = Math.max(
        0,
        Math.min(1, (e.scroll - scrollStart) / (scrollEnd - scrollStart))
      );

      // Store in ref so useFrame can access it
      scrollProgressRef.current = progress;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, wrapperRef]);

  useFrame(() => {
    if (cameraRef.current && fireExtinguisherRef.current) {
      const progress = scrollProgressRef.current;

      cameraRef.current.position.lerpVectors(
        new THREE.Vector3(
          initialCameraPosition.x,
          initialCameraPosition.y,
          initialCameraPosition.z
        ),
        new THREE.Vector3(
          finalCameraPosition.x,
          finalCameraPosition.y,
          finalCameraPosition.z
        ),
        scrollProgressRef.current
      );

      const cameraTarget = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(
          initialCameraTarget.x,
          initialCameraTarget.y,
          initialCameraTarget.z
        ),
        new THREE.Vector3(
          finalCameraTarget.x,
          finalCameraTarget.y,
          finalCameraTarget.z
        ),
        scrollProgressRef.current
      );

      cameraRef.current.lookAt(cameraTarget);

      // Interpolate object rotation
      fireExtinguisherRef.current.rotation.x = THREE.MathUtils.lerp(
        initialRotation.x,
        finalRotation.x,
        progress
      );
      fireExtinguisherRef.current.rotation.y = THREE.MathUtils.lerp(
        initialRotation.y,
        finalRotation.y,
        progress
      );
      fireExtinguisherRef.current.rotation.z = THREE.MathUtils.lerp(
        initialRotation.z,
        finalRotation.z,
        progress
      );

      console.log(scrollProgressRef.current);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={
          new THREE.Vector3(
            initialCameraPosition.x,
            initialCameraPosition.y,
            initialCameraPosition.z
          )
        }
        fov={50}
      />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />
      <group
        ref={fireExtinguisherRef}
        rotation={[initialRotation.x, initialRotation.y, initialRotation.z]}
      >
        <Float floatIntensity={0} rotationIntensity={0.5}>
          <FireExtinguisher />
        </Float>
      </group>
    </>
  );
}
