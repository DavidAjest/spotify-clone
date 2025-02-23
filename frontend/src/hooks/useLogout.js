// import React from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from stotrage
    localStorage.removeItem("user");

    //dispatch logount action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}
