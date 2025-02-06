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

//
// export const ArtistContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(artistReducer, {
//     artists: [
//       {
//         id: 1,
//         artist: "Adele",
//         song: "hello",
//         imgURL:
//           "https://hips.hearstapps.com/hmg-prod/images/ed-sheeran-GettyImages-494227430_1600.jpg",
//       },
//       {
//         id: 2,
//         artist: "Ed Sheeran",
//         song: "Perfect",
//         imgURL:
//           "https://hips.hearstapps.com/hmg-prod/images/ed-sheeran-GettyImages-494227430_1600.jpg",
//       },
//     ],
//   });
