// Navigation/URL related
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages
import Home from "./pages/Home";
import ArtistSongs from "./pages/ArtistSongs";
import ArtistAlbum from "./pages/ArtistAlbum";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
// Context
import { ArtistContextProvider } from "./context/ArtistContext";
import { NewSongContextProvider } from "./context/NewSongContext.jsx";
// Compoenets
import BottomMediaControl from "./components/BottomMediaControl";
import ResponsiveNavBarDrawer from "./components/ResponsiveNavBarDrawer.jsx";
//CSS
import "./App.css";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <ArtistContextProvider>
          <NewSongContextProvider>
            <div className="pages">
              <Routes>
                {" "}
                <Route
                  path="/home"
                  element={
                    <>
                      <Home /> <ResponsiveNavBarDrawer />
                      <BottomMediaControl />
                    </>
                  }
                />
                <Route
                  path="/api/artists/:id"
                  element={
                    <>
                      <ArtistSongs /> <ResponsiveNavBarDrawer />
                      <BottomMediaControl />
                    </>
                  }
                />
                <Route
                  path="/api/artists/album/:id"
                  element={
                    <>
                      <ArtistAlbum /> <ResponsiveNavBarDrawer />
                      <BottomMediaControl />
                    </>
                  }
                />
                <Route
                  path="/api/user/login"
                  element={
                    !user ? (
                      <>
                        <Login />
                      </>
                    ) : (
                      <Navigate to="/home" />
                    )
                  }
                />
                <Route
                  path="/api/user/signup"
                  element={
                    !user ? (
                      <>
                        <Signup />
                      </>
                    ) : (
                      <Navigate to="/home" />
                    )
                  }
                />
              </Routes>
            </div>
          </NewSongContextProvider>
        </ArtistContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
