import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

import Logo from "../assets/Logo.svg";
import Profile from "../assets/Profile.svg";
import axios from "axios";

import useMusicStore from "../stores/music";
import { useStore } from "zustand";

import "./HomePage.css";

export const TABS = {
  forYou: "forYou",
  topTracks: "topTracks",
};

export default function HomePage() {
  let Musics = useStore(useMusicStore);
  let { musicsInfo, index, selectedMusicObj, setSelectedMusic, filteredMusic, addMusics, addFilteredMusics } = Musics;

  // const [musics, setMusics] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.forYou);

  const [showMusicList, setShowMusicList] = useState(false);

  useEffect(() => {
   axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        // console.log(response.data.data[0]);
        addMusics(response.data.data);
        // setMusics(response.data.data);
        setSelectedMusic(response.data.data[0],0);
        addFilteredMusics(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error response :- ");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("Error request :- ", error.request);
        } else {
          console.log("Error :- ", error.message);
        }
        console.log(error.config);
      });
  }, []);

  useEffect(() => {
    if (activeTab == TABS.topTracks) {
      let musicList = musicsInfo.filter((obj) => obj.top_track === true);
      addFilteredMusics(musicList);
    } else {
      addFilteredMusics(musicsInfo);
    }
  }, [activeTab]);

  const handleMusicListToggle = () => {
    setShowMusicList(!showMusicList);
  };

  
  return (
    <div
      className=" flex flex-col max-w-[100vw] min-h-[100vh] justify-around bg-black lg:max-h-[100vh] lg:max-w-[100vw] lg:flex-row lg:justify-between"
      style={{
        background: `linear-gradient(108deg, ${selectedMusicObj.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
      }}
    >
      <div className=" logoDiv px-[40px] pt-[35px] max-w-[100%] h-[70px] flex flex-row justify-between items-center lg:w-[20%] lg:min-h-[100vh] lg:flex-col lg:px-0 lg:pt-0 lg:items-start">
        <div className=" flex justify-center items-center lg:mt-[32px] lg:justify-start lg:ml-[32px]">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="flex flex-row gap-[18px]">
          <div
            onClick={handleMusicListToggle}
            className=" w-[46px] h-[46px] flex justify-center items-center bg-white bg-opacity-[10%] rounded-[40%] hover:bg-opacity-[30%] lg:hidden "
          >
            <i className="fa-solid fa-bars text-white text-[24px]"></i>
          </div>
          <div className=" flex items-center w-[50px] lg:ml-[32px] lg:mb-[27px]">
            <img src={Profile} alt="Profile" />
          </div>
        </div>
      </div>

      <div
        className={`${ showMusicList ? 'w-[100%] mt-[20px]' : 'hidden'} overflow-y-auto lg:w-[30%] lg:max-h-[100vh] lg:mt-0 lg:block`}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Player />
    </div>
  );
}
