import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const currentAudioRef = useRef();
  const progressBg = useRef();
  const progressBar = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState({
    minute: 0,
    second: 0,
  });

  const [totalTime, setTotalTime] = useState({
    minute: 0,
    second: 0,
  });

  const [muted, setMuted] = useState(false);

  const updateProgressbar = (e) => {
    // console.log(e.nativeEvent.offsetX);
    currentAudioRef.current.currentTime =
      (e.nativeEvent.offsetX / progressBg.current.offsetWidth) *
      currentAudioRef.current.duration;
  };
  useEffect(() => {
    setTimeout(() => {
      currentAudioRef.current.ontimeupdate = () => {
        progressBar.current.style.width =
          Math.floor(
            (currentAudioRef.current.currentTime /
              currentAudioRef.current.duration) *
              100
          ) + "%";
        setTotalTime({
          totalTime: {
            minute: Math.floor(currentAudioRef.current.duration / 60),
            second: Math.floor(currentAudioRef.current.duration % 60),
          },
        });
        // console.log(currentAudioRef.current.duration)
      };
    }, 1000);
  }, [currentAudioRef]);

  const contextVal = {
    currentAudioRef,
    progressBg,
    progressBar,
    isPlaying,
    setIsPlaying,
    currTime,
    setCurrTime,
    totalTime,
    setTotalTime,
    updateProgressbar,
    muted,
    setMuted,
  };

  return (
    <PlayerContext.Provider value={contextVal}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
