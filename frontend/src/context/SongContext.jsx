// import { createContext, useReducer } from "react";

// export const SongsContext = createContext();

// export const songReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_ARTISTS":
//       return { ...state, artists: action.payload };
//     default:
//       return state;
//   }
// };

// export const ArtistContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(artistReducer, {
//     artists: [
//       {
//         id: 1,
//         firstName: "adele",
//         song: "hello",
//         imgURL:
//       },
//       {
//         id: 2,
//         firstName: "Ed Sheeran",
//         song: "Perfect",
//         imgURL:
//       },
//     ],
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
