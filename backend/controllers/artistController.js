const artistModel = require("../models/artistModel");

const createArtist = async (req, res) => {
  try {
    const artist = await artistModel.create({ ...req.body });
    console.log("The artist that was created: ", artist);
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json(error);
  }
};

const showAllArtists = async (req, res) => {
  try {
    const artists = await artistModel.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArtist = await artistModel.deleteOne({ _id: id });
    res.status(200).json(deletedArtist);
  } catch (error) {
    res.status(404).json(error);
  }
};

const showArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistModel.find({ _id: id });
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json(error);
  }
};

// ADDING SONG TO ARTIST
const addSongToArtist = function (tutorialId, tag) {
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    { $push: { tags: tag._id } },
    { new: true, useFindAndModify: false }
  );
};

module.exports = {
  createArtist,
  showAllArtists,
  deleteArtist,
  showArtistById,
  updateArtist,
};
