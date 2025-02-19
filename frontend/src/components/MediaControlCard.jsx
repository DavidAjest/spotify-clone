import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useContext, useEffect } from "react";
import { NewSongsContext } from "../context/NewSongContext";
import { useParams } from "react-router-dom";
export default function MediaControlCard() {
  const { id } = useParams();
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    newSongDispatch,
    artist,

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
  }, [artist, id, newSongDispatch, artistSongs.length, isPlaying, currentSong]); // Add id and artists to the dependency array

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
          </Box>
        </Card>
      ))}
    </Box>
  );
}
