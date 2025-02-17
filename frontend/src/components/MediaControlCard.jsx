import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReactPlayer from "react-player";
import { useContext, useRef, useState, useEffect } from "react"; // Importing React hooks

import { NewSongsContext } from "../context/newSongContext";
import { useLocation, useParams } from "react-router-dom";
export default function MediaControlCard() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  const { id } = useParams();
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    newSongDispatch,
    currentTime,
    isPlayingBottomPlayer,
  } = useContext(NewSongsContext);
  const artistSongs = songs.filter((song) => song.artists.includes(id));

  useEffect(() => {
    async function getartistSongsByArtist() {
      if (artistSongs.length < 1) {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        const json = await response.json();
        newSongDispatch({ type: "SET_SONGS", payload: json[0].songs });
      }
    }
    getartistSongsByArtist();
  }, [id, newSongDispatch, artistSongs.length]); // Add id and artists to the dependency array

  if (!artistSongs) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ margin: "1%", display: "flex", flexDirection: "column" }}>
      {artistSongs.map((song) => (
        <Card key={song._id} sx={{ marginBottom: "1%", display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              onClick={() =>
                playingButton(
                  isPlaying,
                  playerRefs.current.get(song._id),
                  currentSong,
                  song._id,
                  isPlayingBottomPlayer
                )
              }
              aria-label="play/pause"
            >
              {currentSong === song._id && isPlaying ? (
                <PauseIcon sx={{ padding: 1, height: 20, width: 20 }} />
              ) : (
                <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: "0.5%",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 45, height: 45 }}
              image={song.image}
              alt="Live from space album cover"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              paddingLeft: "1%",
              alignItems: "center",
            }}
            component="div"
          >
            <Typography component="h5" variant="h5">
              {song.title}
            </Typography>

            <ReactPlayer
              ref={(player) => {
                if (player && !playerRefs.current.has(song._id)) {
                  playerRefs.current.set(song._id, player);
                  newSongDispatch({
                    type: "SET_REFS",
                    payload: playerRefs.current,
                  });
                }
              }} // Store the player instance in the Map with the song ID as the key
              url={song.urlOfSong}
              // playing={currentSong === song._id && isPlaying}
              width="0"
              height="0"
              config={{
                youtube: {
                  playerVars: { origin: window.location.origin },
                },
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
}
// BEFORE --> new song context

// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import ReactPlayer from "react-player";
// import { useContext, useRef, useEffect } from "react"; // Importing React hooks
// import { SongsContext } from "../context/SongContext";
// import BottomMediaControl from "./BottomMediaControl";

// export default function MediaControlCard({ song }) {
//   const { currentSong, isPlaying, songDispatch } = useContext(SongsContext);
//   const playerRefs = useRef(new Map()); // Create a Map to store player instances
//   console.log("this is the player Refs", playerRefs);

//   // Function to handle play and pause button click
//   const playingButton = () => {
//     if (currentSong === song._id && playerRefs.current.get(song._id)) {
//       // If the current song is the same as this song and the player exists, toggle play/pause
//       songDispatch({ type: isPlaying ? "PAUSE_SONG" : "PLAY_SONG" });
//     } else {
//       // If it's a different song, set this song as the current song and play it
//       songDispatch({ type: "SET_SONG", payload: song._id });
//       songDispatch({ type: "PLAY_SONG" });
//     }
//   };

//   // Effect to reset the player to the beginning if it's not the current song
//   useEffect(() => {
//     if (currentSong !== song._id && playerRefs.current.get(song._id)) {
//       playerRefs.current.get(song._id).seekTo(0); // Reset the player to the beginning
//     }
//   }, [currentSong, song._id]);

//   return (
//     <Card sx={{ margin: "1%", display: "flex" }}>
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <IconButton aria-label="play/pause" onClick={playingButton}>
//           {currentSong === song._id && isPlaying ? (
//             <PauseIcon sx={{ padding: 1, height: 20, width: 20 }} />
//           ) : (
//             <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
//           )}
//         </IconButton>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           padding: "0.5%",
//           alignItems: "center",
//         }}
//       >
//         <CardMedia
//           component="img"
//           sx={{ width: 45, height: 45 }}
//           image={song.image}
//           alt="Live from space album cover"
//         />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           paddingLeft: "1%",
//           alignItems: "center",
//         }}
//         component="div"
//       >
//         <Typography component="h5" variant="h5">
//           {song.title}
//         </Typography>
//       </Box>

//       <ReactPlayer
//         ref={(player) => playerRefs.current.set(song._id, player)} // Store the player instance in the Map with the song ID as the key
//         url={song.urlOfSong}
//         playing={currentSong === song._id && isPlaying}
//         width="0"
//         height="0"
//       />
//       <BottomMediaControl
//         song={song}
//         playingButton={playingButton}
//         isPlaying={isPlaying}
//         currentSong={currentSong}
//         playerRef={playerRefs.current.get(song._id)} // Get the player instance from the Map using the song ID
//         duration={playerRefs.current.get(song._id)?.getDuration() || 0}
//         seconds={playerRefs.current.get(song._id)?.getCurrentTime() || 0}
//       />
//     </Card>
//   );
// }
