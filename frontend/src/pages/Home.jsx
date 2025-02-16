import { useContext, useEffect } from "react";
import { ArtistsContext } from "../context/ArtistContext";
import CardActionArtist from "../components/CardActionArtist";
import CardActionAlbum from "../components/CardActionAlbum";
import "../index.css";
import ReactPlayer from "react-player";

import { NewSongsContext } from "../context/newSongContext";

function Home() {
  const { artists, dispatch } = useContext(ArtistsContext);

  //WITH CONTEXT!!!!! :  ADDED SONG CONTEXT TO HOME
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    newSongDispatch,
  } = useContext(NewSongsContext);

  const bottomCurrentSong = songs.find((song) => song._id === currentSong);

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

  // useEffect(() => {
  //   if (isPlaying) {
  //     const interval = setInterval(() => {
  //       const player = playerRefs.current.get(currentSong);
  //       if (player) {
  //         console.log(player.getCurrentTime());
  //         newSongDispatch({
  //           type: "SAVE_CURRENT_TIME",
  //           payload: {
  //             songId: currentSong,
  //             currentSongTime: player.getCurrentTime(),
  //           },
  //         });
  //       }
  //     }, 1000); // Log every second

  //     return () => clearInterval(interval); // Cleanup interval on component unmount or when isPlaying changes
  //   }
  // }, [isPlaying, currentSong, playerRefs, newSongDispatch]);

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
            return <CardActionArtist key={artist._id} artist={artist} />;
          })}
        </div>
      </div>
      {/* BELOW IS NOT RELEVANT */}
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="card-album-grid-item"
      >
        <div
          style={{ display: "flex" }}
          className="topic-popular-artists-grid-item"
        >
          <h2>Popular Albums and singles</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {artists.map((artist) => {
            return <CardActionAlbum key={artist._id} artist={artist} />;
          })}
        </div>
      </div>
      {bottomCurrentSong && (
        <ReactPlayer
          ref={(player) => {
            if (player && !playerRefs.current.has(currentSong)) {
              playerRefs.current.set(currentSong, player);
              newSongDispatch({
                type: "SET_REFS",
                payload: playerRefs.current,
              });
            }
          }} // Store the player instance in the Map with the song ID as the key
          url={bottomCurrentSong.urlOfSong}
          playing={currentSong === bottomCurrentSong._id && isPlaying}
          width="0"
          height="0"
          config={{
            youtube: {
              playerVars: { origin: window.location.origin },
            },
          }}
        />
      )}
    </main>
  );
}

export default Home;
