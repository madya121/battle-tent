import { fadeAudio } from './helper';

const PlinkSfx = require('../assets/audio/sfx/plink.mp3');

class AudioManager {
  readonly defaultVolume = 1;
  masterVolume = this.defaultVolume;
  currentBgm: HTMLAudioElement = new Audio();
  bgmVolume = this.defaultVolume;
  sfxVolume = this.defaultVolume;
  fadeInterval: number | null = null; // return value from setInterval() | null

  /**
   * @param {number} volume between 0 to 1
  */
  setVolume(volume: number) {
    this.masterVolume = volume;
    this.setBgmVolume(volume);
    this.setSfxVolume(volume);
  }

  /**
   * @param {number} volume between 0 to 1
   * @param {number} fadeTime in milliseconds
  */
  setFadeAudio(targetVolume: number, fadeTime: number) {
    this.fadeInterval && clearInterval(this.fadeInterval);
    this.fadeInterval = fadeAudio(
      this.currentBgm,
      fadeTime,
      targetVolume * .1,
    );
  }

  /**
   * @param {number} volume between 0 to 1
   * @param {number} fadeTime in milliseconds
  */
  setBgmVolume(volume: number, fadeTime = 500) {
    this.bgmVolume = volume;
    this.setFadeAudio(volume, fadeTime);
  }

  /**
   * @param {number} volume between 0 to 1
  */
  setSfxVolume(volume: number) {
    this.sfxVolume = volume;
    this.playSfx();
  }

  /**
   * Stop the currently played music
   * @param option delay in milliseconds
  */
  async stopBgm(delay = 2000) {
    if (this.currentBgm) {
      const VOLUME_OFF = 0;
      this.setFadeAudio(VOLUME_OFF, delay);
      const wait = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
      );
      await wait(delay);
      this.currentBgm.pause();
      this.currentBgm.currentTime = 0;
    }
  }

  /**
   * Play a background music (BGM)
   * @param audioSrc the music file source
   * @param options loop and delay options
  */
  async playBgm(
    audioSrc: string,
    { loop, delay }: { loop?: boolean; delay?: number; } = {}
  ) {
    // if there's any music stopping, wait for it to finish to avoid overlaps
    await this.stopBgm(delay);

    this.currentBgm = new Audio(audioSrc);
    this.currentBgm.volume = this.bgmVolume * .1;
    if (loop !== undefined) this.currentBgm.loop = loop;
    this.currentBgm.play();
  }

  /**
   * Play a sound effect (SFX)
   * @param audioSrc the audio file source
  */
  playSfx(audioSrc: string = PlinkSfx) {
    const sfx = new Audio(audioSrc);
    sfx.volume = this.sfxVolume;
    sfx.play();
  }
}

export default new AudioManager();
