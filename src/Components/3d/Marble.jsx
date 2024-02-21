import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/marble11.glb");
  const group = useRef();

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

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      scale={window.innerWidth < 768 ? 1 : 2}
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
