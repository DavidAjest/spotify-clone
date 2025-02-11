import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
//pages
import Home from "./pages/Home";
import AboutArtist from "./pages/AboutArtist";

// Compoenets
import Navbar from "./components/Navbar";

import "./App.css";
// import PlayerDEV from "./components/PlayerDEV";
import BottomMediaControl from "./components/BottomMediaControl";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

// const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // return code ? <Dashboard code={code} /> : <Login />;
  return (
    <div className="App">
      {/* <CssBaseline /> for some reasong the CssBaseLine comp, makes the play/puase icons smaller */}
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {" "}
            <Route path="/home" element={<Home />} />
            <Route path="/api/artists/:id" element={<AboutArtist />} />
            {/* <PlayerDEV /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <BottomMediaControl />
    </div>
  );
}

export default App;
