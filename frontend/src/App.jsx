import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
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
import ResponsiveNavBarDrawer from "./components/ResponsiveNavBarDrawer.jsx";
import Login from "./pages/Login.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
      <BrowserRouter>
        <ArtistContextProvider>
          <NewSongContextProvider>
            {/* <Navbar /> */}

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
                      <AboutArtist /> <ResponsiveNavBarDrawer />
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

                        {/* <ResponsiveNavBarDrawer /> */}
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
                        {/* <ResponsiveNavBarDrawer /> */}
                      </>
                    ) : (
                      <Navigate to="/home" />
                    )
                  }
                />
              </Routes>
            </div>
            {/* <BottomMediaControl /> */}
          </NewSongContextProvider>
        </ArtistContextProvider>
      </BrowserRouter>
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
