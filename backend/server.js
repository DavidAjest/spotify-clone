require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const songsRoutes = require("./routes/songs");
const artistsRoutes = require("./routes/artists");

// Add the body field to request
const cors = require("cors");
app.use(cors()); // Enable CORS
app.use(express.json());
// Connect to db
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected (Atlas)");
  })
  .catch((error) => {
    console.log("Not connected to Database because:", error);
  });

// SPOTIFY API
const SpotifyWebApi = require("spotify-web-api-node");

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
console.log("THIS IS THE REDIRECT_URI", process.env.REDIRECT_URI);
console.log("THIS IS THE CLIENT_ID", process.env.CLIENT_ID);
console.log("THIS IS THE CLIENT_SECRET", process.env.CLIENT_SECRET);

app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.error("Error during authorization code grant:", err);
      res.status(400).json({ error: "Invalid authorization code" });
    });
});

// Routes
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
