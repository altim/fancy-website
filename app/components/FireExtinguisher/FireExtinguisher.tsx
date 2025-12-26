import { useGLTF } from "@react-three/drei";

export default function FireExtinguisher() {
  const fireExtinguisher = useGLTF("./fire_extinguisher/scene.gltf");

  return (
    <primitive
      object={fireExtinguisher.scene}
      scale={1}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}
