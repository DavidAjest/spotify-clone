// fetch artist by id, and return artist
export const fetchArtistById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/artists/${id}`);
    if (response.ok) {
      try {
        const json = await response.json();
        const artistFetched = json[0];
        return artistFetched;
      } catch (e) {
        console.log("couldnt parse to json. Error: ", e);
      }
    }
  } catch (e) {
    console.log("bad response Error: ", e);
  }
};

// fetch all artists, returns all artists
export const fetchArtists = async () => {
  const response = await fetch("http://localhost:5000/api/artists");
  if (response.ok) {
    try {
      const json = await response.json();
      return json;
    } catch (e) {
      throw Error("couldnt parse to json. Error: ", e);
    }
  } else {
    throw Error("bad response");
  }
};

// save liked song to user by email, returns user
export const saveUserLikedSongs = async (email, songId) => {
  console.log("these are the email and song id", email, songId);
  try {
    const response = await fetch(
      "http://localhost:5000/api/user/addLikedSong",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, songId: songId }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save liked song");
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log("Error: ", e);
    throw e;
  }
};
// removes liked song from user by email, returns user
export const removeUserLikedSongs = async (email, songId) => {
  console.log("these are the email and song id", email, songId);
  try {
    const response = await fetch(
      "http://localhost:5000/api/user/removeLikedSong",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, songId: songId }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save liked song");
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log("Error: ", e);
    throw e;
  }
};
