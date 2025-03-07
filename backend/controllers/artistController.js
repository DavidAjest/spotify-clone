const artistModel = require("../models/artistModel");

const showAllArtists = async (req, res) => {
  try {
    const artists = await artistModel.find().populate("songs");

    res.status(200).json(artists);
  } catch (error) {
    res.status(404).json(error);
  }
};

const showArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await artistModel.find({ _id: id }).populate("songs");
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  // createArtist,
  showAllArtists,
  // deleteArtist,
  // showArtistAlbumById,
  showArtistById,
  // updateArtist,
};

// Not used in the real spotify app, as a regular user.

// const showArtistAlbumById = async (req, res) => {
//   console.log("lolololololololollololo");
//   try {
//     const { id } = req.params;
//     const artist = await artistModel.find({ _id: id }).populate("songs");
//     res.status(200).json(artist);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// };

// const updateArtist = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const artist = await artistModel.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       { new: true }
//     );
//     res.status(200).json(artist);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// };

// const deleteArtist = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedArtist = await artistModel.deleteOne({ _id: id });
//     res.status(200).json(deletedArtist);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// };

// const createArtist = async (req, res) => {
//   try {
//     const artist = await artistModel.create({ ...req.body });
//     console.log("The artist that was created: ", artist);

//     for (const songId of artist.songs) {
//       await Song.findByIdAndUpdate(
//         songId,
//         { $push: { artists: artist._id } },
//         { new: true, useFindAndModify: false }
//       );
//     }

//     res.status(200).json(artist);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// };
