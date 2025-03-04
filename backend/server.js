require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const songsRoutes = require("./routes/songs");
const artistsRoutes = require("./routes/artists");
const userRoutes = require("./routes/user");

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

// Routes
app.use("/api/songs", songsRoutes);
app.use("/api/artists", artistsRoutes);
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
