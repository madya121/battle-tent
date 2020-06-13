import Pokemon from '../../types/Pokemon';
import { pokemonListMock } from '../responseMocks';

export function fetchPokemonList(): Promise<ApiResponse<Pokemon[]>> {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data: pokemonListMock }), 2000);
  });
}

type ApiResponse<T = void> = T extends void ? {
  error?: any;
} : {
  data: T
  error?: any;
};
