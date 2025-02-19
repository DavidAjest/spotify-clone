import { createContext, useReducer } from "react";

import { useRef } from "react";
// Create a new context for songs
export const NewSongsContext = createContext();

// Define a reducer to manage song state
export const songReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "SET_SONG":
      return { ...state, currentSong: action.payload };
    case "SET_REFS":
      return { ...state, playerRef: action.payload };
    case "PLAY_SONG":
      return { ...state, isPlaying: true };
    case "PAUSE_SONG":
      return { ...state, isPlaying: false };
    case "SAVE_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_ARTIST":
      return { ...state, artist: action.payload };

    default:
      return state;
  }
};

// Create a provider component for the song context
export const NewSongContextProvider = ({ children }) => {
  const [state, newSongDispatch] = useReducer(songReducer, {
    currentSong: null,
    isPlaying: false,
    playerRefs: useRef(new Map()),
    currentTime: {},
    artist: null,
    songs: [],
  });

  const playingButton = (isPlaying, playerRef, currentSong, song_id) => {
    if (currentSong === song_id && playerRef) {
      // If the current song is the same as this song and the player exists, toggle play/pause

      newSongDispatch({ type: isPlaying ? "PAUSE_SONG" : "PLAY_SONG" });
    } else {
      // If it's a different song, set this song as the current song and play it
      newSongDispatch({ type: "SET_SONG", payload: song_id });

      newSongDispatch({ type: "PLAY_SONG" });
    }
  };
  return (
    <NewSongsContext.Provider
      value={{
        ...state,
        newSongDispatch,
        playingButton,
      }}
    >
      {children}
    </NewSongsContext.Provider>
  );
};
