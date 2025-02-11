import { createContext, useReducer, useState } from "react";

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
  const [state, dispatch] = useReducer(songReducer, {
    currentSong: null,
    isPlaying: false,
  });

  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = ({ played, loaded }) => {
    setPlayed(played);
    setLoaded(loaded);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  return (
    <SongsContext.Provider
      value={{
        ...state,
        dispatch,
        played,
        loaded,
        duration,
        handleProgress,
        handleDuration,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};
