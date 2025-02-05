const songModel = require("../models/songModel");

const createSong = async (req, res) => {
  try {
    const song = await songModel.create({ ...req.body });
    console.log("The song that was created: ", song);
    res.status(200).json(song);
  } catch (error) {
    res.status(404).json(error);
  }
};
const showAllSongs = async (req, res) => {
  try {
    const songs = await songModel.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await songModel.deleteOne({ _id: id });
    res.status(200).json(deletedSong);
  } catch (error) {
    res.status(404).json(error);
  }
};

const showSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await songModel.find({ _id: id });
    res.status(200).json(song);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await songModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(song);
  } catch (error) {
    res.status(404).json(error);
  }
};
// ADDING SONG TO ARTIST
const addArtistToSong = function (tutorialId, tag) {
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    { $push: { tags: tag._id } },
    { new: true, useFindAndModify: false }
  );
};

// const songSchema = new Schema({
//     title: { type: String, required: true },
//     artist: { type: String, required: true },
//     album: { type: String },
//     genre: { type: String, required: true },
//     duration: { type: Number, required: true },
//     releaseDate: { type: Date, required: true },
//     image: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   });

module.exports = {
  createSong,
  showAllSongs,
  deleteSong,
  showSongById,
  updateSong,
};
