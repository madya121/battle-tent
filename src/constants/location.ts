import ArenaBackground from '../assets/images/background/arena.png';
import PewterGymBackground from '../assets/images/background/pewter-gym.png';
import CeruleanGymBackground from '../assets/images/background/cerulean-gym.png';

const TrainerBattleBgm = require('../assets/audio/bgm/11_Battle_(Trainer_Battle).mp3');
const GymLeaderBattleBgm = require('../assets/audio/bgm/27_Battle_(Gym_Leader_Battle).mp3');

export enum GymLocation {
  None = -1,
  Pewter,
  Cerulean,
  Vermilion,
  Celadon,
  Fuchsia,
  Saffron,
  Cinnabar,
  Viridian,
}

export function getLocationBackground(location: GymLocation) {
  switch (location) {
    case GymLocation.Pewter: return PewterGymBackground;
    case GymLocation.Cerulean: return CeruleanGymBackground;
    default: return ArenaBackground;
  }
}

export function getLocationBgm(location: GymLocation) {
  switch (location) {
    case GymLocation.Pewter:
    case GymLocation.Cerulean:
      return GymLeaderBattleBgm;

    default: return TrainerBattleBgm;
  }
}
