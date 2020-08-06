import Pokemon from '../../types/Pokemon';

export function getPokemonModel(
  name: Pokemon['name'],
  variant: ModelVariant = 'idle'
) {
  const ENDPOINT = 'https://projectpokemon.org/images';
  const fileName = getModelFileName(name, variant);
  return variant === 'idle'
    ? `${ENDPOINT}/normal-sprite/${fileName}`
    : `${ENDPOINT}/sprites-models/normal-back/${fileName}`;
}

type ModelVariant = 'idle' | 'back';

function getModelFileName(name: string, variant: ModelVariant) {
  switch (name) {
    case 'nidoran-f': return 'nidoran_f.gif';
    case 'nidoran-m': return 'nidoran_m.gif';
    case 'mr-mime': return variant === 'idle' ? 'mr.mime.gif' : 'mr._mime.gif';
    default: return `${name}.gif`
  }
}
