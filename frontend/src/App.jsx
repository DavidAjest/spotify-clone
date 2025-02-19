import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
//pages
import Home from "./pages/Home";
import AboutArtist from "./pages/AboutArtist";
import { ArtistContextProvider } from "./context/ArtistContext";
import ArtistAlbum from "./pages/ArtistAlbum";

// Compoenets
import Navbar from "./components/Navbar";
import BottomMediaControl from "./components/BottomMediaControl";
import "./App.css";
import { NewSongContextProvider } from "./context/NewSongContext.jsx";

function App() {
  return (
    <div className="App">
      <ArtistContextProvider>
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
            <BottomMediaControl />
          </BrowserRouter>
        </NewSongContextProvider>
      </ArtistContextProvider>
    </div>
  );
}

export default App;
