// React Hooks
import { useContext, useEffect, useState } from "react";
// Navigation/URL related
import { useParams } from "react-router-dom";
// MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MediaControlCardAlbum from "../components/MediaControlCardAlbum";
// Context
import { ArtistsContext } from "../context/ArtistContext";
// Services
import { fetchArtistById } from "../services/artistServices";
// CSS
import "../index.css";

function ArtistSongs() {
  const { id } = useParams();
  const { artists } = useContext(ArtistsContext);
  const [artist, setArtist] = useState(null);

  // find the artist by id from the params, if artists not availible, therefor !artistFromParams, fetch artist
  useEffect(() => {
    async function getArtist() {
      const artistFromParams = artists.find((artist) => artist._id === id);
      if (!artistFromParams) {
        const artistFeched = await fetchArtistById(id);
        setArtist(artistFeched);
      } else {
        setArtist(artistFromParams);
      }
    }
    getArtist();
  }, [id, artists]);

  // If the artist data is not found, display a loading message
  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Box className="container-about-album-grid">
        <Box
          component="section"
          sx={{
            backgroundColor: "black",
            width: "100%", // Make the Box full width

            // overflow: "hidden", // Hide overflow to ensure the image fits within the Box
            zIndex: 0, // Ensure the image stays below other elements
            position: "relative", // Ensure the child elements are positioned relative to this Box
          }}
        >
          {artist && (
            <>
              <Box
                sx={{
                  position: "sticky",
                  top: "80px",
                  width: "100%", // Make the image full width
                  height: "30%", // Make the image full height
                  // objectFit: "cover", // Cover the entire Box area

                  objectPosition: "center 30%", // Focus slightly down from the top
                }}
              >
                <img
                  style={{
                    height: 800,
                    borderRadius: 10,
                    objectFit: "cover", // Cover the entire Box area
                    width: "100%", // Make the image full width
                    zIndex: -1, // Ensure the image stays below other elements
                    marginBottom: -95,
                  }}
                  src={artist.image}
                  alt={artist.name}
                />
              </Box>
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
            zIndex: 0, // Ensure the image stays below other elements
          }}
        >
          <MediaControlCardAlbum />
        </Box>
      </Box>
    </main>
  );
}

export default ArtistSongs;

//old

// useEffect(() => {
//   async function getArtistById() {
//     const artist = artists.find((artist) => artist._id === id);

//     if (!artist) {
//       const response = await fetch(`http://localhost:5000/api/artists/${id}`);

//       const json = await response.json();

//       const artist = json.find((artist) => artist._id === id);

//       setArtist(artist); // Set the artist if found
//     } else {
//       setArtist(artist);
//     }
//   }

//   getArtistById();
// }, [id, artists]); // Add id and artists to the dependency array
