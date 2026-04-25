import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [songs ,setAllSongs]=useState([]);

  const playSong = (song) => {
    if (currentSong?._id === song._id) {

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNext = ()=>{
    const currentIndex = songs.findIndex(song => song._id === currentSong._id);
    const nextSong = songs[currentIndex + 1];
    if(nextSong) playSong(nextSong);
  };

  const playPrev = () =>{
    const currentIndex = songs.findIndex(song => song._id === currentSong._id);
    const prevSong = songs[currentIndex - 1];
    if (prevSong) playSong(prevSong);
  }

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, audioRef , setAllSongs , playNext , playPrev}}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);