const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// the _id is part of the payload
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // console.log(email, password);
    //create a token
    console.log("from the user controller", email);
    const token = createToken(user._id);
    const likedSongs = user.likedSongs;
    console.log(likedSongs);

    res.status(200).json({ email, token, likedSongs });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//signup route
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.signup(email, password, username);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addLikedSong = async (req, res) => {
  const { email, songId } = req.body;
  console.log("im in the add liked song function!");
  console.log("Email:", email);
  console.log("SongId:", songId);
  try {
    const user = await User.findOne({ email });

    // Delete all liked songs, for dev
    // await User.updateOne({ _id: user._id }, { $set: { likedSongs: [] } });

    if (!user) {
      return res.status(400).json({ error: "no such user" });
    }
    if (user.likedSongs.includes(songId)) {
      return res.status(400).json({ error: "song already exists" });
    }

    await User.updateOne({ _id: user._id }, { $push: { likedSongs: songId } });

    res.status(200).json({ user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const removeLikedSong = async (req, res) => {
  const { email, songId } = req.body;
  console.log("im in the removeLikedSong  function!");
  console.log("Email:", email);
  console.log("SongId:", songId);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "no such user" });
    }
    if (!user.likedSongs.includes(songId)) {
      return res
        .status(400)
        .json({ error: "Theres no song like that, in the likedSongs array" });
    }

    await User.updateOne({ _id: user._id }, { $pull: { likedSongs: songId } });

    res.status(200).json({ user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { removeLikedSong, signupUser, loginUser, addLikedSong };
