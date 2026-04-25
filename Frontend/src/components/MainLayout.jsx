import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserProfile from "./user/UserProfile"
import { useAuth } from "./context/AuthContext"
import ArtistProfile from "./artist/ArtistProfile"
import AlbumDetail from "./pages/AlbumDetail"
import SongDetail from "./pages/SongDetail"

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={user?.role === "artist" ? <ArtistProfile /> : <UserProfile />}
      />
      <Route path="/album/:albumID" element={<AlbumDetail />} />
      <Route path="/song/:songID" element={<SongDetail />} />
    </Routes>
  )
}

export default MainLayout