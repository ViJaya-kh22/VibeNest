import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Music, Disc3 } from "lucide-react";
import UploadSongForm from "./UploadSongForm";
import UploadAlbumForm from "./UploadAlbumForm";
import MySongsList from "./MySongsList";
import MyAlbumList from "./MyAlbumList";
import api from "../utils/axiosInstance";


const ArtistProfile = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("song");
  const [mySongs, setMySongs] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);
  const [toast, setToast] = useState(null);


  const fetchSongs = async () => {
    try {
      const res = await api.get(`/music/my-songs`, { withCredentials: true });
      setMySongs(res.data.songs);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAlbums = async () => {
    try {
      const albumsdata = await api.get(`/music/my-albums`);
      setMyAlbums(albumsdata.data.albums)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { fetchSongs(); fetchAlbums(); }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const initials = user?.username?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="h-full overflow-y-auto pb-24 px-6 py-6 bg-zinc-950">
      {toast && <div className="fixed top-24 right-16 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl text-sm font-semibold">{toast}</div>}

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-base md:text-2xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl md:text-3xl font-bold">{user?.username}</h1>
            <span className="text-xs bg-emerald-700 text-white px-3 py-1 rounded-full font-semibold">
              Artist
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">{user?.email}</p>
          <p className="text-sm text-zinc-400 mt-2">
            <span className="text-white font-bold">{mySongs.length}</span> Songs
            <span className="text-white font-bold pl-1">{myAlbums.length}</span> Ablums
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload panel */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <div className="flex bg-zinc-800 rounded-xl p-1 mb-6">
            {[{ key: "song", label: "Upload Song", icon: <Music size={14} /> },
            { key: "album", label: "Create Album", icon: <Disc3 size={14} /> }
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition ${tab === t.key ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          {tab === "song"
            ? <UploadSongForm onSuccess={(msg) => { setToast(msg); fetchSongs(); }} />
            : <UploadAlbumForm songs={mySongs} onSuccess={(msg) => { setToast(msg); fetchAlbums(); }} />
          }
        </div>

        <MySongsList songs={mySongs} onDelete={fetchSongs} />
        <MyAlbumList albums={myAlbums} onDelete={fetchAlbums} />
      </div>
    </div>
  );
};

export default ArtistProfile;