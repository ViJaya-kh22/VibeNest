import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Music, ArrowLeft, Play, Pause, Clock } from "lucide-react";
import api from "../utils/axiosInstance";
import { usePlayer } from "../context/PlayerContext";


const SongDetail = () => {
  const { songID } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playSong , currentSong , isPlaying} = usePlayer();
 

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await api.get(`/music`);
        const found = res.data.musics?.find((s) => s._id === songID);
        setSong(found || null);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [songID]);

  const formatDuration = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (loading) return (
    <div className="flex items-center justify-center h-full text-zinc-400">Loading...</div>
  );

  if (!song) return (
    <div className="flex items-center justify-center h-full text-zinc-400">Song not found.</div>
  );

  const isThisSongPlaying = currentSong?._id === song._id && isPlaying;
  return (
    <div className="h-full overflow-y-auto pb-24 bg-zinc-950">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white px-6 pt-6 pb-2 transition"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="flex flex-col items-center px-6 pt-6 pb-8 text-center">
        <div className="h-48 w-48 rounded-2xl overflow-hidden bg-zinc-800 mb-6 shadow-2xl">
          {song.coverImg ? (
            <img src={song.coverImg} alt={song.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Music size={48} className="text-zinc-500" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-1">{song.title}</h1>
        <p className="text-zinc-400 text-sm mb-1">{song.artist?.username || "Unknown Artist"}</p>
        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
          <span>{song.genere}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {formatDuration(song.duration)}
          </span>
        </div>


        <button
          onClick={() => { playSong(song) }}
          className="mt-6 flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-full font-semibold text-sm transition"
        >
          {
            isThisSongPlaying ? (
              <>
               <Pause size={16} fill="white" />
               <span> Pause </span>
              </>
            ) : (
              <>
              <Play size={16} fill="white" />
               <span> Play</span>
              </>
            )
          }
        </button>
      </div>

      {/* Details card */}
      <div className="mx-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-5 w-auto lg:w-[800px] lg:justify-self-center">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Song Info
        </h2>
        <div className="flex flex-col gap-3 text-sm">
          {[
            { label: "Title", value: song.title },
            { label: "Artist", value: song.artist?.username || "Unknown" },
            { label: "Genre", value: song.genere },
            { label: "Duration", value: formatDuration(song.duration) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
              <span className="text-zinc-400">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;