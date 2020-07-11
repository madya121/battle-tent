import { Type } from '../../types/Pokemon';

export default function getTypeColor(type: Type) {
  switch (type.toLowerCase()) {
    case Type.normal: return '#aaaa99';
    case Type.fire: return '#ff4421';
    case Type.fighting: return '#bb5644';
    case Type.water: return '#3399ff';
    case Type.flying: return '#8898ff';
    case Type.grass: return '#77cc55';
    case Type.poison: return '#aa5599';
    case Type.electric: return '#ffcc33';
    case Type.ground: return '#ddbb55';
    case Type.psychic: return '#ff5599';
    case Type.rock: return '#bbaa66';
    case Type.ice: return '#66ccff';
    case Type.bug: return '#aaba21';
    case Type.dragon: return '#7767ed';
    case Type.ghost: return '#6766ba';
    case Type.dark: return '#705848';
    case Type.steel: return '#aaaabb';
    case Type.fairy: return '#ed99ee';
    default: return '#68A090'; // ??? type
  }
}
