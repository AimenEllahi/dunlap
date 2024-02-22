import { create } from "zustand";

const Store = create((set) => ({
  audio: null,
  playing: false,
  loadingComplete: false,
  volume: 0.5,
  setLoadingComplete: (loadingComplete) => set({ loadingComplete }),
  setPlaying: (playing) => set({ playing }),
  setAudio: (audio) => set({ audio }),
}));

export default Store;
