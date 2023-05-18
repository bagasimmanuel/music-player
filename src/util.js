export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.value.play();
    if (audioRef.value.play() !== undefined) {
      playPromise.then((audio) => {
        audioRef.value.play();
      });
    }
  }
};
