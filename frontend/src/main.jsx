import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ArtistContextProvider } from "./context/ArtistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArtistContextProvider>
      <App />
    </ArtistContextProvider>
  </StrictMode>
);
