import { create } from "zustand";

const useMusicStore = create((set) => ({
  musicsInfo: [],
  index: 0,
  filteredMusic: [],
  selectedMusicObj: {},
  musicTotalLength: '00:00',
  
  setSelectedMusic: (obj,ind) => {
    set((state) => ({
      selectedMusicObj: obj,
      index: ind
    }));
  },

  addMusics: (obj) => {
    set({musicsInfo: obj})
  },

  addFilteredMusics: (obj) => {
    set({ filteredMusic: obj });
  },
}));

export default useMusicStore;
