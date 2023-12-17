export default function LibraySong({
  song,
  setCurrentSong,
  audio,
  isPlaying,
  songs,
  setSongs,
}) {
  async function handelSongChage() {
    await setCurrentSong(song);
    //Active Song
    const newSongs = songs.map((currentSong) => {
      if (currentSong.id === song.id) {
        return { ...currentSong, active: true };
      } else {
        return { ...currentSong, active: false };
      }
    });
    //setting the new songs
    setSongs(newSongs);
    if (isPlaying) audio.curent.play();
  }

  return (
    <div
      className={`library-song-container ${
        song.active ? "active-state" : false
      }`}
      onClick={handelSongChage}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
