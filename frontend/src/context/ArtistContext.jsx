import { createContext, useReducer } from "react";

export const ArtistsContext = createContext();

export const artistReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTISTS":
      return { ...state, artists: action.payload };
    default:
      return state;
  }
};

export const ArtistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(artistReducer, {
    artists: [],
  });

  return (
    <ArtistsContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};
