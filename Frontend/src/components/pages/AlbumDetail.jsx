import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Music, ArrowLeft, Play, Clock, Pause } from "lucide-react";
import api from "../utils/axiosInstance";
import { usePlayer } from "../context/PlayerContext";

const formatDuration = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const SongRow = ({ song, index, onNavigate }) => 
  {
  const { playSong, currentSong, isPlaying } = usePlayer();

  const isThisSongPlaying = currentSong?._id === song._id && isPlaying;

  return (
    <div
      key={song._id}
      className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-zinc-800 cursor-pointer transition group"
    >
   
      <div className="realtive"onClick={() => playSong(song)} >
      {
        isThisSongPlaying ? (
            <Pause
       size={14} className="text-white hidden group-hover:block shrink-0" fill="white" />
        ) :  <Play
       size={14} className="text-white hidden group-hover:block shrink-0" fill="white" />
      }
      </div>
      <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-700 shrink-0">
        {song.coverImg
          ? <img src={song.coverImg} alt={song.title} className="h-full w-full object-cover" />
          : <div className="h-full w-full flex items-center justify-center"><Music size={12} className="text-zinc-500" /></div>
        }
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold truncate `}>
          {song.title}
        </p>
        <p className="text-xs text-zinc-400 truncate">
          {song.artist?.username || "Unknown"} · {song.genere}
        </p>
      </div>
      <span className="text-xs text-zinc-500 shrink-0">
        {formatDuration(song.duration)}
      </span>
    </div>
  );
};

const AlbumDetail = () => {
  const { albumID } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await api.get(`/music/albums/${albumID}`);
        setAlbum(res.data.album);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [albumID]);


  if (loading) return (
    <div className="flex items-center justify-center h-full text-zinc-400">
      Loading...
    </div>
  );

  if (!album) return (
    <div className="flex items-center justify-center h-full text-zinc-400">
      Album not found.
    </div>
  );



  return (
    <div className="h-full overflow-y-auto pb-24 bg-zinc-950">
      {/* Hero */}
      <div className="relative">
        <div className="h-56 w-full bg-gradient-to-b from-violet-900/60 to-zinc-950">
          {album.coverImg && (
            <img
              src={album.coverImg}
              alt={album.title}
              className="h-full w-full object-cover opacity-30 absolute inset-0"
            />
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-sm text-white bg-black/40 px-3 py-1.5 rounded-full hover:bg-black/60 transition"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Album info */}
        <div className="absolute bottom-0 left-0 px-6 pb-6 flex items-end gap-5">
          <div className="h-28 w-28 rounded-xl overflow-hidden bg-zinc-800 shrink-0 shadow-xl">
            {album.coverImg ? (
              <img src={album.coverImg} alt={album.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Music size={32} className="text-zinc-500" />
              </div>
            )}
          </div>
          <div className="pb-1">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Album</p>
            <h1 className="text-3xl font-bold">{album.title}</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {album.genere} · {album.music?.length || 0} songs
            </p>
          </div>
        </div>
      </div>

      {/* Songs list */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between text-xs text-zinc-500 uppercase tracking-widest px-3 mb-2">
          <span># Title</span>
          <Clock size={14} />
        </div>
        <div className="flex flex-col gap-1">
          {album.music?.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-10">No songs in this album.</p>
          ) : (
            album.music?.map((song, index) => (
               <SongRow key={song._id} song={song} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;