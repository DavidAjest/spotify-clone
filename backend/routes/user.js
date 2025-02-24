const express = require("express");
const router = express.Router();

//controller functions
const {
  signupUser,
  loginUser,
  addLikedSong,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.post("/addLikedSong", addLikedSong);
module.exports = router;
