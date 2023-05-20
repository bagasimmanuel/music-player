export const playAudio = (isPlaying, audioRef) => {
  console.log(audioRef);
  if (isPlaying) {
    const playPromise = audioRef.play();
    if (audioRef.play() !== undefined) {
      playPromise.then((audio) => {
        audioRef.play();
      });
    }
  }
};
