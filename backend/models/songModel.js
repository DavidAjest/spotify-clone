const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  album: { type: String },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: false },
  image: {
    type: String,
    required: true,
  },
  urlOfSong: {
    type: String,
    required: true,
  },
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Song", songSchema);
