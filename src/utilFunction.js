export function playAudio(isPlaying, audio) {
  if (isPlaying) {
    const playPromise = audio.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audio.current.play();
      });
    }
  }
}
