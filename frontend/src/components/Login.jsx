import React from "react";
import { Container, Button, Typography } from "@mui/material";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=0c2918a196494a43934a67b0c6dc3167&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Login
      </Typography>
      <Button variant="contained" color="primary" href={AUTH_URL}>
        Login with Spotify
      </Button>
    </Container>
  );
}
