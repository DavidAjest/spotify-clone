import { useContext, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NewSongsContext } from "../context/NewSongContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function AddLikedSong() {
  const [error, setError] = useState();
  const [isLikedSong, setIsLikedSong] = useState(false);

  const {
    songs,
    currentSong,
    // isLikedSong,
    newSongDispatch: songDispatch,
  } = useContext(NewSongsContext);
  const { user, likedSongs, dispatch: authDispatch } = useAuthContext();

  const currentSongPlaying = songs.find((song) => song._id === currentSong);
  // console.log("this is current song", currentSongPlaying);
  //   console.log("current song platyng from add liked song:", currentSongPlaying);

  const handleLikedSong = async () => {
    setError(null);

    try {
      if (user) {
        const userEmail = user.email;
        const likedSongId = currentSongPlaying._id;
        console.log("from add liked song USER:", user);
        console.log("this is from the Add liked userEmail", userEmail);
        console.log("this is from the Add liked likedSongId", likedSongId);
        const response = await fetch(
          "http://localhost:5000/api/user/addLikedSong",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, songId: likedSongId }),
          }
        );
        let json;
        if (!response.ok) {
          json = await response.json();

          setError(json.error);
        }
        if (response.ok) {
          json = await response.json();
          console.log("response OK");

          console.log("liked song!");

          authDispatch({
            type: "ADD_LIKED_SONG",
            payload: currentSongPlaying._id,
          });

          if (!isLikedSong) {
            setIsLikedSong(true);
          }
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUnLikeSong = async () => {
    console.log("this is from handle UN LIKE", currentSongPlaying);

    try {
      if (user) {
        const userEmail = user.email;
        const likedSongId = currentSongPlaying._id;
        console.log("from removeLikedSong song USER:", user);
        console.log("this is from the removeLikedSong userEmail", userEmail);
        console.log(
          "this is from the removeLikedSong likedSongId",
          likedSongId
        );

        const response = await fetch(
          "http://localhost:5000/api/user/removeLikedSong",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, songId: likedSongId }),
          }
        );
        let json;
        if (!response.ok) {
          json = await response.json();

          setError(json.error);
        }
        if (response.ok) {
          json = await response.json();
          console.log("response OK");

          console.log("UN LIKE SONG!!");

          authDispatch({
            type: "REMOVE_LIKED_SONG",
            payload: currentSongPlaying._id,
          });

          if (isLikedSong) {
            setIsLikedSong(false);
          }
          // if (isLikedSong) {
          //   songDispatch({ type: "UN_LIKE_SONG" });
          // } else {
          //   songDispatch({ type: "LIKE_SONG" });
          // }
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box sx={{ color: "white" }}>
      {!likedSongs.includes(currentSongPlaying._id) && (
        <Button onClick={() => handleLikedSong()}>
          {" "}
          <AddCircleOutlineIcon />
        </Button>
      )}

      {likedSongs.includes(currentSongPlaying._id) && (
        <Button onClick={() => handleUnLikeSong()}>
          {" "}
          <CheckCircleOutlineIcon />
        </Button>
      )}
      {/* <Button>
        {" "}
        <CheckCircleOutlineIcon />
      </Button> */}
      {error && <h1>{error}</h1>}
    </Box>
  );
}
