// import * as React from "react";

import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import ReactPlayer from "react-player";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { NewSongsContext } from "../context/NewSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import AddLikedSong from "./AddLikedSong";

export default function BottomMediaControl() {
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    newSongDispatch,
    artist,
  } = useContext(NewSongsContext);

  const { user } = useAuthContext();

  const bottomCurrentSong = songs.find((song) => song._id === currentSong);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(1);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch("http://localhost:5000/api/artists");
      const json = await response.json();
      if (response.ok) {
        let bottomCurrentArtist = json.find((artist) =>
          artist.songs.some((song) => song._id === currentSong)
        );
        newSongDispatch({ type: "SET_ARTIST", payload: bottomCurrentArtist });
      } else {
        console.log(response.status);
      }
    };
    fetchArtists();
  }, [newSongDispatch, currentSong, isPlaying]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const player = playerRefs.current.get(currentSong);
      if (player && isPlaying) {
        // Check if the song is playing
        const time = player.getCurrentTime();
        setCurrentTime(time);
      }
    };
    const myInterval = setInterval(updateCurrentTime, 1000);
    return () => {
      clearInterval(myInterval); // Clear the interval when the component is unmounted or dependencies change
    };
  }, [currentSong, playerRefs, isPlaying]);

  useEffect(() => {
    const updateWhenDifUser = () => {};
  }, [user]);

  const handleNextSong = () => {
    const currentIndexSongPlaying = songs.findIndex(
      (song) => song._id === currentSong
    );

    // Check if the current song is the last one in the list
    if (currentIndexSongPlaying === songs.length - 1) {
      console.log("This is the last song in the list");
      return;
    }

    const nextSong = songs[currentIndexSongPlaying + 1];

    newSongDispatch({ type: "SET_SONG", payload: nextSong._id });
    newSongDispatch({ type: "PLAY_SONG" });
  };

  const handlePreviousSong = () => {
    const currentIndexSongPlaying = songs.findIndex(
      (song) => song._id === currentSong
    );

    // Check if the current song is the first one in the list
    if (currentIndexSongPlaying === 0) {
      console.log("This is the first song in the list");
      return;
    }

    const previousSong = songs[currentIndexSongPlaying - 1];

    newSongDispatch({ type: "SET_SONG", payload: previousSong._id });
    newSongDispatch({ type: "PLAY_SONG" });
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 100,
        }}
        elevation={3}
      >
        <Card
          className="player"
          sx={{
            backgroundColor: "black",
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
            {bottomCurrentSong ? (
              <CardMedia
                component="img"
                sx={{ width: 70, padding: 1, height: 70 }}
                image={bottomCurrentSong && bottomCurrentSong.image}
                alt="PLEASE CHOOSE A SONG FIRST"
              />
            ) : (
              <h6 style={{ padding: "5px" }}>CHOOSE A SONG FIRST</h6>
            )}
            <Box>
              <CardContent sx={{ flex: "1 0 auto", color: "white" }}>
                <Typography variant="subtitle1" component="div">
                  {bottomCurrentSong && artist && artist.name}
                </Typography>
                <Typography
                  sx={{
                    color: "gray",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: 120,
                    height: 30,
                  }}
                  component="div"
                  variant="h7"
                >
                  {bottomCurrentSong && bottomCurrentSong.title}
                </Typography>
              </CardContent>
            </Box>

            {user && bottomCurrentSong && <AddLikedSong />}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
            }}
          >
            <div>
              <IconButton
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => handlePreviousSong()}
                aria-label="previous"
              >
                <SkipPreviousIcon />
              </IconButton>

              <IconButton
                sx={{ color: "white" }}
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

              <IconButton
                sx={{
                  color: "gray",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => handleNextSong()}
                aria-label="next"
              >
                <SkipNextIcon />
              </IconButton>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                {`${Math.floor(currentTime / 60)}:${
                  Math.floor(currentTime % 60) < 10 ? "0" : ""
                }${Math.floor(currentTime % 60)}`}
              </div>
              <input
                style={{ width: "100%" }}
                type="range"
                min={0}
                max={duration || 0} // Ensure max is always defined
                value={currentTime || 0} // Ensure value is always define
                onChange={(e) => {
                  console.log("im e XXXXXXXXXXXXX", e.target.value);
                  const player = playerRefs.current.get(currentSong);
                  setCurrentTime(e.target.value);
                  player.seekTo(e.target.value);
                }}
              />
              {console.log("current time", currentSong)}
              <div>
                {bottomCurrentSong &&
                  `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}
              </div>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              pr: 2,
              width: "10%",
              minWidth: "100px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                pr: 2,
              }}
            >
              <IconButton onClick={() => setIsMuted(!isMuted)}>
                {isMuted || currentVolume / 10 === 0 ? (
                  <VolumeOffIcon sx={{ color: "white" }} />
                ) : (
                  <VolumeUpIcon sx={{ color: "white" }} />
                )}
              </IconButton>

              <input
                className="input-volume"
                style={{ width: "100%" }}
                type="range"
                min={0}
                max={10}
                value={currentVolume} // Ensure value is always define
                onChange={(e) => {
                  setCurrentVolume(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Card>

        {bottomCurrentSong && (
          <ReactPlayer
            volume={currentVolume / 10}
            muted={isMuted}
            ref={(player) => {
              if (playerRefs) {
                if (!playerRefs.current.has(currentSong)) {
                  playerRefs.current.set(currentSong, player);
                  newSongDispatch({
                    type: "SET_REFS",
                    payload: playerRefs.current,
                  });
                }
              }
            }} // Store the player instance in the Map with the song ID as the key
            url={bottomCurrentSong.urlOfSong}
            playing={currentSong === bottomCurrentSong._id && isPlaying}
            width="0"
            height="0"
            onDuration={(duration) => setDuration(duration)}
            config={{
              youtube: {
                playerVars: { origin: window.location.origin },
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
