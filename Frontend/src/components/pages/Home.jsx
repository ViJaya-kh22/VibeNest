import { useEffect, useState } from "react";
import CarouselSection from "../CarouselSection";
import SongCard from "../SongCard";
import AlbumCard from "../AlbumCard";
import { usePlayer } from "../context/PlayerContext";
import SongDetail from "./SongDetail";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axiosInstance";

const Home = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAllSongs } = usePlayer();

  const fetchSongs = async () => {
    try {
      const response = await api.get("/music")
      setSongs(response.data.musics)
      setAllSongs(response.data.musics)

    } catch (error) {
      console.log("Error in fetch songs", error);
    } finally {
      setLoading(false)
    }
  }

  const fetchAlbums = async () => {
    try {
      const response = await api.get("/music/albums");
      setAlbums(response.data.albums)

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchSongs()
    fetchAlbums()
  }, [])


  return (
    <div className="flex flex-col w-full gap-5 pb-24  p-5 ">
      <p className="text-md text-zinc-500 font-light tracking-widest uppercase text-center">
        welcome back <span>{user.username} ✨</span>
      </p>

      {
        loading ? (
          <p className=" flex justify-center items-center px-5 text-gray-400">Loding songs...</p>
        ) : (
          <CarouselSection
            title="Trending Songs"
            items={songs}
            renderCard={(item) => (
              <SongCard song={item} onClick={() => navigate(`/song/${item._id}`)} />
            )}
          />
        )
      }

      <CarouselSection
        title="Trending Albums"
        items={albums}
        renderCard={(item) => (
          <AlbumCard album={item} onClick={() => navigate(`/album/${item._id}`)} />
        )}
      />
    </div>
  );
};

export default Home; 