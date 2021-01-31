import normal from './normal.png';
import fire from './fire.png';
import fighting from './fighting.png';
import water from './water.png';
import flying from './flying.png';
import grass from './grass.png';
import poison from './poison.png';
import electric from './electric.png';
import ground from './ground.png';
import psychic from './psychic.png';
import rock from './rock.png';
import ice from './ice.png';
import bug from './bug.png';
import dragon from './dragon.png';
import ghost from './ghost.png';
import dark from './dark.png';
import steel from './steel.png';
import fairy from './fairy.png';
import { Type } from '../../../types/Pokemon';

const typeIcons: Record<Type, string> = {
  normal,
  fire,
  fighting,
  water,
  flying,
  grass,
  poison,
  electric,
  ground,
  psychic,
  rock,
  ice,
  bug,
  dragon,
  ghost,
  dark,
  steel,
  fairy,
  '???': normal
};

export default typeIcons;
