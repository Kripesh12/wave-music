import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  audio,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) {
  function handelActiveLibrary(nextPrevSong) {
    const newSong = songs.map((song) => {
      if (song.id === nextPrevSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSong);
  }
  function handelAudioPlay() {
    setIsPlaying((currentState) => !currentState);
    if (!isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }

  function handelDrag(e) {
    audio.current.currentTime = e.target.value;
    setSongInfo((currentState) => {
      return { ...currentState, currentTime: e.target.value };
    });
  }

  //function to format seconds into mm:ss format
  function formatSeconds(second) {
    const minutes = Math.floor(second / 60);
    const remainingSeconds = second % 60;
    const formattedTimeMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTimeSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedTimeMinutes}:${formattedTimeSeconds}`;
  }

  async function handelSkip(direction) {
    const index = songs.findIndex((object) => {
      return object.id === currentSong.id;
    });
    if (direction === "forward") {
      await setCurrentSong(songs[(index + 1) % songs.length]);
      handelActiveLibrary(songs[(index + 1) % songs.length]);
    }

    if (direction === "backward") {
      if (index === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        handelActiveLibrary(songs[songs.length - 1]);
        if (isPlaying) audio.current.play();
        return;
      }
      await setCurrentSong(songs[(index - 1) % songs.length]);
      handelActiveLibrary(songs[(index - 1) % songs.length]);
    }
    if (isPlaying) audio.current.play();
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatSeconds(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duation || 0}
          value={songInfo.currentTime}
          onChange={handelDrag}
          step="1"
        />
        <p>{songInfo.duation ? formatSeconds(songInfo.duation) : "0:00"}</p>
      </div>

      <div className="player-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => handelSkip("backward")}
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={handelAudioPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => handelSkip("forward")}
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
}
