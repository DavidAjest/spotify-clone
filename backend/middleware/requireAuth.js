const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authneication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Ahthorzaion token requrieed" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // grabs the id from the payload
    req.user = await User.findOne({ _id }).select("_id"); // just returns the id
    next();
  } catch (e) {
    console.log(error);
    res.status(401).json({ error: "request is not authirzed" });
  }
};

module.exports = requireAuth;
