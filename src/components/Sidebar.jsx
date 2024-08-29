import React, { useState } from "react";
import ListItem from "../components/ListItem";
import { TABS } from "../Pages/HomePage";

import useMusicStore from "../stores/music";
import { useStore } from "zustand";

export default function Sidebar({ activeTab, setActiveTab }) {
  let Musics = useStore(useMusicStore);
  //   console.log(Musics)
  let { index, selectedMusicObj, setSelectedMusic,filteredMusic, addFilteredMusics } = Musics;

  const [searchMusicInput, setMusicInput] = useState("");

  const handleActiveTabForYou = () => {
    setActiveTab(TABS.forYou);
  };

  const handleActiveTabForTracks = () => {
    setActiveTab(TABS.topTracks);
  };

  const handleSearchMusicInput = (e) => {
    setMusicInput(e.target.value);
  };

  return (
    <div className="flex flex-col px-[50px] gap-[20px] pt-[40px] bg-transparent text-white lg:max-h-[100vh] lg:px-0">
      <div className="flex flex-row justify-start gap-[30%] px-[16px] lg:gap-[40px]">
        <div
          onClick={handleActiveTabForYou}
          className={`text-[24px] ${
            activeTab === TABS.forYou
              ? "text-white"
              : "text-white text-opacity-[50%]"
          }  font-Inter font-bold leading-[32px] hover:cursor-pointer`}
        >
          For You
        </div>
        <div
          onClick={handleActiveTabForTracks}
          className={`text-[24px] font-bold font-Inter ${
            activeTab === TABS.forYou
              ? "text-white text-opacity-[50%]"
              : "text-white"
          }  font-Inter font-bold leading-[32px] hover:cursor-pointer`}
        >
          Top Track
        </div>
      </div>

      <div className="flex justify-between items-center rounded-[8px] border-0 py-[8px] px-[16px] bg-white bg-opacity-[8%]">
        <input
          className="text-[18px] font-normal text-opacity-[60%] text-white leading-[28px] bg-transparent outline-none "
          placeholder="Search Song, Artist"
          value={searchMusicInput}
          onChange={handleSearchMusicInput}
        ></input>
        <div className="flex flex-wrap items-center w-[32px] h-[32px] opacity-[40%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="listItemContainer w-[100%] max-h-[100%]  flex flex-col justify-between items-center scrollbar-none scrollbar-thumb-slate-300 scrollbar-thin scrollbar-thumb-rounded-full hover:cursor-pointer lg:max-h-[100vh] lg:overflow-y-scroll lg:">
        {filteredMusic
          .filter((musicObj) => {
            return (
              musicObj.name
                .toLowerCase()
                .includes(searchMusicInput.toLowerCase()) ||
              musicObj.artist
                .toLowerCase()
                .includes(searchMusicInput.toLowerCase())
            );
          })
          .map((musicObj, index) => {
            return <ListItem key={index} musicObj={musicObj} ind={index} />;
          })}
        {/* {musics
          .filter((musicObj) => {
            return (
              musicObj.name
                .toLowerCase()
                .includes(searchMusicInput.toLowerCase()) ||
              musicObj.artist
                .toLowerCase()
                .includes(searchMusicInput.toLowerCase())
            );
          })
          .map((musicObj, index) => {
            return <ListItem key={index} musicObj={musicObj} />;
          })} */}
      </div>
    </div>
  );
}
