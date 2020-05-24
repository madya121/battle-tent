export function fadeAudio(audio: HTMLAudioElement) {
  // This fade interval last for 1 seconds. If the audio already reached
  // the last 1 seconds, let it finish by itself
  const reachedEndOfPlayback = audio.currentTime === audio.duration - 1;

  // Only fade if past the fade out point or not at zero already
  const volumeReachedZero = audio.volume <= 0.0;

  if (reachedEndOfPlayback || volumeReachedZero) return;

  // subtract audio by percentages
  const subtraction = audio.volume / 10;

  const fadeAudio = setInterval(() => {
    // Stop all the intervalling when the volume is about to reach zero
    // and reset the audio to the initial state
    if (audio.volume < subtraction) {
      audio.pause();
      audio.volume = 0;
      audio.currentTime = 0;
      clearInterval(fadeAudio);
    } else {
      audio.volume -= subtraction;
    }
  }, 100);
}
