import { Service } from "typedi";

import { PokemonRepository } from "../repositories/pokemon.repository";

@Service()
export class PokemonService {
  constructor(protected readonly pokemonRepository: PokemonRepository) {}
  getAllPokemon(limit: number = 12, page: number = 0) {
    return this.pokemonRepository.getAllPokemon(limit, page);
  }
  getPokemonByName(name: string) {
    return this.pokemonRepository.getPokemonByName(name);
  }
}
