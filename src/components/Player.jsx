import React, { useContext, useEffect, useRef } from "react";

import { useStore } from "zustand";
import useMusicStore from "../stores/music";

import { PlayerContext } from "../context/PlayerContext";

function Player() {
  let Musics = useStore(useMusicStore);
  let {
    filteredMusic,
    index,
    selectedMusicObj,
    setSelectedMusic,
    setMusicTotalLength,
  } = Musics;

  // const currentMusic = useRef();
  const {
    currentAudioRef,
    progressBg,
    progressBar,
    isPlaying,
    setIsPlaying,
    updateProgressbar,
    muted,
    setMuted,
  } = useContext(PlayerContext);

  // const handleAudioProgressBar = (e) => {
  // //   setAudioProgress(e.target.value);
  // //   currentAudioRef.current.currentTime = e.target.value * currentAudioRef.current.duration/100
  // };

  const handlePlayPause = () => {
    if (currentAudioRef.current.paused) {
      currentAudioRef.current.play();
      setIsPlaying(true);
    } else {
      currentAudioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePrevMusic = async () => {
    if (index === 0) {
      index = filteredMusic.length - 1;
      await setSelectedMusic(filteredMusic[index], index);
    } else {
      index = index - 1;
      await setSelectedMusic(filteredMusic[index], index);
    }
    await currentAudioRef.current.play();
    setIsPlaying(true);
    currentAudioRef.current.muted = false;
    setMuted(false);
  };

  const handleNextMusic = async () => {
    if (index === filteredMusic.length - 1) {
      index = 0;
      await setSelectedMusic(filteredMusic[index], index);
    } else {
      index = index + 1;
      await setSelectedMusic(filteredMusic[index], index);
    }
    await currentAudioRef.current.play();
    setIsPlaying(true);
    currentAudioRef.current.muted = false;
    setMuted(false);
  };

  //setting the length of audio
  // const handleAudioUpdate = () => {
  // //   const progress = parseInt((currentAudioRef.current.currentTime / currentAudioRef.current.duration) * 100);
  //   //   setAudioProgress(isNaN(progress) ? 0 : progress)

  //   progressBar.current.style.width = (Math.floor(currentAudioRef.current.currentTime / currentAudioRef.current.duration * 100))+"%"
  // }

  const handleMute = () => {
    if (currentAudioRef.current.muted) {
      currentAudioRef.current.muted = false;
      setMuted(false);
    } else {
      currentAudioRef.current.muted = true;
      setMuted(true);
    }
  };
  return (
    <div className=" w-full h-full pb-[60px] flex justify-center items-center lg:h-[100vh] lg:w-[50%] lg:pb-0">
      <div className="w-[70%] flex flex-col items-start gap-[32px] mt-[40px] lg:w-[480px] lg:h-full lg:justify-center lg:mt-0 lg:py-[40px]  ">
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-[32px] font-bold leading-[36px] text-white leading-[36px]">
            {selectedMusicObj.name}
          </h2>
          <p className="text-white text-[16px] text-opacity-[60%] font-normal leading-[24px]">
            {selectedMusicObj.artist}
          </p>
        </div>

        <audio
          src={selectedMusicObj.url}
          ref={currentAudioRef}
          onEnded={handleNextMusic}
        ></audio>

        <div className="flex flex-col min-w-[100%] gap-[24px] lg:w-[70%]">
          <img
            className="songImg rounded-[8px] h-[370px] w-[100%] lg:max-h-[400px] lg:w-[100%]"
            src={`https://cms.samespace.com/assets/${selectedMusicObj.cover}`}
            alt=""
          />
          <div
            ref={progressBg}
            onClick={updateProgressbar}
            className="controllers w-full h-[7px] bg-white bg-opacity-[20%] rounded-[16px] cursor-pointer hover:bg-opacity-[25%]"
          >
            {/* <input
              type="range"
              name="audioProgressBar"
              className="w-full"
              value={audioProgress}
              onChange={handleAudioProgressBar}
            /> */}
            <div
              ref={progressBar}
              className="h-full w-0 bg-white rounded-[16px]"
            ></div>
          </div>
        </div>

        <div className="controllers w-[100%] flex flex-row justify-between ">
          <div className="w-[48px] h-[48px] flex cursor-pointer ">
            <div className="h-full w-full flex justify-center items-center bg-white bg-opacity-[10%] rounded-[50%] hover:bg-opacity-[15%]">
              <i className="fa-solid fa-ellipsis text-white text-[24px]"></i>
            </div>
          </div>

          <div className="w-[136px] h-[50.42px] flex flex-row justify-between items-center md:w-[176px] md:h-[50.42px]">
            <div
              onClick={handlePrevMusic}
              className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer  rounded-full hover:bg-white hover:bg-opacity-[20%]"
            >
              <i className="fa-solid fa-backward text-white text-opacity-[60%] text-[24px]"></i>
            </div>

            <div
              onClick={handlePlayPause}
              className="w-[48px] h-[48px] flex justify-center items-center bg-white rounded-[50%] cursor-pointer hover:bg-opacity-[90%]"
            >
              {!isPlaying ? (
                <i className="fa-solid fa-play text-[24px]"></i>
              ) : (
                <i className="fa-sharp fa-solid fa-pause text-[24px] "></i>
              )}
            </div>

            <div
              onClick={handleNextMusic}
              className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer  rounded-full hover:bg-white hover:bg-opacity-[20%]"
            >
              <i className="fa-solid fa-forward text-white text-opacity-[60%] text-[22px] hover:text-opacity-[70%] "></i>
            </div>
          </div>

          <div className="w-[48px] h-[48px] flex cursor-pointer">
            <div
              onClick={handleMute}
              className="h-full w-full flex justify-center items-center bg-white bg-opacity-[10%] rounded-[50%] hover:bg-opacity-[15%]"
            >
              {muted ? (
                <i className="fa-solid fa-volume-xmark text-white text-[20px]"></i>
              ) : (
                <i className="fa-solid fa-volume-high text-white text-[20px]"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
