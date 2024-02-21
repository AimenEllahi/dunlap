import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function Overlay() {
  const { progress } = useProgress();
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);
  useEffect(() => {
    if (!audio) setAudio(new Audio("/audios/bg-music.mp3"));
  }, []);

  // Function to handle Explore button click
  const handleYesClick = () => {
    //reduce volume
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();
    setPlaying(true);

    // Fade out the overlay elements
    const t1 = gsap.timeline();
    t1.to(".background", {
      display: "none",
      duration: 2,
      ease: "power2.inOut",
    })
      .to(".overlay-elements", {
        display: "none",
        pointerEvents: "none",
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(".music-controller", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
  };

  return (
    <>
      <div className="  absolute opacity-0 bottom-10 left-10 z-[20] music-controller flex items-center gap-x-2 flex-row-reverse volume">
        {" "}
        {playing && (
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => {
              setVolume(e.target.value / 100);
              audio.volume = e.target.value / 100;
            }}
            className=" h-1.5 z-[20] !w-20  opacity-40 hover:opacity-95 transition-all duration-200 ease-in-out cursor-pointer"
          ></input>
        )}
        <div onClick={() => setPlaying((prev) => !prev)}>
          {playing ? (
            <div
              onClick={handleMusic}
              className="w-10 h-10 bg-white p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out"
            >
              <img src="/icons/audio.gif" alt="" className="w-full" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-black p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out">
              <img src="/icons/audioOff.png" alt="" className="w-full" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-0 bottom-0 right-0 left-0  overlay-elements ">
        {/* Loader overlay */}
        <div
          className={`loader ${progress === 100 ? "loader-disappear" : ""}`}
        />

        {/* Overlay elements */}
        {progress === 100 && (
          <div className="flex background font-serif justify-around items-center flex-col h-full bg-gradient-to-t to-[#6B240C] from-white">
            <h1 className="text-white flex text-[5rem] p-0 m-0 transform translate-y-[-70%] absolute tracking-wide logo">
              Sound Experience
            </h1>
            <div className="mt-20">
              <span>Do you want to play sound?</span>
              <div className="flex gap-x-4">
                <button
                  onClick={handleYesClick}
                  className="text-black bg-white px-4 py-2 rounded mr-2"
                >
                  Yea
                </button>
                <button
                  className="text-white bg-black px-4 py-2 rounded"
                  onClick={() => {
                    setPlaying(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
