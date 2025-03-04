const express = require("express");
const router = express.Router();

const {
  // createArtist,
  showAllArtists,
  // deleteArtist,
  showArtistById,
  // updateArtist,
  showArtistAlbumById,
} = require("../controllers/artistController");

// Retrieve a list of all artists. // Base Path "api/artists"
router.get("/", showAllArtists);

// Retrieve details of a specific artist by ID // Base Path "api/artists/:id"
router.get("/:id", showArtistById);

module.exports = router;

// Not used in the real spotify app, as a regular user.
// Add a new artist // Base Path "api/artists"
// router.post("/", createArtist);
// Not used in the real spotify app, as a regular user.
// Update details of a specific artist by ID // Base Path "api/artists/:id"
// router.patch("/:id", updateArtist);
// Not used in the real spotify app, as a regular user.
// Delete specific artist by ID // Base Path "api/artists/:id"
// router.delete("/:id", deleteArtist);
// Not used in the real spotify app, as a regular user.
// show specific album
// router.get("/album/:id", showArtistAlbumById);
