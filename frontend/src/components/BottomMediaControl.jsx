import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CardMedia from "@mui/material/CardMedia";

export default function BottomMediaControl({
  song,
  playingButton,
  isPlaying,
  playerRef,
  duration,
  seconds,
}) {
  console.log("this is the songYYYYYY", song);

  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <img src={song.image} alt="" />
            <IconButton aria-label="play/pause" onClick={playingButton}>
              {!isPlaying ? (
                <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
              ) : (
                <PauseIcon sx={{ padding: 1, height: 20, width: 20 }} />
              )}
            </IconButton>

            <input
              type="range"
              min="0"
              max={duration}
              value={seconds}
              className="timeline"
              onChange={(e) => {
                playerRef.seekTo(parseFloat(e.target.value)); // Seek to the selected position in the audio
              }}
            />
          </Box>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
