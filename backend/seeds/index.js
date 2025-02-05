const mongoose = require("mongoose");
const Artist = require("../models/artistModel");
const Song = require("../models/songModel");
const artistsData = require("./artists.json");
const songsData = require("./songs.json");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected (Atlas)");
  })
  .catch((error) => {
    console.log("Not connected to Database because:", error);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Artist.deleteMany({});
    await Song.deleteMany({});

    // Initialize an empty object to store the mapping
    const artistMap = {};

    // Loop through each artist in the artistsData array
    for (const artist of artistsData) {
      // Create a new artist in the database
      const newArtist = await Artist.create(artist);

      // Store the mapping between the artist's name and their MongoDB ObjectId
      artistMap[artist.name] = newArtist._id;

      // Log the created artist and their ID
      console.log(`Created artist: ${newArtist.name}, ID: ${newArtist._id}`);
    }

    // Insert songs with correct artist IDs and update artists with song IDs
    for (const song of songsData) {
      // Replace artist names with their corresponding IDs from the artistMap
      song.artists = song.artists.map((artistName) => artistMap[artistName]);
      const newSong = await Song.create(song);

      // Update each artist with the new song's ID
      for (const artistId of song.artists) {
        await Artist.findByIdAndUpdate(
          artistId,
          { $push: { songs: newSong._id } },
          { new: true, useFindAndModify: false }
        );
      }
    }

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
