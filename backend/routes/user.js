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

router.post("/addLikedSong", addLikedSong);

//delete liked song from user
router.delete("/removeLikedSong", removeLikedSong);
module.exports = router;
