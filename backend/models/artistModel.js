const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  albums: [{ type: String, required: false }],
  image: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Artist", artistSchema);
