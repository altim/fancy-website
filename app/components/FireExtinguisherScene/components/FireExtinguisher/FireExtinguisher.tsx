import { useGLTF } from "@react-three/drei";

export default function FireExtinguisher() {
  const fireExtinguisher = useGLTF(
    "./fire_extinguisher2/FireExtinguisher2.gltf"
  );

  return (
    <primitive object={fireExtinguisher.scene} scale={3} position={[0, 0, 0]} />
  );
}
