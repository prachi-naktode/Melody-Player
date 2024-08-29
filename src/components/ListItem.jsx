import React, { useContext, useEffect, useState } from "react";

import { useStore } from "zustand";
import useMusicStore from "../stores/music";

import { PlayerContext } from "../context/PlayerContext";

export default function ListItem({ musicObj, ind }) {

  let Musics = useStore(useMusicStore);
  let {
    musicsInfo,
    index,
    selectedMusicObj,
    setSelectedMusic,
    filteredMusic,
    addMusics,
    addFilteredMusics,
  } = Musics;

  const {
    currentAudioRef,
    progressBar,
    setIsPlaying,
    isPlaying,
    totalTime,
    setMuted,
  } = useContext(PlayerContext);

  const [listItemStatus, setListItemStatus] = useState(false);
  // console.log(musicObj);
  const handleSelectedMusic = async () => {
    // console.log(filteredMusic)
    // console.log(ind)
    setListItemStatus(true);
    await setSelectedMusic(musicObj, ind);
    await currentAudioRef.current.play();
    setIsPlaying(true);
    currentAudioRef.current.muted = false;
    setMuted(false);
  };

  const arr = [
    { id: 1, duration: "3:17" },
    { id: 2, duration: "2:20" },
    { id: 3, duration: "1:37" },
    { id: 4, duration: "1:54" },
    { id: 7, duration: "0:55" },
    { id: 8, duration: "2:17" },
    { id: 9, duration: "2:20" },
    { id: 10, duration: "2:28" },
  ];
  
  const obj1 = arr.filter((obj) => {
    return obj.id === musicObj.id
  })

  return (
    <div
      onClick={handleSelectedMusic}
      className="w-[100%] flex flex-row gap-[20px] justify-between items-center text-white text-opacity-[0%] p-[16px] hover:rounded-[8px] hover:bg-white hover:bg-opacity-[8%] "
    >
      <div className="h-[48px] flex flex-row gap-[16px]">
        <img
          src={`https://cms.samespace.com/assets/${musicObj.cover}`}
          alt="songImg"
          className="w-[48px] h-[48px] rounded-[50%]"
        />
        <div className="flex flex-col ">
          <p className="text-white text-[18px] font-Inter leading-[24px] font-normal">
            {musicObj.name}
          </p>
          <p className="text-white text-[14px] font-Inter text-opacity-[60%] leading-[24px] font-normal">
            {musicObj.artist}
          </p>
        </div>
      </div>

      <p className=" w-[37px] h-[24px] text-[18px] text-white leading-[24px] font-normal text-opacity-[60%] bg-green">
        {obj1[0].duration}
      </p>
    </div>
  );
}
