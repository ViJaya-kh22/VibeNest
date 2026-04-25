import { Music, Trash2 } from "lucide-react";
import {useNavigate} from "react-router-dom"
import axios from "axios"

const MySongsList = ({ songs , onDelete}) => {

  const navigate = useNavigate();

  const formatDuration = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;


  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <h2 className="text-base font-bold mb-3 flex items-center gap-2">
        <Music size={16} className="text-green-400" /> My Songs
      </h2>
      {songs.length === 0 ? (
        <p className="text-zinc-500 text-sm text-center py-6">
          No songs yet. Upload your first track!
        </p>
      ) : (
        <div className="flex flex-col gap-2 h-full min-h-52 overflow-y-auto">
          {songs.map((s) => (
            <div key={s._id} 
            onClick = {()=> navigate(`/song/${s._id}`)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-700 shrink-0">
                {s.coverImg
                  ? <img src={s.coverImg} alt={s.title} className="h-full w-full object-cover" />
                  : <div className="h-full w-full flex items-center justify-center"><Music size={14} className="text-zinc-500" /></div>
                }
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{s.title}</p>
                <p className="text-xs text-zinc-400 truncate">{s.genere}</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500 shrink-0">
                {formatDuration(s.duration)}
              </span>
        <button
              onClick={async (e) => {
              e.stopPropagation(); 
              await axios.delete(`http://localhost:3000/api/music/song/${s._id}`, { withCredentials: true });
              onDelete();
           }}
            className="ml-auto text-zinc-500 hover:text-red-400 transition p-1"
          >
              <Trash2 size={14} />
        </button> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySongsList;