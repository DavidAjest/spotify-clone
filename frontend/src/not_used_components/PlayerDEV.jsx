import { useEffect, useState } from "react"; // Importing React hooks
import useSound from "use-sound"; // Importing useSound hook for handling sound
import harryStylesAsItWasLyricsEdited from "../assets/music/harry-styles-as-it-was-lyrics_edited.mp3"; // Importing the audio file
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // Importing play and pause icons
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // Importing next and previous track icons
import { IconContext } from "react-icons"; // Importing IconContext for customizing icons

export default function PlayerDEV() {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the audio is playing
  const [play, { pause, duration, sound }] = useSound(
    harryStylesAsItWasLyricsEdited
  ); // Using useSound hook to handle play, pause, duration, and sound
  const [seconds, setSeconds] = useState(); // State to track the current position of the audio in seconds
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  }); // State to track the current position of the audio in minutes and seconds

  const playingButton = () => {
    if (isPlaying) {
      pause(); // Pause the audio
      setIsPlaying(false); // Set isPlaying state to false
    } else {
      play(); // Play the audio
      setIsPlaying(true); // Set isPlaying state to true
    }
  }; // Function to handle play and pause button click

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000; // Convert duration from milliseconds to seconds
      const min = Math.floor(sec / 60); // Calculate minutes
      const secRemain = Math.floor(sec % 60); // Calculate remaining seconds
      const time = {
        min: min,
        sec: secRemain,
      }; // Create a time object with minutes and seconds
      setCurrTime(time); // Set the current time state
    }
  }, [duration]); // Run this effect when the duration changes

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // Set the seconds state with the current position of the audio
        const min = Math.floor(sound.seek([]) / 60); // Calculate minutes
        const sec = Math.floor(sound.seek([]) % 60); // Calculate remaining seconds
        setCurrTime({
          min,
          sec,
        }); // Set the current time state
      }
    }, 1000); // Run this effect every second
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [sound]); // Run this effect when the sound changes

  return (
    <div className="componentPlayerDEV">
      <h2>Playing Now</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" />{" "}
      {/* Display a placeholder image */}
      <div>
        <h3 className="title">Rubaiyyan</h3> {/* Display the title */}
        <p className="subTitle">Qala</p> {/* Display the subtitle */}
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious /> {/* Display the previous track button */}
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle /> {/* Display the play button */}
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle /> {/* Display the pause button */}
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext /> {/* Display the next track button */}
          </IconContext.Provider>
        </button>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec} {/* Display the current time */}
          </p>
          <p>
            {Math.floor(duration / 60000)}:
            {Math.floor((duration % 60000) / 1000)}{" "}
            {/* Display the total duration */}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]); // Seek to the selected position in the audio
          }}
        />
      </div>
    </div>
  );
}
