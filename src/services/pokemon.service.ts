import { Service } from "typedi";
import { IPokemon } from "../interfaces/pokemons.interface";

import { PokemonRepository } from "../repositories/pokemon.repository";

@Service()
export class PokemonService {
  constructor(protected readonly pokemonRepository: PokemonRepository) {}
  async getAllPokemon(limit = 12, page = 1) {
    return await this.pokemonRepository.getAllPokemon(limit, page);
  }
  async getPokemonByName(name: string, page = 1) {
    return await this.pokemonRepository.getPokemonByName(name, page);
  }
}
