const express = require("express");
const router = express.Router();

const {
  // createSong,
  showAllSongs,
  // deleteSong,
  showSongById,
  // updateSong,
} = require("../controllers/songController");

// Retrieve a list of all songs. // Base Path "api/songs""
router.get("/", showAllSongs);

// Retrieve details of a specific song by ID // Base Path "api/songs""
router.get("/:id", showSongById);

module.exports = router;

// Not used in the real spotify app, as a regular user.
// Add a new song // Base Path "api/songs""
// router.post("/", createSong);
// Not used in the real spotify app, as a regular user.
// Update details of a specific song by ID // Base Path "api/songs""
// router.patch("/:id", updateSong);
// Not used in the real spotify app, as a regular user.
// Delete specific song by ID // Base Path "api/songs""
// router.delete("/:id", deleteSong);
