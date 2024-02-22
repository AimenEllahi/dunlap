import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "./Loader";

import { Model as Marble } from "./3d/Marble";
import { Sparkles } from "@react-three/drei";
import DialogueBox from "./DialogueBox";
import { gsap } from "gsap";
import SplitType from "split-type";

export default function Scene() {
  useEffect(() => {
    const ourText = new SplitType(".anim-text", { types: "chars" });
    const chars = ourText.chars;

    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div className='relative max-h-screen max-w-screen h-screen w-screen overflow-hidden  '>
      <Canvas shadows className='z-2'>
        <ambientLight intensity={3} color={"#3F2305"} />

        <Suspense fallback={<Loader />}>
          <Marble />
          <Environment files='/env/studio_small_03_1k.hdr' />
        </Suspense>
        <Sparkles
          count={100}
          scale={10}
          size={5}
          speed={0.6}
          color={"#B4B4B8"}
        />
      </Canvas>
      <div className='flex justify-center flex-col absolute   bottom-[20%] left-5 items-start w-[30rem] '>
        <h1 className='md:text-[4.5rem] tinos-bold text-[2.5rem] font-thin text-black leading-[5rem] anim-text'>
          SOUND
        </h1>
        <h1 className='md:text-[4.5rem] tinos-bold text-[2.5rem] font-thin text-black leading-[5rem] anim-text'>
          EXPERIENCE
        </h1>
      </div>
    </div>
  );
}
