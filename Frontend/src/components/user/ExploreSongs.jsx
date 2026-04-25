import { Music } from "lucide-react";
import SongCard from "../shared/SongCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ExploreSongs = ({ songs, loading }) => (
  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
    <h2 className="text-base font-bold mb-4 flex items-center gap-2">
      <Music size={16} className="text-purple-400" /> Explore Songs
    </h2>
    {loading
      ? <p className="text-zinc-500 text-sm text-center py-6">Loading…</p>
      : songs.length === 0
        ? <p className="text-zinc-500 text-sm text-center py-6">No songs available yet.</p>
        : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
            {songs.map(s => <SongCard key={s._id} song={s} showHover />)}
          </div>
        )
    }
  </div>
);

export default ExploreSongs;