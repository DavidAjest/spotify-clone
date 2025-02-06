// import { createContext, useReducer } from "react";

// export const SongsContext = createContext();

// export const songReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_SONGS":
//       return { ...state, artists: action.payload };
//     default:
//       return state;
//   }
// };

// export const ArtistContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(artistReducer, {
//     artists: [],
//   });

//   return (
//     <ArtistsContext.Provider
//       value={{
//         ...state,
//         dispatch,
//       }}
//     >
//       {children}
//     </ArtistsContext.Provider>
//   );
// };
