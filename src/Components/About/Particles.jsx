import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import Content from "./Content";
export default function Particles() {
  return (
    <div className='relative   max-w-screen  h-full w-screen overflow-x-hidden '>
      <div className='fixed w-screen h-screen  top-0 overflow-x-hidden'>
        <Canvas shadows className='  z-[1]'>
          <ambientLight intensity={3} color={"#3F2305"} />
          <Sparkles
            count={100}
            scale={10}
            size={5}
            speed={0.6}
            color={"#B4B4B8"}
          />
        </Canvas>
      </div>
      <Content />
    </div>
  );
}
