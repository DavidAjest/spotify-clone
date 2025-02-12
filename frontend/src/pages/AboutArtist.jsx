import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistsContext } from "../context/ArtistContext";
import "../index.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MediaControlCard from "../components/MediaControlCard";
import SpinnerLoader from "../components/SpinnerLoader";

function AboutArtist() {
  const { id } = useParams(); // Extract the artist ID from the URL parameters
  const { artists } = useContext(ArtistsContext); // Access the artists from the context
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered with id:", id, "and artists:", artists);

    async function getArtistById() {
      const artist = artists.find((artist) => artist._id === id);
      setArtist(artist);
      if (!artist) {
        const response = await fetch("http://localhost:5000/api/artists");
        console.log("im in this function");
        const json = await response.json();

        const artist = json.find((artist) => artist._id === id);

        setArtist(artist); // Set the artist if found
      }
    }

    getArtistById();
  }, []);

  // const artist = artists.find((artist) => artist._id === id);

  if (!artist) {
    return <SpinnerLoader />;
  }

  return (
    <main className="container-about-grid">
      <div className="your-library-grid-item">
        <h2>Your Library</h2>
      </div>
      <Box
        component="section"
        sx={{
          position: "relative", // Set position to relative to contain the absolute positioned elements
          display: "flex",
          backgroundColor: "blueviolet",
          width: "100%", // Make the Box full width

          overflow: "hidden", // Hide overflow to ensure the image fits within the Box
        }}
      >
        {artist && (
          <>
            <img
              style={{
                width: "100%", // Make the image full width
                height: "100%", // Make the image full height
                objectFit: "cover", // Cover the entire Box area
                objectPosition: "center 30%", // Focus slightly down from the top
              }}
              src={artist.image}
              alt={artist.name}
            />
            <Box
              sx={{
                position: "absolute", // Position the text absolutely within the relative Box
                top: "50%", // Center the text vertically
                left: "50%", // Center the text horizontally
                transform: "translate(-50%, -50%)", // Adjust the position to truly center the text
                color: "white", // Set the text color to white
                textAlign: "center", // Center align the text
                zIndex: 1, // Ensure the text is above the image
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {artist.name}
              </Typography>
              <Typography variant="h5">{artist.type}</Typography>
            </Box>
          </>
        )}
      </Box>
      <Box
        component="section"
        className="flex-bottom-right-cell-about"
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "ghostwhite",
          color: "black",
        }}
      >
        {artist &&
          artist.songs.map((song) => {
            return <MediaControlCard key={song._id} song={song} />;
          })}
      </Box>
    </main>
  );
}

export default AboutArtist;
