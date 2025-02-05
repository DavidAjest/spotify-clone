import { useContext, useEffect } from "react";
import { ArtistsContext } from "../context/ArtistContext";
import CardActionArtist from "../components/CardActionArtist";
// import { SongsContext } from "../context/SongContext";
import "../index.css";

function Home() {
  const { artists, dispatch } = useContext(ArtistsContext);
  // const { songs, dispatch } = useContext(SongsContext);

  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     const response = await fetch("/api/songs");
  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_SONGS", payload: json });
  //     }
  //   };

  //   fetchSongs();
  // }, [dispatch]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch("/api/artists");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ARTISTS", payload: json });
      }
    };

    fetchArtists();
  }, [dispatch]);

  return (
    <main className="container-home-grid">
      <div className="your-library-grid-item">
        <h2>Your Library</h2>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="card-artist-grid-item"
      >
        <div
          style={{ display: "flex" }}
          className="topic-popular-artists-grid-item"
        >
          <h2>Popular Artists</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {artists.map((artist) => {
            return <CardActionArtist key={artist.id} artist={artist} />;
          })}
        </div>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="card-artist-grid-item"
      >
        <div
          style={{ display: "flex" }}
          className="topic-popular-artists-grid-item"
        >
          <h2>Popular Albums and singles</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {artists.map((artist) => {
            return <CardActionArtist key={artist.id} artist={artist} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Home;
