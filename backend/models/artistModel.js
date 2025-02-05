const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["artist", "band"], required: true },
  albums: [{ type: String, required: false }],
  image: {
    type: String,
    required: true,
    // height: 640,
    // width:640
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: false,
    },
  ],
  followers: { type: Number, required: false },
  monthlyListeners: { type: Number, required: false },
});

module.exports = mongoose.model("Artist", artistSchema);
