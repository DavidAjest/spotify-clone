require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const songsRoutes = require("./routes/songs");

// Add the body field to request
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

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
