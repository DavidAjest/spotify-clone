// React Hooks
import { useContext, useEffect } from "react";
// Context
import { ArtistsContext } from "../context/ArtistContext";
// MUI Components
import CardActionArtist from "../components/CardActionArtist";
import CardActionAlbum from "../components/CardActionAlbum";
// React-Slick related libraries
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Components
import SliderHome from "../components/SliderHome";
import SliderAlbums from "../components/SliderAlbums";
// Services
import { fetchArtists } from "../services/artistServices";
// CSS
import "../index.css";

function Home() {
  const { artists, dispatch } = useContext(ArtistsContext);

  useEffect(() => {
    const getAllArtists = async () => {
      const fecthedArtists = await fetchArtists();
      console.log("this is fecthedArtists", fecthedArtists);
      dispatch({ type: "SET_ARTISTS", payload: fecthedArtists });
    };
    getAllArtists();
  }, [dispatch]);

  return (
    <main className="container-home-grid">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        className="cards-artists-albums-grid-item"
      >
        <div style={{ width: "70%", marginLeft: "5%" }}>
          <h2
            className="topic-popular-artists-grid-item"
            style={{ display: "flex" }}
          >
            Popular Artists
          </h2>
          <div className="sliders">
            <SliderHome>
              {artists.map((artist) => {
                return <CardActionArtist key={artist._id} artist={artist} />;
              })}
            </SliderHome>
          </div>
        </div>
        <div className="sliders-albums" style={{ marginLeft: "5%" }}>
          <h2 style={{ display: "flex" }}>Popular albums and singels</h2>
          <SliderAlbums>
            {artists.slice(0, 3).map((artist) => {
              return <CardActionAlbum key={artist._id} artist={artist} />;
            })}
          </SliderAlbums>
        </div>
      </div>
    </main>
  );
}

export default Home;
