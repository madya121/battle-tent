import { GymLocation } from '../../constants/location';
import Red from '../../assets/images/trainer/red.png';
import Brock from '../../assets/images/trainer/brock.png';
import Misty from '../../assets/images/trainer/misty.png';
import Surge from '../../assets/images/trainer/surge.png';
import Erika from '../../assets/images/trainer/erika.png';
import Koga from '../../assets/images/trainer/koga.png';
import Sabrina from '../../assets/images/trainer/sabrina.png';
import Blaine from '../../assets/images/trainer/blaine.png';
import Giovanni from '../../assets/images/trainer/giovanni.png';

export function getAvatarUrl(code = '') {
  switch (parseInt(code)) {
    case GymLocation.Pewter: return Brock;
    case GymLocation.Cerulean: return Misty;
    case GymLocation.Vermilion: return Surge;
    case GymLocation.Celadon: return Erika;
    case GymLocation.Fuchsia: return Koga;
    case GymLocation.Saffron: return Sabrina;
    case GymLocation.Cinnabar: return Blaine;
    case GymLocation.Viridian: return Giovanni;
    default: return Red;
  }
}
