import { createContext, useReducer, useContext, useState } from "react";

// Create a new context for songs
export const SongsContext = createContext();

// Define a reducer to manage song state
export const songReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONG":
      return { ...state, currentSong: action.payload };
    case "PLAY_SONG":
      return { ...state, isPlaying: true };
    case "PAUSE_SONG":
      return { ...state, isPlaying: false };
    default:
      return state;
  }
};

// Create a provider component for the song context
export const SongContextProvider = ({ children }) => {
  const [state, songDispatch] = useReducer(songReducer, {
    currentSong: null,
    isPlaying: false,
  });

  return (
    <SongsContext.Provider
      value={{
        ...state,
        songDispatch,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};
