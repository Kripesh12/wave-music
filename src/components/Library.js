import LibraySong from "./LibrarySong";

export default function Library({
  songs,
  setCurrentSong,
  audio,
  isPlaying,
  setSongs,
  libraryState,
}) {
  return (
    <div className={`library ${libraryState ? "library-active" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibraySong
          song={song}
          key={song.id}
          setCurrentSong={setCurrentSong}
          audio={audio}
          isPlaying={isPlaying}
          songs={songs}
          setSongs={setSongs}
        />
      ))}
    </div>
  );
}
