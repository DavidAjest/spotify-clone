import { useContext, useEffect } from "react";
import { ArtistsContext } from "../context/ArtistContext";
import CardActionArtist from "../components/CardActionArtist";
import CardActionAlbum from "../components/CardActionAlbum";
import "../index.css";
import { NewSongsContext } from "../context/newSongContext";
// CARUSALE NPM
// import Carousel from "react-material-ui-carousel";
// import { Paper, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderHome from "../components/SliderHome";
function Home() {
  const { artists, dispatch } = useContext(ArtistsContext);
  const { newSongDispatch } = useContext(NewSongsContext);

  useEffect(() => {
    const fetchArtists = async () => {
      // "proxy": "http://localhost:5000",
      const response = await fetch("http://localhost:5000/api/artists");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ARTISTS", payload: json });
        const allSongs = json.flatMap((artist) => artist.songs);

        newSongDispatch({ type: "SET_SONGS", payload: allSongs });
      } else {
        console.log(response.status);
      }
    };
    fetchArtists();
  }, [dispatch, newSongDispatch]);

  return (
    <main className="container-home-grid">
      <div className="your-library-grid-item">
        <h2>Your Library</h2>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="card-artist-grid-item"
      >
        {/* <div
          style={{ display: "flex" }}
          className="topic-popular-artists-grid-item"
        > */}

        {/* </div> */}

        {/* removed flex wrap XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

        {/* <Carousel> */}
        <div style={{ width: "70%", marginLeft: "5%" }}>
          <h2
            className="topic-popular-artists-grid-item"
            style={{ display: "flex" }}
          >
            Popular Artists
          </h2>
          <SliderHome>
            {artists.map((artist) => {
              return <CardActionArtist key={artist._id} artist={artist} />;
            })}
          </SliderHome>
        </div>
        <div style={{ width: "70%", marginLeft: "5%" }}>
          <h2 style={{ display: "flex" }}>Popular albums and singels</h2>
          <SliderHome>
            {artists.map((artist) => {
              return <CardActionAlbum key={artist._id} artist={artist} />;
            })}
          </SliderHome>
        </div>

        {/* </Carousel> */}
      </div>

      {/* BELOW IS NOT RELEVANT */}
      {/* <div
        style={{ display: "flex", flexDirection: "column" }}
        className="card-album-grid-item"
      >
        <div
          style={{ display: "flex" }}
          className="topic-popular-artists-grid-item"
        >
          <h2>Popular Albums and singles</h2>
        </div>
        <div style={{ width: "70%" }}>
          <Slider {...settings}>
            {artists.map((artist) => {
              return <CardActionAlbum key={artist._id} artist={artist} />;
            })}
          </Slider>
        </div>
      </div> */}
    </main>
  );
}

export default Home;
