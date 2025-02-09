import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [usedCode, setUsedCode] = useState(false); // Add a state variable to track if the code has been used

  useEffect(() => {
    if (!code || usedCode) return; // Check if the code has already been used

    console.log("Attempting to exchange code for tokens:", code);

    axios
      .post("http://localhost:5000/login", {
        code,
      })
      .then((res) => {
        console.log("Received tokens:", res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        setUsedCode(true); // Mark the code as used
        window.history.pushState({}, null, "/"); // delete the code from the url
      })
      .catch((e) => {
        console.error("Error exchanging code for tokens:", e);
        window.location = "/";
      });
  }, [code, usedCode]); // Add usedCode to the dependency array

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      console.log(
        "Attempting to refresh access token with refresh token:",
        refreshToken
      );

      axios
        .post("http://localhost:5000/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log("Received refreshed tokens:", res.data);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((e) => {
          console.error("Error refreshing access token:", e);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken; // the thing that we need to call all of the different Spotify APIs
}
