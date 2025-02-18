// import * as React from "react";

import Box from "@mui/material/Box";
import { useContext, useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import ReactPlayer from "react-player";
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
    artist,
  } = useContext(NewSongsContext);

  const bottomCurrentSong = songs.find((song) => song._id === currentSong);
  console.log("this is bottomCurrentSong", bottomCurrentSong);
  const [currentTime, setCurrentTime] = useState(0); // State to store the current time
  const [duration, setDuration] = useState(0); // State to store the duration

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

  const handleNextSong = () => {
    console.log("this is the songs", songs);

    const currentIndexSongPlaying = songs.findIndex(
      (song) => song._id === currentSong
    );

    // Check if the current song is the last one in the list
    if (currentIndexSongPlaying === songs.length - 1) {
      console.log("This is the last song in the list");
      return;
    }

    const nextSong = songs[currentIndexSongPlaying + 1];
    console.log(nextSong);
    newSongDispatch({ type: "SET_SONG", payload: nextSong._id }); // YYYYYYYYYYYYYYYYYYYYYYY
    newSongDispatch({ type: "PLAY_SONG" }); // YYYYYYYYYYYYYYYYYYYYYYY
    console.log("this is the INDEX of current song", currentIndexSongPlaying);
  };

  const handlePreviousSong = () => {
    console.log("this is the songs", songs);

    const currentIndexSongPlaying = songs.findIndex(
      (song) => song._id === currentSong
    );

    // Check if the current song is the first one in the list
    if (currentIndexSongPlaying === 0) {
      console.log("This is the first song in the list");
      return;
    }

    const previousSong = songs[currentIndexSongPlaying - 1];
    console.log(previousSong);
    newSongDispatch({ type: "SET_SONG", payload: previousSong._id }); // YYYYYYYYYYYYYYYYYYYYYYY
    newSongDispatch({ type: "PLAY_SONG" }); // YYYYYYYYYYYYYYYYYYYYYYY
    console.log("this is the INDEX of current song", currentIndexSongPlaying);
  };

  return (
    <Box sx={{ pb: 7 }}>
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
              image={bottomCurrentSong && bottomCurrentSong.image}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h7">
                {bottomCurrentSong && bottomCurrentSong.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {artist && artist.name}
              </Typography>
            </CardContent>
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
                onClick={() => handlePreviousSong()}
                aria-label="previous"
              >
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

              <IconButton onClick={() => handleNextSong()} aria-label="next">
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
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  const player = playerRefs.current.get(currentSong);
                  setCurrentTime(e.target.value);
                  player.seekTo(e.target.value);
                }} // YYYYYYYYYYY
              />
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
              justifyContent: "flex-end",
              pr: 2,
              width: "10%",
            }}
          >
            <VolumeUpIcon />
          </Box>
        </Card>

        {bottomCurrentSong && (
          <ReactPlayer
            ref={(player) => {
              if (playerRefs) {
                // YYYYYYYYYYY
                // console.log("Current Time:", player.getCurrentTime());

                // ++++++++++++++++++++++++++
                // console.log("playerRefs:", playerRefs);
                // player = playerRefs.current.has(currentSong);
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
            onDuration={(duration) => setDuration(duration)} // YYYYYYYYYYY Set the duration when the player is ready
            config={{
              youtube: {
                playerVars: { origin: window.location.origin },
              },
            }}
            // onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
          />
        )}
      </Paper>
    </Box>
  );
}
