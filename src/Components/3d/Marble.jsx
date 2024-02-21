import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/marble11.glb");
  const group = useRef();
  const targetRotation = useRef([0, 0, 0]); // Store the target rotation

  // Slow continuous rotation
  useFrame((state, delta) => {
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x,
      0.04
    );

    // Smoothly rotate towards the target rotation
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y,
      0.04
    );
  });

  //continuous rotation
  useFrame((state, delta) => {
    group.current.rotation.z += 0.001;
  });

  // State to store mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    // Normalize mouse position to range [-1, 1]
    const x = (clientX / window.innerWidth) * 2 - 4;
    const y = -(clientY / window.innerHeight) * 2 + 4;

    // Update the target rotation based on mouse movement
    targetRotation.current = [
      -Math.PI / 2 + y * 0.5, // Adjust sensitivity as needed
      0,
      x * 0.5, // Adjust sensitivity as needed
    ];

    setMousePosition({ x, y });
  };

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      scale={window.innerWidth < 768 ? 1 : 2}
      onPointerMove={handleMouseMove}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.Material}
      />
    </group>
  );
}

useGLTF.preload("/models/marble11.glb");
