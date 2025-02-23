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
import { NewSongContextProvider } from "./context/newSongContext.jsx";
import ResponsiveDrawer from "./components/ResponsiveDrawer.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveDrawer />
        <ArtistContextProvider>
          <NewSongContextProvider>
            {/* <Navbar /> */}
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
          </NewSongContextProvider>
        </ArtistContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
