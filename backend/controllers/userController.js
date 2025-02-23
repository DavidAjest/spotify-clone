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

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
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

module.exports = { signupUser, loginUser };
