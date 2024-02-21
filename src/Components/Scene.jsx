import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "./Loader";
import { Plane } from "@react-three/drei";
import { Model as Marble } from "./3d/Marble";
import { useControls } from "leva";
import { TextureLoader } from "three";
import { Sparkles } from "@react-three/drei";
import DialogueBox from "./DialogueBox";

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

  return (
    <div className="relative h-screen w-screen">
      <Canvas shadows className="z-2">
        <ambientLight intensity={3} color={"#3F2305"} />

        <Suspense fallback={<Loader />}>
          <Marble />
          <Environment preset="studio" />
        </Suspense>
        <Sparkles
          count={100}
          scale={10}
          size={5}
          speed={0.6}
          color={"#B4B4B8"}
        />
        <Plane
          args={[100, 100]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, -10]}
        >
          <meshBasicMaterial
            attach="material"
            map={new TextureLoader().load("/intro_bg.png.webp")}
          />
        </Plane>
        <Html
          position={[
            window.innerWidth < 768 ? -1.5 : -7.2,
            window.innerWidth < 768 ? -1 : 0,
            0,
          ]}
        >
          <div className="flex justify-center items-center">
            <h1 className="md:text-[4.5rem] text-[2.5rem] font-thin text-black font-serif ">
              SOUND EXPERIENCE
            </h1>
          </div>
        </Html>
      </Canvas>
      <div className="w-10 h-20 absolute top-10 left-10 ">
        <img src="/icons/logo.png" alt="" className="f-full" />
      </div>
      <div className="w-20 h-20 absolute top-10 right-10">
        <a
          href=""
          className="text-black text-xl hover:text-black hover:tracking-wide transition-all duration-300 ease-in-out"
        >
          AboutUs
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
          className="w-10 h-10 absolute bottom-10 right-10 bg-white p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out"
        >
          <img
            src="/icons/audio.gif"
            alt=""
            className="w-full"
            onClick={() => setIsMusicPlaying(false)}
          />
        </div>
      ) : (
        <div
          onClick={handleMusic}
          className="w-10 h-10 absolute bottom-10 right-10 bg-black p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out"
        >
          <img
            src="/icons/audioOff.png"
            alt=""
            className="w-full"
            onClick={() => setIsMusicPlaying(true)}
          />
        </div>
      )}
    </div>
  );
}
