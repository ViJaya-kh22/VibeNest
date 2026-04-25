import { useState, useRef } from "react";
import api from "../utils/axiosInstance";
import { Music, Upload, AlertCircle, Loader2 } from "lucide-react";

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

const UploadSongForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: "", genere: "" });
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef();
  const coverRef = useRef();

  const handleSubmit = async () => {
    setError("");
    if (!audioFile) return setError("Please select an audio file.");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("genere", form.genere);
      fd.append("audio", audioFile);
      if (coverFile) fd.append("cover", coverFile);

      await api.post(`/music/uploads`, fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ title: "", genere: "" });
      setAudioFile(null);
      setCoverFile(null);
      onSuccess("Song uploaded successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Song Title"
        placeholder="e.g. Midnight Rain"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Field
        label="Genre"
        placeholder="e.g. Pop, Hip-Hop, Jazz"
        value={form.genere}
        onChange={(e) => setForm({ ...form, genere: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Audio */}
        <div>
          <input ref={audioRef} type="file" accept="audio/*" className="hidden"
            onChange={(e) => setAudioFile(e.target.files[0])} />
          <button
            onClick={() => audioRef.current.click()}
            className={`w-full flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border-2 border-dashed text-xs font-semibold transition
              ${audioFile ? "border-green-500 text-green-400" : "border-zinc-600 text-zinc-400 hover:border-zinc-400"}`}
          >
            <Music size={18} />
            <span>{audioFile ? audioFile.name.slice(0, 12) + "…" : "Select Audio"}</span>
          </button>
        </div>

        {/* Cover */}
        <div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => setCoverFile(e.target.files[0])} />
          <button
            onClick={() => coverRef.current.click()}
            className={`w-full flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border-2 border-dashed text-xs font-semibold transition
              ${coverFile ? "border-green-500 text-green-400" : "border-zinc-600 text-zinc-400 hover:border-zinc-400"}`}
          >
            <Upload size={18} />
            <span>{coverFile ? "Cover Selected ✓" : "Cover Art (opt)"}</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <button onClick={handleSubmit} disabled={loading}
        className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-sm transition disabled:opacity-50">
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {loading ? "Uploading…" : "Upload Song"}
      </button>
    </div>
  );
};

export default UploadSongForm;