async function fadeAudio(audio: HTMLAudioElement) {
  // This fade interval last for 1 seconds. If the audio already reached
  // the last 1 seconds, let it finish by itself
  const reachedEndOfPlayback = audio.currentTime === audio.duration - 1;

  // Only fade if past the fade out point or not at zero already
  const volumeReachedZero = audio.volume <= 0.0;

  if (reachedEndOfPlayback || volumeReachedZero) return;

  // subtract audio by percentages
  const subtraction = audio.volume / 10;

  return new Promise(resolve => {
    const fadeAudio = setInterval(() => {
      // Stop all the intervalling when the volume is about to reach zero
      // and reset the audio to the initial state
      if (audio.volume < subtraction) {
        audio.volume = 0;
        clearInterval(fadeAudio);
        resolve();
      } else {
        audio.volume -= subtraction;
      }
    }, 200);
  });
}

class Music {
  masterVolume = .2;
  currentlyPlaying: HTMLAudioElement = new Audio();

  /**
   * @param {number} volume between 0 to 1
  */
  setMasterVolume(volume: number) {
    this.masterVolume = volume;
  }

  async stop() {
    if (this.currentlyPlaying) {
      await fadeAudio(this.currentlyPlaying);
      this.currentlyPlaying.pause();
      this.currentlyPlaying.currentTime = 0;
    }
  }

  async play(audio: HTMLAudioElement, loop?: boolean) {
    await this.stop();
    this.currentlyPlaying = audio;
    this.currentlyPlaying.volume = this.masterVolume;
    if (loop !== undefined) this.currentlyPlaying.loop = loop;
    this.currentlyPlaying.play();
  }
}

export default new Music();
