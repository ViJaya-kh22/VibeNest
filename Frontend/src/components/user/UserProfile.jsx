import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Music, Disc3, Heart } from "lucide-react";
import StatCard from "../shared/StartCard"
import ExploreSongs from "./ExploreSongs";
import ExploreAlbums from "./ExploreAlbums";
import api from "../utils/axiosInstance";



const UserProfile = () => {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [songsRes, albumsRes] = await Promise.all([
          api.get('/music', { withCredentials: true }),
          api.get(`/music/albums`, { withCredentials: true }),
        ]);
        setSongs(songsRes.data.musics || []);
        setAlbums(albumsRes.data.albums || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const initials = user?.username
    ?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="h-full overflow-y-auto pb-24 px-6 py-6 bg-zinc-950">

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-base md:text-2xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl md:text-3xl font-bold">{user?.username}</h1>
            <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full font-semibold">
              Listener
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard label="Songs Available" value={songs.length} icon={<Music size={20} />} />
        <StatCard label="Albums Available" value={albums.length} icon={<Disc3 size={20} />} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <ExploreSongs songs={songs} loading={loading} />
        <ExploreAlbums albums={albums} loading={loading} />
      </div>

    </div>
  );
};

export default UserProfile;