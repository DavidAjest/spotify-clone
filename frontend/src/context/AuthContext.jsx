import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        likedSongs: action.payload.likedSongs || [],
      };
    case "LOGOUT":
      return { user: null, likedSongs: [] };
    case "ADD_LIKED_SONG":
      return {
        ...state,
        likedSongs: [...state.likedSongs, action.payload],
      };
    case "REMOVE_LIKED_SONG":
      console.log("im in reducer REMOVE_LIKED_SONG");
      return {
        ...state,
        likedSongs: state.likedSongs.filter(
          (songId) => songId !== action.payload
        ),
      };
    default:
      return state;
  }
};

//the chilren are the components that wraped by the AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    likedSongs: [],
  });
  // update the AuthContext if theres user in the local stroage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  // When added a new liked song, update the local storage with the new array of liked songs
  useEffect(() => {
    if (state.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, likedSongs: state.likedSongs })
      );
    }
  }, [state.likedSongs]);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
