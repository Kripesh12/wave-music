import { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import data from "./util";
import Library from "./components/Library";

export function App() {
  //ref
  const audio = useRef(null);

  //states
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duation: 0,
  });
  const [libraryState, setLibraryState] = useState(false);
  //handler function
  function handelTimeUpdate(e) {
    const current = Math.floor(e.target.currentTime);
    const duration = Math.floor(e.target.duration);
    setSongInfo(() => {
      return {
        ...songInfo,
        currentTime: current,
        duation: duration,
      };
    });
  }

  async function handelAudioEnd() {
    const index = songs.findIndex((object) => {
      return object.id === currentSong.id;
    });
    await setCurrentSong(songs[(index + 1) % songs.length]);
    if (isPlaying) audio.current.play();
  }
  return (
    <div className="App">
      <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audio={audio}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />

      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audio={audio}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryState={libraryState}
      />

      <audio
        onTimeUpdate={handelTimeUpdate}
        onLoadedMetadata={handelTimeUpdate}
        ref={audio}
        src={currentSong.audio}
        onEnded={handelAudioEnd}
      ></audio>
    </div>
  );
}
