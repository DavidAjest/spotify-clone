import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import AboutArtist from "./pages/AboutArtist";

// Compoenets
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/api/artists/:id" element={<AboutArtist />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
