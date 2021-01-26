import ArenaBackground from '../assets/images/background/arena.png';
import PewterGymBackground from '../assets/images/background/pewter-gym.png';
import CeladonGymBackground from '../assets/images/background/celadon-gym.png';

const TrainerBattleBgm = require('../assets/audio/bgm/11_Battle_(Trainer_Battle).mp3');
const GymLeaderBattleBgm = require('../assets/audio/bgm/27_Battle_(Gym_Leader_Battle).mp3');

export enum GymLocation {
  None = -1,
  Pewter,
  Celadon,
  Vermilion,
}

export function getLocationBackground(location: GymLocation) {
  switch (location) {
    case GymLocation.Pewter: return PewterGymBackground;
    case GymLocation.Celadon: return CeladonGymBackground;
    default: return ArenaBackground;
  }
}

export function getLocationBgm(location: GymLocation) {
  switch (location) {
    case GymLocation.Pewter:
    case GymLocation.Celadon:
      return GymLeaderBattleBgm;

    default: return TrainerBattleBgm;
  }
}
