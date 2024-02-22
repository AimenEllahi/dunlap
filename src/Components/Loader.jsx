import React, { useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import useMusicStore from "../utils/store";
export default function Loader() {
  const { progress } = useProgress();
  const { setLoadingComplete } = useMusicStore((state) => state);
  useEffect(() => {
    if (progress >= 95) {
      setLoadingComplete(true);
    }
  }, [progress]);

  return (
    <Html
      className='absolute helvetica top-0 left-0 bg-white !z-[10] w-screen h-screen flex items-center justify-center'
      center
    >
      <span className='text-black text-[20rem]'> {progress.toFixed(0)}</span>
    </Html>
  );
}
