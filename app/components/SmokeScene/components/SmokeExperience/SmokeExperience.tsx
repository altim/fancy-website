"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { smokeVertexShader, smokeFragmentShader } from "../../shaders/smokeShader";

interface SmokeExperienceProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function SmokeExperience({
  wrapperRef,
}: SmokeExperienceProps) {
  const smokeMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Update shader uniforms each frame
  useFrame((state) => {
    if (!smokeMaterialRef.current) return;

    // Update time uniform for constant animation
    smokeMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      {/* Smoke background plane */}
      <mesh position={[0, 0, 0]} scale={[10, 10, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          ref={smokeMaterialRef}
          vertexShader={smokeVertexShader}
          fragmentShader={smokeFragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </>
  );
}
