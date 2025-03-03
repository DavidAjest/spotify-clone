// React Hooks
import { useContext, useState } from "react";
// MUI Components
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Context
import { NewSongsContext } from "../context/NewSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
// Services
import {
  saveUserLikedSongs,
  removeUserLikedSongs,
} from "../services/artistServices";

export default function AddLikedSong() {
  const [error, setError] = useState();
  const [isLikedSong, setIsLikedSong] = useState(false);

  const { songs, currentSong } = useContext(NewSongsContext);
  const { user, likedSongs, dispatch: authDispatch } = useAuthContext();

  const currentSongPlaying = songs.find((song) => song._id === currentSong);

  // add the liked song to the user's likedSongs array
  const handleLikedSong = async () => {
    setError(null);
    try {
      if (user) {
        const userEmail = user.email;
        const likedSongId = currentSongPlaying._id;
        const userWithLikedSongs = await saveUserLikedSongs(
          userEmail,
          likedSongId
        );
        if (userWithLikedSongs) {
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

  // remove the liked song to the user's likedSongs array
  const handleUnLikeSong = async () => {
    try {
      if (user) {
        const userEmail = user.email;
        const likedSongId = currentSongPlaying._id;
        const userWithLikedSongs = await removeUserLikedSongs(
          userEmail,
          likedSongId
        );

        if (userWithLikedSongs) {
          authDispatch({
            type: "REMOVE_LIKED_SONG",
            payload: currentSongPlaying._id,
          });
          if (!isLikedSong) {
            setIsLikedSong(true);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ color: "white" }}>
      {!likedSongs.includes(currentSongPlaying._id) && (
        <Button onClick={() => handleLikedSong()}>
          <AddCircleOutlineIcon />
        </Button>
      )}

      {likedSongs.includes(currentSongPlaying._id) && (
        <Button onClick={() => handleUnLikeSong()}>
          <CheckCircleOutlineIcon />
        </Button>
      )}
      {error && <h1>{error}</h1>}
    </Box>
  );
}

// old

// const handleLikedSong = async () => {
//   setError(null);
//   try {
//     if (user) {
//       const userEmail = user.email;
//       const likedSongId = currentSongPlaying._id;
//       const response = await fetch(
//         "http://localhost:5000/api/user/addLikedSong",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: userEmail, songId: likedSongId }),
//         }
//       );
//       let json;
//       if (!response.ok) {
//         json = await response.json();
//         setError(json.error);
//       }
//       if (response.ok) {
//         json = await response.json();
//         console.log("response OK");
//         console.log("liked song!");
//         authDispatch({
//           type: "ADD_LIKED_SONG",
//           payload: currentSongPlaying._id,
//         });
//         if (!isLikedSong) {
//           setIsLikedSong(true);
//         }
//       }
//     }
//   } catch (e) {
//     setError(e.message);
//   }
// };

// old

// const handleUnLikeSong = async () => {
//   try {
//     if (user) {
//       const userEmail = user.email;
//       const likedSongId = currentSongPlaying._id;

//       const response = await fetch(
//         "http://localhost:5000/api/user/removeLikedSong",
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: userEmail, songId: likedSongId }),
//         }
//       );
//       let json;
//       if (!response.ok) {
//         json = await response.json();

//         setError(json.error);
//       }
//       if (response.ok) {
//         json = await response.json();
//         console.log("response OK");

//         console.log("UN LIKE SONG!!");

//         authDispatch({
//           type: "REMOVE_LIKED_SONG",
//           payload: currentSongPlaying._id,
//         });

//         if (isLikedSong) {
//           setIsLikedSong(false);
//         }
//         // if (isLikedSong) {
//         //   songDispatch({ type: "UN_LIKE_SONG" });
//         // } else {
//         //   songDispatch({ type: "LIKE_SONG" });
//         // }
//       }
//     }
//   } catch (e) {
//     setError(e.message);
//   }
// };
