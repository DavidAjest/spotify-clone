import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react"; // Importing React hooks
import BottomMediaControl from "./BottomMediaControl";

import { SongsContext } from "../context/SongContext"; // Import the SongsContext

export default function MediaControlCard({ song }) {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the audio is playing
  const [duration, setDuration] = useState(0); // State to track the duration of the audio
  const [seconds, setSeconds] = useState(0); // State to track the current position of the audio in seconds
  const playerRef = useRef(null); // Ref to access the player instance

  const playingButton = () => {
    setIsPlaying(!isPlaying); // Toggle the isPlaying state
  }; // Function to handle play and pause button click

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setSeconds(playerRef.current.getCurrentTime()); // Set the seconds state with the current position of the audio
      }
    }, 1000); // Run this effect every second
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <Card sx={{ margin: "1%", display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <IconButton aria-label="play/pause" onClick={playingButton}>
          {!isPlaying ? (
            <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
          ) : (
            <PauseIcon sx={{ padding: 1, height: 20, width: 20 }} />
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
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div className="time">
          <p>
            {Math.floor(seconds / 60)}:{Math.floor(seconds % 60)}{" "}
            {/* Display the current time */}
          </p>
          <p>
            {Math.floor(duration / 60)}:{Math.floor(duration % 60)}{" "}
            {/* Display the total duration */}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          value={seconds}
          className="timeline"
          onChange={(e) => {
            playerRef.current.seekTo(parseFloat(e.target.value)); // Seek to the selected position in the audio
          }}
        />
      </Box>
      <Box>
        <BottomMediaControl song={song} />
      </Box>
      <ReactPlayer
        ref={playerRef}
        url={song.urlOfSong}
        playing={isPlaying}
        width="0"
        height="0"
        onDuration={(duration) => setDuration(duration)} // Set the duration of the audio
      />
    </Card>
  );
}
