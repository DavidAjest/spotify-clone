import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ArtistContextProvider } from "./context/ArtistContext";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArtistContextProvider>
      {/* <CssBaseline /> */}
      <App />
    </ArtistContextProvider>
  </StrictMode>
);
