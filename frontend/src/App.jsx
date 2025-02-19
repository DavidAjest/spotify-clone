import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
//pages
import Home from "./pages/Home";
import AboutArtist from "./pages/AboutArtist";
import { ArtistContextProvider } from "./context/ArtistContext";
import ArtistAlbum from "./pages/ArtistAlbum";
// import CssBaseline from "@mui/material/CssBaseline";
// import Login from "./components/Login.jsx";
import { SongContextProvider } from "./context/SongContext.jsx";
// Compoenets
import Navbar from "./components/Navbar";
import NewBottomMediaControl from "./components/newBottomMediaControl";
import "./App.css";
import { NewSongContextProvider } from "./context/newSongContext.jsx";
// import BottomMediaControl from "./components/BottomMediaControl.jsx";
// import PlayerDEV from "./components/PlayerDEV";

// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

// const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // return code ? <Dashboard code={code} /> : <Login />;
  return (
    <div className="App">
      <ArtistContextProvider>
        <SongContextProvider>
          <NewSongContextProvider>
            <BrowserRouter>
              <Navbar />
              <div className="pages">
                <Routes>
                  {" "}
                  <Route path="/home" element={<Home />} />
                  <Route path="/api/artists/:id" element={<AboutArtist />} />
                  <Route
                    path="/api/artists/album/:id"
                    element={<ArtistAlbum />}
                  />
                </Routes>
              </div>
              <NewBottomMediaControl />
            </BrowserRouter>
          </NewSongContextProvider>
        </SongContextProvider>
      </ArtistContextProvider>
    </div>
  );
}

export default App;
