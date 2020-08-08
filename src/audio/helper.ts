export function fadeAudio(audio: HTMLAudioElement, delay: number, targetVolume = 0): number | null {
  // This fade interval last for the {delay} duration. If the audio already reached
  // the last {delay} seconds, let it finish by itself
  // Also check if the audio already reached the {targetVolume}
  function shouldNotFade(audio: HTMLAudioElement, delay: number, targetVolume: number) {
    const reachedEndOfPlayback = audio.currentTime >= audio.duration - delay;
    const volumeReachedTarget = audio.volume === targetVolume;
    return reachedEndOfPlayback && volumeReachedTarget;
  }

  if (shouldNotFade(audio, delay, targetVolume)) return null;
  // the total difference between current volume and target volume
  // if its a fadeIn, the value will be positive, and vice versa.

  const delta = targetVolume - audio.volume;

  // change the audio gradually by 10% of the total difference per instance
  const numberOfInstances = 10;
  const changePerInstance = delta / numberOfInstances;

  const fadeAudioInterval = setInterval(() => {
    // Stop all the intervalling when the volume is about to reach zero
    // and reset the audio to the initial state
    const result = audio.volume + changePerInstance;
    const hasReachedTarget =
      Math.abs(changePerInstance) >= Math.abs(targetVolume - result);

    if (hasReachedTarget) {
      audio.volume = targetVolume;
      clearInterval(fadeAudioInterval);
    } else {
      audio.volume = result;
    }
  }, delay / numberOfInstances);

  return fadeAudioInterval;
}
