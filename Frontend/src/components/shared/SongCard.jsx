import { Music, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SongCard = ({ song, showHover = false }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/song/${song._id}`)}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 cursor-pointer transition group"
    >
      <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-700 shrink-0 relative">
        {song.coverImg
          ? <img src={song.coverImg} alt={song.title} className="h-full w-full object-cover" />
          : <div className="h-full w-full flex items-center justify-center"><Music size={14} className="text-zinc-500" /></div>
        }
        {showHover && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Play size={12} fill="white" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold truncate">{song.title}</p>
        <p className="text-xs text-zinc-400 truncate">
          {song.artist?.username || song.genere}
        </p>
      </div>
      <span className="text-xs text-zinc-500 shrink-0">
        {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}
      </span>
    </div>
  );
};

export default SongCard;