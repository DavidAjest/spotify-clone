import { useContext, useEffect } from "react";
import { ArtistsContext } from "../context/ArtistContext";
import CardActionArtist from "../components/CardActionArtist";
import "../index.css";

function Home() {
  const { artists, dispatch } = useContext(ArtistsContext);

  useEffect(() => {
    const fetchArtists = async () => {
      // "proxy": "http://localhost:5000",
      const response = await fetch("http://localhost:5000/api/artists");

      const json = await response.json();
      console.log("this is json", json);
      // if (response.ok) {
      //   dispatch({ type: "SET_ARTISTS", payload: json });
      // } else {
      //   console.log(response.status);
      // }
    };

    fetchArtists();
  }, []);

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
