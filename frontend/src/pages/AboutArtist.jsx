import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistsContext } from "../context/ArtistContext";
import "../index.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MediaControlCard from "../components/MediaControlCard";

function AboutArtist() {
  const { id } = useParams(); // Extract the artist ID from the URL parameters
  const { artists } = useContext(ArtistsContext); // Access the artists from the context
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    async function getArtistById() {
      const artist = artists.find((artist) => artist._id === id);

      if (!artist) {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);

        const json = await response.json();

        const artist = json.find((artist) => artist._id === id);

        setArtist(artist); // Set the artist if found
      } else {
        setArtist(artist);
      }
    }

    getArtistById();
  }, [id, artists]); // Add id and artists to the dependency array

  // If the artist data is not found, display a loading message
  if (!artist) {
    return <div>Loading...</div>;
  }

  // Render the artist details once the data is found
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
          backgroundColor: "black",
          width: "100%", // Make the Box full width
          overflow: "hidden", // Hide overflow to ensure the image fits within the Box
          zIndex: 0, // Ensure the image stays below other elements
        }}
      >
        {artist && (
          <>
            <img
              style={{
                position: "fixed", // Make the image sticky XXXXXXXXXXXXXXXXXXXXXXX

                width: "68.7%", // Make the image full width
                height: "40%", // Make the image full height
                objectFit: "cover", // Cover the entire Box area
                objectPosition: "center 30%", // Focus slightly down from the top
                // position: "sticky", // Make the image sticky XXXXXXXXXXXXXXXXXXXXXXX
                // top: "0", // Stick to the top of the viewport XXXXXXXXXXXXXXXXXXXXXXX
                // width: "100%", // Make the image full width
                // height: "100%", // Make the image full height
                // objectFit: "cover", // Cover the entire Box area
                // objectPosition: "center 30%", // Focus slightly down from the top
                zIndex: -1, // Ensure the image stays below other elements
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
          zIndex: 0, // Ensure the image stays below other elements
        }}
      >
        <MediaControlCard />;
      </Box>
    </main>
  );
}

export default AboutArtist;

//CHANGED  ==>  {artist &&
// artist.songs.map((song) => {
//   return <MediaControlCard key={song._id} song={song} />;
// })}

// to ONLY  <MediaControlCard />;
// ++++++++++++++++++++++++++++++++++++++++++
// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ArtistsContext } from "../context/ArtistContext";
// import "../index.css";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import MediaControlCard from "../components/MediaControlCard";

// function AboutArtist() {
//   const { id } = useParams(); // Extract the artist ID from the URL parameters
//   const { artists } = useContext(ArtistsContext); // Access the artists from the context
//   const [artist, setArtist] = useState(null);

//   useEffect(() => {
//     async function getArtistById() {
//       const artist = artists.find((artist) => artist._id === id);

//       if (!artist) {
//         const response = await fetch(`http://localhost:5000/api/artists/${id}`);

//         const json = await response.json();

//         const artist = json.find((artist) => artist._id === id);

//         setArtist(artist); // Set the artist if found
//       } else {
//         setArtist(artist);
//       }
//     }

//     getArtistById();
//   }, [id, artists]); // Add id and artists to the dependency array

//   // If the artist data is not found, display a loading message
//   if (!artist) {
//     return <div>Loading...</div>;
//   }

//   // Render the artist details once the data is found
//   return (
//     <main className="container-about-grid">
//       <div className="your-library-grid-item">
//         <h2>Your Library</h2>
//       </div>
//       <Box
//         component="section"
//         sx={{
//           position: "relative", // Set position to relative to contain the absolute positioned elements
//           display: "flex",
//           backgroundColor: "black",
//           width: "100%", // Make the Box full width
//           overflow: "hidden", // Hide overflow to ensure the image fits within the Box
//           zIndex: 0, // Ensure the image stays below other elements
//         }}
//       >
//         {artist && (
//           <>
//             <img
//               style={{
//                 position: "fixed", // Make the image sticky XXXXXXXXXXXXXXXXXXXXXXX

//                 width: "68.7%", // Make the image full width
//                 height: "40%", // Make the image full height
//                 objectFit: "cover", // Cover the entire Box area
//                 objectPosition: "center 30%", // Focus slightly down from the top
//                 // position: "sticky", // Make the image sticky XXXXXXXXXXXXXXXXXXXXXXX
//                 // top: "0", // Stick to the top of the viewport XXXXXXXXXXXXXXXXXXXXXXX
//                 // width: "100%", // Make the image full width
//                 // height: "100%", // Make the image full height
//                 // objectFit: "cover", // Cover the entire Box area
//                 // objectPosition: "center 30%", // Focus slightly down from the top
//                 zIndex: -1, // Ensure the image stays below other elements
//               }}
//               src={artist.image}
//               alt={artist.name}
//             />
//             <Box
//               sx={{
//                 position: "absolute", // Position the text absolutely within the relative Box
//                 top: "50%", // Center the text vertically
//                 left: "50%", // Center the text horizontally
//                 transform: "translate(-50%, -50%)", // Adjust the position to truly center the text
//                 color: "white", // Set the text color to white
//                 textAlign: "center", // Center align the text
//                 zIndex: 1, // Ensure the text is above the image
//               }}
//             >
//               <Typography variant="h3" sx={{ fontWeight: "bold" }}>
//                 {artist.name}
//               </Typography>
//               <Typography variant="h5">{artist.type}</Typography>
//             </Box>
//           </>
//         )}
//       </Box>
//       <Box
//         component="section"
//         className="flex-bottom-right-cell-about"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           backgroundColor: "ghostwhite",
//           color: "black",
//           zIndex: 0, // Ensure the image stays below other elements
//         }}
//       >
//         {artist &&
//           artist.songs.map((song) => {
//             return <MediaControlCard key={song._id} song={song} />;
//           })}
//       </Box>
//     </main>
//   );
// }

// export default AboutArtist;
