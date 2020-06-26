import Pokemon from '../../types/Pokemon';

export function getPokemonModel(
  name: Pokemon['name'],
  variant: ModelVariant = 'idle'
) {
  const ENDPOINT = 'https://projectpokemon.org/images';
  return variant === 'idle'
    ? `${ENDPOINT}/normal-sprite/${name}.gif`
    : `${ENDPOINT}/sprites-models/normal-back/${name}.gif`;
}

type ModelVariant = 'idle' | 'back';
