import { GymLocation } from '../../constants/location';
import Brock from '../../assets/images/trainer/brock.png';
import Misty from '../../assets/images/trainer/misty.png';
import Surge from '../../assets/images/trainer/surge.png';
import Red from '../../assets/images/trainer/red.png';

export function getAvatarUrl(code = '') {
  switch (parseInt(code)) {
    case GymLocation.Pewter: return Brock;
    case GymLocation.Celadon: return Misty;
    case GymLocation.Vermilion: return Surge;
    default: return Red;
  }
}
