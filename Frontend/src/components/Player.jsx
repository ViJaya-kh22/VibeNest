import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { usePlayer } from "./context/PlayerContext"
import { useEffect, useState } from "react"

const formatTime = (s) => {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const Player = () => {
  const { currentSong, isPlaying, togglePlay, audioRef, playNext, playPrev } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [audioRef]);

  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const ratio = e.nativeEvent.offsetX / bar.offsetWidth;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
  };

  return (
    <div className="h-16 fixed left-0 bottom-0 w-full bg-[#0a0a0a] border-t border-zinc-800 flex items-center px-4 md:px-8 gap-3 z-50">


      <div className="flex items-center gap-3 w-auto sm:w-[180px] min-w-0 shrink-0">
        <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
          <img
            className="h-full w-full object-cover"
            src={currentSong?.coverImg || "/song_bg.jpg"}
            alt="cover"
          />
        </div>
   
        <div className="hidden sm:block min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {currentSong?.title || "No song playing"}
          </p>
          <p className="text-xs text-zinc-500 truncate">
            {currentSong?.artist?.username || "—"}
          </p>
        </div>
      </div>

      {/* Controls + progress */}
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button onClick={playPrev} className="text-zinc-400 hover:text-white transition cursor-pointer">
            <SkipBack size={16} />
          </button>
          <button
            onClick={togglePlay}
            className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-zinc-200 transition cursor-pointer shrink-0"
          >
            {isPlaying
              ? <Pause size={13} className="text-black" fill="black" />
              : <Play size={13} className="text-black" fill="black" />
            }
          </button>
          <button onClick={playNext} className="text-zinc-400 hover:text-white transition cursor-pointer">
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-sm md:max-w-md">
          <span className="text-[10px] te xt-zinc-500 w-7 text-right shrink-0">
            {formatTime(currentTime)}
          </span>
          <div
            onClick={handleProgressClick}
            className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-white group-hover:bg-violet-500 rounded-full transition-colors"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 w-7 shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-[140px] justify-end shrink-0">
        {volume === 0
          ? <VolumeX size={15} className="text-zinc-400 shrink-0" />
          : <Volume2 size={15} className="text-zinc-400 shrink-0" />
        }
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 accent-white cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Player