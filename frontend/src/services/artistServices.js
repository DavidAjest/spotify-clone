// fetch artist by id, and return artist
export const fetchArtistById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/artists/${id}`);
  const json = await response.json();
  const artistFetched = json[0];
  return artistFetched;
};
