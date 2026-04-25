import { useState, useRef } from "react";
import api from "../utils/axiosInstance";
import { Music, Upload, Plus, CheckCircle, AlertCircle, Loader2 } from "lucide-react";



const Field = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
      {label}
    </label>
    <input
      {...props}
      className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-500 transition w-full"
    />
  </div>
);

const UploadAlbumForm = ({ songs, onSuccess }) => {
  const [form, setForm] = useState({ title: "", genere: "" });
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const coverRef = useRef();

  const toggleSong = (id) =>
    setSelectedSongs(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );

  const handleSubmit = async () => {
    setError("");
    if (selectedSongs.length === 0) return setError("Select at least one song.");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("genere", form.genere);
      selectedSongs.forEach(id => fd.append("music", id));
      if (coverFile) fd.append("cover", coverFile);

      await api.post(`/music/create-album`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ title: "", genere: "" });
      setSelectedSongs([]);
      setCoverFile(null);
      onSuccess("Album created successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Failed to create album"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Album Title"
        placeholder="e.g. Midnight Sessions"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Field
        label="Genre"
        placeholder="e.g. R&B, Electronic"
        value={form.genere}
        onChange={(e) => setForm({ ...form, genere: e.target.value })}
      />


      <div>
        <input ref={coverRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => setCoverFile(e.target.files[0])} />
        <button onClick={() => coverRef.current.click()}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition ${
            coverFile ? "border-green-500 text-green-400" : "border-zinc-600 text-zinc-400 hover:border-zinc-400"
          }`}>
          <Upload size={16} />
          {coverFile ? "Cover Selected ✓" : "Album Cover Art"}
        </button>
      </div>

      <div>
        <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-2 block">
          Add Songs to Album
        </label>
        {songs.length === 0
          ? <p className="text-zinc-500 text-sm text-center py-4 border border-zinc-700 rounded-xl">
              No songs yet — upload some songs first.
            </p>
          : (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {songs.map(s => (
                <div key={s._id} onClick={() => toggleSong(s._id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer border transition ${
                    selectedSongs.includes(s._id)
                      ? "border-green-500 bg-green-600/10"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}>
                  <Music size={14} className={selectedSongs.includes(s._id) ? "text-green-400" : "text-zinc-500"} />
                  <span className="text-sm truncate">{s.title}</span>
                  {selectedSongs.includes(s._id) && (
                    <CheckCircle size={14} className="ml-auto text-green-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )
        }
      </div>

      {error && (
        <p className="text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <button onClick={handleSubmit} disabled={loading}
        className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-sm transition disabled:opacity-50">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        {loading ? "Creating…" : "Create Album"}
      </button>
    </div>
  );
};

export default UploadAlbumForm;