async function fadeAudio(audio: HTMLAudioElement, delay = 2000, targetVolume = 0) {
  // This fade interval last for the {delay} duration. If the audio already reached
  // the last {delay} seconds, let it finish by itself
  // Also check if the audio already reached the {targetVolume}
  function shouldNotFade(audio: HTMLAudioElement, delay: number, targetVolume: number) {
    const reachedEndOfPlayback = audio.currentTime >= audio.duration - delay;
    const volumeReachedTarget = audio.volume === targetVolume;
    return reachedEndOfPlayback && volumeReachedTarget;
  }

  if (shouldNotFade(audio, delay, targetVolume)) return;
  // the total difference between current volume and target volume
  // if its a fadeIn, the value will be positive, and vice versa.
  const delta = targetVolume - audio.volume;

  // change the audio gradually by 10% of the total difference per instance
  const numberOfInstances = 10;
  const changePerInstance = delta / numberOfInstances;

  return new Promise(resolve => {
    const fadeAudioInterval = setInterval(() => {
      // Stop all the intervalling when the volume is about to reach zero
      // and reset the audio to the initial state
      const result = audio.volume + changePerInstance;
      const hasReachedTarget =
        Math.abs(changePerInstance) >= Math.abs(targetVolume - result);
      if (hasReachedTarget) {
        audio.volume = targetVolume;
        clearInterval(fadeAudioInterval);
        resolve();
      } else {
        audio.volume = result;
      }
    }, delay / numberOfInstances);
  });
}
// TODO this fadeAudio can be called twice at the same time,
// resulting 2 different intervals set and may cause any unexpected behavior

class Music {
  readonly defaultMasterVolume = .1;
  masterVolume = this.defaultMasterVolume;
  currentlyPlaying: HTMLAudioElement = new Audio();

  /**
   * @param {number} volume between 0 to 1
  */
  setMasterVolume(volume: number) {
    this.masterVolume = volume;
    fadeAudio(this.currentlyPlaying, 500, volume)
  }

  async stop({ delay }: { delay?: number } = {}) {
    if (this.currentlyPlaying) {
      await fadeAudio(this.currentlyPlaying, delay, 0);
      this.currentlyPlaying.pause();
      this.currentlyPlaying.currentTime = 0;
    }
  }

  async play(
    audio: HTMLAudioElement,
    { loop, delay }: { loop?: boolean; delay?: number; } = {}
  ) {
    await this.stop({ delay });
    this.currentlyPlaying = audio;
    this.currentlyPlaying.volume = this.masterVolume;
    if (loop !== undefined) this.currentlyPlaying.loop = loop;
    this.currentlyPlaying.play();
  }
}

export default new Music();
