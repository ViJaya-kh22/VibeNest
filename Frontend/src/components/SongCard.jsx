import { Play, Pause } from "lucide-react";
import { usePlayer } from "./context/PlayerContext";

const SongCard = ({ song , onClick }) => {

  const { playSong, currentSong, isPlaying } = usePlayer();
  const isThisSongPlaying = currentSong?._id === song._id && isPlaying;

  return (
    <div
     onClick={onClick}
     className="flex flex-col w-full hover:bg-zinc-800 rounded-sm cursor-pointer p-1.5 group relative ">
      <div className="h-40 w-full rounded-2xl overflow-hidden ">
        <img
          src={song.coverImg}
          alt="song"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="mt-2 font-semibold pl-2 truncate">{song.title}</span>
      <span className="text-sm text-gray-400 pl-2 truncate">{song.artist.username}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          playSong(song)
        }}
        className="absolute opacity-0 bottom-2 right-2 group-hover:opacity-100 transition bg-green-600 rounded-full p-2.5 cursor-pointer"
      >
        {isThisSongPlaying ? (
          <Pause size={16} fill="white" />
        ) : (
          <Play size={16} fill="white" />
        )}
      </button>
    </div>
  );
};

export default SongCard;