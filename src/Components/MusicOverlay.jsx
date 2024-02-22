import React, { useEffect, useState } from "react";
import DialogueBox from "./DialogueBox";
import useMusicStore from "../utils/store";

export default function MusicOverlay() {
  const { playing, audio, setPlaying, setAudio, loadingComplete } =
    useMusicStore((state) => state);
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
    if (shouldPlay) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
    }
  };
  return (
    <div>
      {showDialogue && loadingComplete && (
        <DialogueBox
          onClose={() => setShowDialogue(false)}
          onPlay={() => handleMusic(true)}
        />
      )}
      {playing ? (
        <div className='w-10 h-10 absolute z-[4] bottom-10 right-10 bg-white p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out'>
          <img
            src='/icons/audio.gif'
            alt=''
            className='w-full'
            onClick={() => setPlaying(false)}
          />
        </div>
      ) : (
        <div className='w-10 h-10 absolute z-[4] bottom-10 right-10 bg-black p-2 rounded-full hover:opacity-40 transition-all duration-300 ease-in-out'>
          <img
            src='/icons/audioOff.png'
            alt=''
            className='w-full'
            onClick={() => setPlaying(true)}
          />
        </div>
      )}
    </div>
  );
}
