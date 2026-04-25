import { Disc3, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreAlbums = ({ albums, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <h2 className="text-base font-bold mb-4 flex items-center gap-2">
        <Disc3 size={16} className="text-purple-400" /> Explore Albums
      </h2>
      {loading
        ? <p className="text-zinc-500 text-sm text-center py-6">Loading…</p>
        : albums.length === 0
          ? <p className="text-zinc-500 text-sm text-center py-6">No albums available yet.</p>
          : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {albums.map(a => (
                <div
                  key={a._id}
                  onClick={() => navigate(`/album/${a._id}`)}
                  className="bg-zinc-800 hover:bg-zinc-700 rounded-xl p-3 cursor-pointer transition group"
                >
                  <div className="h-24 w-full rounded-lg overflow-hidden bg-zinc-700 mb-2 relative">
                    {a.coverImg
                      ? <img src={a.coverImg} alt={a.title} className="h-full w-full object-cover" />
                      : <div className="h-full w-full flex items-center justify-center"><Disc3 size={24} className="text-zinc-600" /></div>
                    }
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Play size={20} fill="white" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold truncate">{a.title}</p>
                  <p className="text-xs text-zinc-400">{a.music?.length || 0} songs</p>
                </div>
              ))}
            </div>
          )
      }
    </div>
  );
};

export default ExploreAlbums;