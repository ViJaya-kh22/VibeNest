import { Disc3 , Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const MyAlbumList = ({ albums , onDelete}) => {

  const navigate = useNavigate(); 

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <h2 className="text-base font-bold mb-3 flex items-center gap-2">
        <Disc3 size={16} className="text-green-400" /> My Albums
      </h2>
      {albums.length === 0 ? (
        <p className="text-zinc-500 text-sm text-center py-6">No albums yet.</p>
      ) : (
        <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
          {albums.map((a) => ( 
            <div
              key={a._id}
              onClick={() => navigate(`/album/${a._id}`)}  
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800 transition cursor-pointer"
            >
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-700 shrink-0">
                {a.coverImg
                  ? <img src={a.coverImg} alt={a.title} className="h-full w-full object-cover" />
                  : <div className="h-full w-full flex items-center justify-center"><Disc3 size={14} className="text-zinc-500" /></div>
                }
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{a.title}</p>
                <p className="text-xs text-zinc-400 truncate">{a.genere}</p>
              </div>
               <button
              onClick={async (e) => {
              e.stopPropagation(); 
              await axios.delete(`http://localhost:3000/api/music/album/${a._id}`, { withCredentials: true });
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

export default MyAlbumList;