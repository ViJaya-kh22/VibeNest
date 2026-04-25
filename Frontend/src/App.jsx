import { Routes, Route } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import { PlayerProvider } from "./components/context/PlayerContext"
import { ToastContainer } from 'react-toastify'
import Signup from "./components/pages/Signup" 
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import PrivateRoute from "./components/PrivateRoute"

const AppShell = ({ children }) => (
  <div className="bg-black text-white h-screen w-screen flex flex-col overflow-hidden">
    <Navbar />
    <div className="flex flex-1 mt-16 overflow-hidden">
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden px-5 py-5">
          {children}
        </div>
      </div>
    </div>
    <Player />
  </div>
)

const App = () => {
  return (
    <PlayerProvider>
      <ToastContainer />
      <Routes>
        {/* Auth routes — full screen, no shell */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App routes — wrapped in shell */}
        <Route path="/*" element={
          <PrivateRoute>
            <AppShell>
              <MainLayout />
            </AppShell>
          </PrivateRoute>
        } />
      </Routes>
    </PlayerProvider>
  )
}

export default App