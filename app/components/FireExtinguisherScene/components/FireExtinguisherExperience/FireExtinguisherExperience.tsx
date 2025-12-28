"use client";

import { useLenis } from "@/app/contexts/LenisContext";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import FireExtinguisher from "../FireExtinguisher/FireExtinguisher";

type AnimationStep = {
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
  cameraTarget: {
    x: number;
    y: number;
    z: number;
  };
  objectRotation: {
    x: number;
    y: number;
    z: number;
  };
};

const animationSteps: AnimationStep[] = [
  {
    cameraPosition: {
      x: 0,
      y: 1.1,
      z: 1.2,
    },
    cameraTarget: {
      x: 0,
      y: 1.3,
      z: 0,
    },
    objectRotation: {
      x: 0,
      y: -(Math.PI / 3 + 2 * Math.PI),
      z: 0,
    },
  },
  {
    cameraPosition: {
      x: 0,
      y: 1,
      z: 1.2,
    },
    cameraTarget: {
      x: -0.5,
      y: 0.9,
      z: 0,
    },
    objectRotation: {
      x: 0,
      y: -2,
      z: 0.2,
    },
  },
  {
    cameraPosition: {
      x: 0,
      y: 1,
      z: 2,
    },
    cameraTarget: {
      x: 1,
      y: 0.7,
      z: 0,
    },
    objectRotation: {
      x: 0,
      y: 5.2,
      z: 0.2,
    },
  },
];

const getCurrentAnimationSteps = (progress: number) => {
  const numberOfSteps = animationSteps.length - 1;
  const switchingProgressValue = 1 / numberOfSteps;

  const currentStepsPair = Math.min(
    Number(Math.floor(progress / switchingProgressValue)),
    numberOfSteps - 1
  );

  return [
    animationSteps[currentStepsPair],
    animationSteps[currentStepsPair + 1],
  ];
};

interface FireExtinguisherExperienceProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

// Easing function for smooth start and end
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function FireExtinguisherExperience({
  wrapperRef,
}: FireExtinguisherExperienceProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const fireExtinguisherRef = useRef<THREE.Group>(null);
  const scrollProgressRef = useRef(0); // Store scroll progress for useFrame
  const lenis = useLenis();

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
      const [firstAnimationStep, secondAnimationStep] =
        getCurrentAnimationSteps(scrollProgressRef.current);

      // Remap progress so that it goes twice from 0 to 100%
      const remappedProgress =
        scrollProgressRef.current < 1
          ? Math.min((scrollProgressRef.current * 2) % 1, 1)
          : 1;

      const progress = easeInOutCubic(remappedProgress);

      cameraRef.current.position.lerpVectors(
        new THREE.Vector3(
          firstAnimationStep.cameraPosition.x,
          firstAnimationStep.cameraPosition.y,
          firstAnimationStep.cameraPosition.z
        ),
        new THREE.Vector3(
          secondAnimationStep.cameraPosition.x,
          secondAnimationStep.cameraPosition.y,
          secondAnimationStep.cameraPosition.z
        ),
        progress
      );

      const cameraTarget = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(
          firstAnimationStep.cameraTarget.x,
          firstAnimationStep.cameraTarget.y,
          firstAnimationStep.cameraTarget.z
        ),
        new THREE.Vector3(
          secondAnimationStep.cameraTarget.x,
          secondAnimationStep.cameraTarget.y,
          secondAnimationStep.cameraTarget.z
        ),
        progress
      );

      cameraRef.current.lookAt(cameraTarget);

      // Interpolate object rotation
      fireExtinguisherRef.current.rotation.x = THREE.MathUtils.lerp(
        firstAnimationStep.objectRotation.x,
        secondAnimationStep.objectRotation.x,
        progress
      );
      fireExtinguisherRef.current.rotation.y = THREE.MathUtils.lerp(
        firstAnimationStep.objectRotation.y,
        secondAnimationStep.objectRotation.y,
        progress
      );
      fireExtinguisherRef.current.rotation.z = THREE.MathUtils.lerp(
        firstAnimationStep.objectRotation.z,
        secondAnimationStep.objectRotation.z,
        progress
      );
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={
          new THREE.Vector3(
            animationSteps[0].cameraPosition.x,
            animationSteps[0].cameraPosition.y,
            animationSteps[0].cameraPosition.z
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
        rotation={[
          animationSteps[0].objectRotation.x,
          animationSteps[0].objectRotation.y,
          animationSteps[0].objectRotation.z,
        ]}
      >
        <Float floatIntensity={0} rotationIntensity={0.5}>
          <FireExtinguisher />
        </Float>
      </group>
    </>
  );
}
