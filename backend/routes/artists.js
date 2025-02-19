const express = require("express");
const router = express.Router();

const {
  createArtist,
  showAllArtists,
  // deleteArtist,
  showArtistById,
  updateArtist,
  showArtistAlbumById,
} = require("../controllers/artistController");

// Retrieve a list of all artists. // Base Path "api/artists"
router.get("/", showAllArtists);

// Retrieve details of a specific artist by ID // Base Path "api/artists/:id"
router.get("/:id", showArtistById);

// Add a new artist // Base Path "api/artists"
router.post("/", createArtist);

// Update details of a specific artist by ID // Base Path "api/artists/:id"
router.patch("/:id", updateArtist);

// Delete specific artist by ID // Base Path "api/artists/:id"
// router.delete("/:id", deleteArtist);

// show specific album
// router.get("/album/:id", showArtistAlbumById);

module.exports = router;
