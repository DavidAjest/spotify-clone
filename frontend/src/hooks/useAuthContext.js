import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("AuthContext must be usded inside an AuthContextProvider");
  }

  return context;
}
