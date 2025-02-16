import * as React from "react";
import Box from "@mui/material/Box";
import { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
// MEDIA CONTROL IMPORTS DOWN BELOW
import { useTheme } from "@mui/material/styles";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { NewSongsContext } from "../context/newSongContext";

export default function NewBottomMediaControl() {
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    newSongDispatch,
    currentTime,
  } = useContext(NewSongsContext);
  console.log("this is the bottom media control:", currentTime);
  const bottomCurrentSong = songs.find((song) => song._id === currentSong);

  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "10%" }}
        elevation={3}
      >
        <Card
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 70, padding: 1, height: 70 }}
              image="https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd"
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h7">
                Live From Space
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                playingButton(
                  isPlaying,
                  playerRefs.current.get(currentSong),
                  currentSong,
                  currentSong
                )
              }
              aria-label="play/pause"
            >
              {currentSong && isPlaying ? (
                <PauseIcon sx={{ padding: 1, height: 20, width: 20 }} />
              ) : (
                <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
              )}
            </IconButton>

            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pr: 2,
              width: "10%",
            }}
          >
            <VolumeUpIcon />
          </Box>
        </Card>
      </Paper>
    </Box>
  );
}
