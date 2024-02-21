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
  const formRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [showDialogue, setShowDialogue] = useState(true);

  useEffect(() => {
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);
  useEffect(() => {
    if (!audio) setAudio(new Audio("/audios/bg-music.mp3"));
  }, []);

  const handleMusic = (shouldPlay) => {
    setPlaying(shouldPlay);
    setPlaying(!playing);
    if (shouldPlay) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
    }
  };

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
          <Environment preset='studio' />
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
      <div className=' absolute top-10 left-10 '>
        <img src='/icons/logo.png' alt='' className='w-14 object-contain' />
      </div>
      <div className='h-20 absolute top-10 right-10'>
        <a
          href=''
          className='text-black text-xl uppercase hover:text-black hover:tracking-wide transition-all duration-300 ease-in-out'
        >
          About Us
        </a>
      </div>
      {showDialogue && (
        <DialogueBox
          onClose={() => setShowDialogue(false)}
          onPlay={() => handleMusic(true)}
        />
      )}
      {playing ? (
        <div
          onClick={handleMusic}
          className='w-10 h-10 absolute bottom-10 right-10 bg-white p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out'
        >
          <img
            src='/icons/audio.gif'
            alt=''
            className='w-full'
            onClick={() => setIsMusicPlaying(false)}
          />
        </div>
      ) : (
        <div
          onClick={handleMusic}
          className='w-10 h-10 absolute bottom-10 right-10 bg-black p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out'
        >
          <img
            src='/icons/audioOff.png'
            alt=''
            className='w-full'
            onClick={() => setIsMusicPlaying(true)}
          />
        </div>
      )}
    </div>
  );
}
