const express = require("express");
const router = express.Router();

//controller functions
const {
  signupUser,
  loginUser,
  addLikedSong,
  removeLikedSong,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//add liked song to user route
router.post("/addLikedSong", addLikedSong);

//delete liked song from user route
router.delete("/removeLikedSong", removeLikedSong);
module.exports = router;
